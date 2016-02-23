var recentDate = new Date(2016, 3, 30, 13 - 9, 4, 33);
var epochDate = new Date(-62135596800000); // 西暦1年1月1日0時0分0秒
var curDate = epochDate;
var $slider = $('.slider');
var $time = $('.face .time time');
var $timeCur = $('.player .time-cur');
var $timeTotal = $('.player .time-total');
var ratio;

function formatDate(date) {
  var ret = `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日 ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
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

setInterval(function() {
  curDate = new Date(curDate.valueOf() + 1000);
}, 1000);
