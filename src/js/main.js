import moment from 'moment';

import Player from './Player';
import Earth from './Earth';
import Movie from './Movie';
import siteLi from './siteLi';
import newsLi from './newsLi';
import SiteBg from './SiteBg';
import Util from './Util';

const RELOAD_DURATION = (4 * 60 + 33) * 1000; // 4分33秒
// const RELOAD_DURATION = 10000;
const FADE_DURATION = 3000;
const FADE_IN_DURATION = FADE_DURATION;
const FADE_OUT_DURATION = FADE_DURATION;

const util = new Util();

class Main {
  constructor(opts = {}) {
    $(() => {
      var nowMoment = moment();
      var now = nowMoment.toDate();

      var newsId = parseInt(util.getUrlVars().news) || 0;

      this.newsObj = newsLi[newsId];

      var newsMoment = moment(this.newsObj.date);
      var newsDate = newsMoment.toDate();

      var recentMoment = moment([nowMoment.year(), nowMoment.month(), nowMoment.date(), nowMoment.hours(), 4, 33]);
      this.recentDate = recentMoment.toDate();
      var startMoment = moment([newsMoment.year(), newsMoment.month(), newsMoment.date(), Math.floor(Math.random() * 24), 0, 0])
      this.startDate = startMoment.toDate();
      this.epochDate = new Date(-62135596800000 - 9 * 60 * 60 * 1000); // 西暦1年1月1日0時0分0秒（日本時間）
      this.$slider = $('.slider-cur');
      this.$browserFrame = $('.browser-frame');
      this.$browserTitle = this.$browserFrame.find('.title');
      this.$timeCur = $('.controller .time-cur');
      this.$timeTotal = $('.controller .time-total');
      this.$btnGotohead = $('.controller .btn-gotohead');
      this.$btnPlay = $('.controller .btn-play');
      this.$overlay = $('.overlay');

      requestAnimationFrame(() => {
        this.updateTime();
      });

      this.$timeTotal.text(moment(this.recentDate).format('YYYY年M月D日 HH:mm:ss'));

      this.$slider.on('input', (evt) => {
        this.ratio = $(evt.target).val();
        // player.pauseVideo();
        this.player.seekTo(new Date(this.player.startDate.valueOf() + this.player.duration * this.ratio));
        this.updateTime();
      });

      this.$slider.on('change', () => {
        this.player.$dispatcher.trigger('update');
        this.player.seekTo(new Date(this.epochDate.valueOf() + (this.recentDate.valueOf() - this.epochDate.valueOf()) * this.ratio));
      });

      this.$btnPlay.on('click', (evt) => {
        var $this = $(evt.target);

        if($this.hasClass('pause')) {
          $this.removeClass('pause');
          this.player.playVideo();
        } else {
          $this.addClass('pause');
          this.player.pauseVideo();
        }
      });

      this.$btnGotohead.on('click', () => {
        this.player.seekTo(epochDate);
        $slider.val(0);
      });

      this.initialize();

      this.openTimer = setTimeout(() => {
        this.$overlay.addClass('over');
      }, FADE_IN_DURATION);

      this.reloadTimer = setTimeout(() => {
        var nextNewsId = (newsId + 1) % newsLi.length;
        this.$overlay.one('transitionend', () => {
          location.href = `./?news=${nextNewsId}`;
        });
        this.$overlay.removeClass('over');
      }, RELOAD_DURATION);
    });
  }

  initialize() {
    var player = new Player({
      start_date: this.epochDate,
      first_date: this.startDate,
      end_date: this.recentDate,
      $btn_play: this.$btnPlay,
      $slider: this.$slider,
    });
    this.player = player;

    player.playVideo();

    player.$dispatcher.on('onStateChange', (_, data) => {
      console.log('state:', data);
    });

    this.earth = new Earth();
    this.earth.init();
    this.earth.animate();
    this.movie = new Movie();

    this.siteBg = new SiteBg({
      news: this.newsObj,
    });

    // this.siteBg.pushBg(0);
    // this.siteBg.popBg();

    this.siteBg.pushBg();

    this.siteBgTimer = setInterval(() => {
      this.siteBg.popBg();
      this.siteBg.pushBg();
    }, 15000);
  }

  updateTime() {
    var curDate = this.player.getCurrentTime();

    this.ratio = (curDate.valueOf() - this.epochDate.valueOf()) / this.player.duration;

    this.$browserTitle.text(moment(this.recentDate).format('YYYY年Mヶ月D日H時間m分s秒'));

    this.$timeCur.text(moment(curDate).format('YYYY年M月D日 HH:mm:ss'));

    this.$slider.css({
      left: (this.ratio * 100) + '%',
    });

    if(this.player.getPlayerState() === this.player.PlayerState.PLAYING) {
      this.$slider.val(this.ratio);
    }

    this.movie.render();

    requestAnimationFrame(() => {
      this.updateTime();
    });
  }
}

window.licker = window.licker || {};
((ns) => {
  ns.main = new Main();
})(window.licker);