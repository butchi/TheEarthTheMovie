import Player from './Player';
import Earth from './Earth';
import Movie from './Movie';
import siteLi from './siteLi';
import SiteBg from './SiteBg';

class Main {
  constructor(opts = {}) {
    $(() => {
      var now = new Date();
      this.recentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 4, 33);
      this.epochDate = new Date(-62135596800000 - 9 * 60 * 60 * 1000); // 西暦1年1月1日0時0分0秒（日本時間）
      this.$slider = $('.slider');
      this.$browserFrame = $('.browser-frame');
      this.$browserTitle = this.$browserFrame.find('.title');
      this.$timeCur = $('.controller .time-cur');
      this.$timeTotal = $('.controller .time-total');
      this.$btnGotohead = $('.controller .btn-gotohead');
      this.$btnPlay = $('.controller .btn-play');

      requestAnimationFrame(() => {
        this.updateTime();
      });

      this.$timeTotal.text(this.formatDate(this.recentDate));

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
    });
  }

  initialize() {
    var player = new Player({
      start_date: this.epochDate,
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

    this.siteBg = new SiteBg();

    this.siteBg.pushBg();
    this.siteBg.pushBg();

    this.siteBgTimer = setInterval(() => {
      this.siteBg.popBg();
      this.siteBg.pushBg();
    }, 15000);
  }

  formatDate(date) {
    var ret = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${('00' + (date.getHours())).slice(-2)}:${('00' + (date.getMinutes())).slice(-2)}:${('00' + (date.getSeconds())).slice(-2)}`;
    return ret;
  }

  formatTitle(date) {
    var ret = `${date.getFullYear() - 1}年${date.getMonth()}ヶ月${date.getDate() - 1}日${date.getHours()}時間${date.getMinutes()}分${date.getSeconds()}秒`;
    return ret;
  }

  updateTime() {
    var curDate = this.player.getCurrentTime();

    this.ratio = (curDate.valueOf() - this.player.startDate.valueOf()) / this.player.duration;

    this.$browserTitle.text(this.formatTitle(curDate));

    this.$timeCur.text(this.formatDate(curDate));

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