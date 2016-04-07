(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var recentDate = new Date(2016, 3, 30, 13 + 9, 4, 33);
var epochDate = new Date(-62135596800000); // 西暦1年1月1日0時0分0秒
// var epochDate = new Date(2016, 3, 30, 13 + 9, 4, 20);
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
  var ret = date.getUTCFullYear() + '年' + (date.getUTCMonth() + 1) + '月' + date.getUTCDate() + '日 ' + ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);
  return ret;
}

function updateTime() {
  var curDate = player.getCurrentTime();

  ratio = (curDate.valueOf() - player.startDate.valueOf()) / player.duration;

  $time.text(formatDate(curDate));
  $timeCur.text(formatDate(curDate));

  if (player.getPlayerState() === player.PlayerState.PLAYING) {
    $slider.val(ratio);
  }

  requestAnimationFrame(updateTime);
}
requestAnimationFrame(updateTime);

$timeTotal.text(formatDate(recentDate));

$slider.on('input', function () {
  var ratio = $(this).val();
  // player.pauseVideo();
  player.seekTo(new Date(player.startDate.valueOf() + player.duration * ratio));
  updateTime();
});

$slider.on('change', function () {
  player.$dispatcher.trigger('update');
  player.seekTo(new Date(epochDate.valueOf() + (recentDate.valueOf() - epochDate.valueOf()) * ratio));
});

$btnPlay.on('click', function () {
  var $this = $(this);

  if ($this.hasClass('pause')) {
    $this.removeClass('pause');
    player.playVideo();
  } else {
    $this.addClass('pause');
    player.pauseVideo();
  }
});

$btnGotohead.on('click', function () {
  player.seekTo(epochDate);
  $slider.val(0);
});

player = new Player({
  start_date: epochDate,
  end_date: recentDate,
  $btn_play: $btnPlay,
  $slider: $slider
});

player.playVideo();

player.$dispatcher.on('onStateChange', function (_, data) {
  console.log('state:', data);
});

},{}]},{},[1]);
