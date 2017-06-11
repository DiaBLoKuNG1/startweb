
jQuery(document).ready(function(){
  var cd = jQuery('.countdown-box');
  if(cd.length){
    var deadline  = cd.data('date') + ' ' + cd.data('time');

    updateTime(deadline);
    setInterval(updateTime,1000,deadline);
  }
});

function dateFromString(str) {
  var a = jQuery.map(str.split(/[^0-9]/), function(s) { return parseInt(s, 10) });
  return new Date(a[0], a[1]-1 || 0, a[2] || 1, a[3] || 0, a[4] || 0, a[5] || 0, a[6] || 0);
}

function updateTime(time){
  var obj = getTimeRemaining(time);
  jQuery('.countdown-box .day .value').html(obj.days);
  jQuery('.countdown-box .hour .value').html(obj.hours);
  jQuery('.countdown-box .min .value').html(obj.minutes);
  jQuery('.countdown-box .sec .value').html(obj.seconds);
}

function getTimeRemaining(endtime){
  // var t = Date.parse(endtime) - Date.parse(new Date());
  var t = dateFromString(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': Math.max(days,0),
    'hours': Math.max(hours,0),
    'minutes': Math.max(minutes,0),
    'seconds': Math.max(seconds,0)
  };
}
