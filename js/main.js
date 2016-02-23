var recentDate = new Date(2016, 3, 30, 13 - 9, 4, 33);
var epochDate = new Date(-62135596800000); // 西暦1年1月1日0時0分0秒
var curDate = epochDate;
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
  ratio = $slider.val();

  $time.text(formatDate(curDate));
  $timeCur.text(formatDate(curDate));
  requestAnimationFrame(updateTime);
}
requestAnimationFrame(updateTime);

$timeTotal.text(formatDate(recentDate));

$slider.on('change', function() {
  curDate = new Date(epochDate.valueOf() + (recentDate.valueOf() - epochDate.valueOf()) * ratio);
});

$btnPlay.on('click', function() {
  var $this = $(this);

  if($this.hasClass('pause')) {
    $this.removeClass('pause');
    play();
  } else {
    $this.addClass('pause');
    pause();
  }
});

$btnGotohead.on('click', function() {
  pause();
  curDate = epochDate;

  if(!$this.hasClass('pause')) {
    play();
  }
});

play();

function incr() {
  curDate = new Date(curDate.valueOf() + 1000);
}

function play() {
  timerId = setInterval(incr, 1000);
}

function pause() {
  clearInterval(timerId);
}

function updateSlider() {
}