(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(opts) {
    _classCallCheck(this, Player);

    this.startDate = opts.start_date || new Date(-62135596800000);;
    this.endDate = opts.end_date || new Date();
    this.duration = this.endDate.valueOf() - this.startDate.valueOf();

    this.$btnPlay = opts.$btn_play;
    this.$slider = opts.$slider;

    this.PlayerState = {
      'ENDED': 0,
      'PLAYING': 1,
      'PAUSED': 2
    };

    this.$dispatcher = $({});

    this._state;

    this.initialize();
  }

  _createClass(Player, [{
    key: 'initialize',
    value: function initialize() {
      this.curDate = this.startDate;
    }
  }, {
    key: 'playVideo',
    value: function playVideo() {
      var _this = this;

      this._state = this.PlayerState.PLAYING;
      this.triggerStateChange();

      this.timerId = setInterval(function () {
        if (_this.curDate.valueOf() >= _this.endDate.valueOf()) {
          _this.stopVideo();
        }
        _this.curDate = new Date(_this.curDate.valueOf() + 1000);
      }, 1000);
    }
  }, {
    key: 'pauseVideo',
    value: function pauseVideo() {
      clearInterval(this.timerId);
      this._state = this.PlayerState.PAUSED;
      this.triggerStateChange();
    }
  }, {
    key: 'stopVideo',
    value: function stopVideo() {
      clearInterval(this.timerId);
      this._state = this.PlayerState.ENDED;
      this.triggerStateChange();
      this.$btnPlay.addClass('pause');

      this.seekTo(this.startDate);
      this.$slider.val(0);
    }
  }, {
    key: 'seekTo',
    value: function seekTo(date) {
      this.curDate = date;
    }
  }, {
    key: 'getPlayerState',
    value: function getPlayerState() {
      return this._state;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.curDate;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'triggerStateChange',
    value: function triggerStateChange() {
      this.$dispatcher.trigger('onStateChange', this._state);
    }
  }]);

  return Player;
}();

exports.default = Player;

},{}],2:[function(require,module,exports){
'use strict';

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

player = new _Player2.default({
  start_date: epochDate,
  end_date: recentDate,
  $btn_play: $btnPlay,
  $slider: $slider
});

player.playVideo();

player.$dispatcher.on('onStateChange', function (_, data) {
  console.log('state:', data);
});

},{"./Player":1}]},{},[2]);
