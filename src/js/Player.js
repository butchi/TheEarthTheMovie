export default class Player {
  constructor(opts) {
    this.startDate = opts.start_date || new Date(-62135596800000);;
    this.endDate = opts.end_date || new Date();
    this.duration = this.endDate.valueOf() - this.startDate.valueOf();

    this.$btnPlay = opts.$btn_play;
    this.$slider = opts.$slider;

    this.PlayerState = {
      'ENDED'   : 0,
      'PLAYING' : 1,
      'PAUSED'  : 2,
    }

    this.$dispatcher = $({});

    this._state;

    this.initialize();
  }

  initialize() {
    this.curDate = this.startDate;
  }

  playVideo() {
    this._state = this.PlayerState.PLAYING;
    this.triggerStateChange();

    this.timerId = setInterval(() => {
      if(this.curDate.valueOf() >= this.endDate.valueOf()) {
        this.stopVideo();
      }
      this.curDate = new Date(this.curDate.valueOf() + 1000);
    }, 1000);
  }

  pauseVideo() {
    clearInterval(this.timerId);
    this._state = this.PlayerState.PAUSED;
    this.triggerStateChange();
  }

  stopVideo() {
    clearInterval(this.timerId);
    this._state = this.PlayerState.ENDED;
    this.triggerStateChange();
    this.$btnPlay.addClass('pause');

    this.seekTo(this.startDate);
    this.$slider.val(0);
  }

  seekTo(date) {
    this.curDate = date;
  }

  getPlayerState() {
    return this._state;
  }

  getCurrentTime() {
    return this.curDate;
  }

  getDuration() {
    return this.duration;
  }

  triggerStateChange() {
    this.$dispatcher.trigger('onStateChange', this._state);
  }
}
