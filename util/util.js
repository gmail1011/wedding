
var host = "http://dengpaoedu.com/weixinapp/";
 
var host1 ="http://dengpaoedu.com/"; 
var socket = "ws://dengpaoedu.com/weixinapp/"; 
function getDate() {
  var time = new Date()
  var year = time.getFullYear()
  var month = time.getMonth()
  month = month < 10 ? '0' + month : month
  var day = time.getDay()
  day = day < 10 ? '0' + day : day
  return [year, month, day].join('-')
}

function getTime() {
  var time = new Date() 
  var hours = time.getHours()
  hours = hours < 10 ? '0' + hours : hours
  var minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = time.getSeconds()
  second = second < 10 ? '0' + second : second
  return [hours, minute, second].join(':')
} 

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function get_end_of_today() {
  var end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime() + 1;
}

function padding_hex(num) {
  var tmp = "00" + num.toString(16);

  return tmp.substring(tmp.length - 2);
}

function HSV_to_RGB(h, s, v) {
  var r, g, b, i, f, p, q, t;

  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return "#" + padding_hex(r) + padding_hex(g) + padding_hex(b);
}

function calculate_h(hours, minutes, seconds) {
  // var today_seconds = hours * 3600 + minutes * 60 + seconds;
  // var total_day_seconds = 24 * 3600;
  var today_seconds = seconds;
  var total_day_seconds = 60;
  var tmp = 240 + 360 * today_seconds / total_day_seconds;
  if (tmp > 360) {
    tmp -= 360;
  }

  return tmp / 360;
}

function calculate_s(hours, minutes, seconds) {
  return 0.37;
}

function calculate_v(hours, minutes, seconds) {
  var min_v = 0.6;
  var max_v = 1;

  // var today_seconds = hours * 3600 + minutes * 60 + seconds;
  // var half_day_seconds = 12 * 3600;

  var today_seconds = seconds;
  var half_day_seconds = 30;

  return (max_v - min_v) * (half_day_seconds - Math.abs(today_seconds - half_day_seconds)) / half_day_seconds + min_v;
}

module.exports = {
  formatTime: formatTime,
  get_end_of_today: get_end_of_today,
  HSV_to_RGB: HSV_to_RGB,
  calculate_h: calculate_h,
  calculate_s: calculate_s,
  calculate_v: calculate_v,
  formatTime: formatTime,
  getDate: getDate,
  getTime: getTime,
  host: host,
  host1: host1,
  socket: socket
}
