'use strict';

class Player {
  constructor(opts) {
    this.startDate = opts.start_date || new Date(-62135596800000);;
    this.endDate = opts.end_date || new Date();
    this.duration = this.endDate.valueOf() - this.startDate.valueOf();

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

    timerId = setInterval(() => {
      if(this.curDate.valueOf() >= this.endDate.valueOf()) {
        clearInterval(timerId);
        this._state = this.PlayerState.ENDED;
        this.triggerStateChange();
      }
      this.curDate = new Date(this.curDate.valueOf() + 1000);
    }, 1000);
  }

  pauseVideo() {
    clearInterval(timerId);
    this._state = this.PlayerState.PAUSED;
    this.triggerStateChange();
  }

  stopVideo() {
    clearInterval(timerId);
    this._state = this.PlayerState.ENDED;
    this.triggerStateChange();
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
