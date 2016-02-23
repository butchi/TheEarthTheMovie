'use strict';

var recentDate = new Date(2016, 3, 30, 13 + 9, 4, 33);
// var epochDate = new Date(-62135596800000); // 西暦1年1月1日0時0分0秒
var epochDate = new Date(2016, 3, 30, 13 + 9, 4, 20);
var player;
var $slider = $('.slider');
var $time = $('.face .time time');
var $timeCur = $('.controller .time-cur');
var $timeTotal = $('.controller .time-total');
var $btnGotohead = $('.controller .btn-gotohead');
var $btnPlay = $('.controller .btn-play');
var ratio;
var timerId;

function formatDate(date) {
  var ret = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日 ${('00' + (date.getUTCHours())).slice(-2)}:${('00' + (date.getUTCMinutes())).slice(-2)}:${('00' + (date.getUTCSeconds())).slice(-2)}`;
  return ret;
}

function updateTime() {
  var curDate = player.getCurrentTime();

  ratio = (curDate.valueOf() - player.startDate.valueOf()) / player.duration;

  $time.text(formatDate(curDate));
  $timeCur.text(formatDate(curDate));

  $slider.val(ratio);

  requestAnimationFrame(updateTime);
}
requestAnimationFrame(updateTime);

$timeTotal.text(formatDate(recentDate));

$slider.on('change', function() {
  player.$dispatcher.trigger('update');
  player.seekTo(new Date(epochDate.valueOf() + (recentDate.valueOf() - epochDate.valueOf()) * ratio));
});

$btnPlay.on('click', function() {
  var $this = $(this);

  if($this.hasClass('pause')) {
    $this.removeClass('pause');
    player.playVideo();
  } else {
    $this.addClass('pause');
    player.pauseVideo();
  }
});

$btnGotohead.on('click', function() {
  player.pauseVideo();

  if(!$this.hasClass('pause')) {
    player.playVideo();
  }
});

player = new Player({
  start_date: epochDate,
  end_date: recentDate, 
});

player.playVideo();

player.$dispatcher.on('onStateChange', function(_, data) {
  console.log(data);
});

function updateSlider() {
}