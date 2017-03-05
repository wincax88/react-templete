//var React = require('react');
//var Crypto = require("crypto-js");


var GetFormatTime = function(timestamp, hasDate) {
  var a = new Date(timestamp * 1000);
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var hour2 = hour >= 10 ? hour : '0' + hour;
  var min2 = min >= 10 ? min : '0' + min;

  // var sec = a.getSeconds();
  var time = year + '年' + month + '月' + date + '日 ' + hour2 + ':' + min2 + ' ';
  if (!hasDate) {
    time = hour2 + ':' + min2 + ' ';
  }
  return time;
}

var getFormatDate = function(timestamp) {
  var a = new Date(timestamp * 1000);
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();

  // var sec = a.getSeconds();
  var time = year + '年' + month + '月' + date + '日 ';
  return time;
}

var initDistpicker = function(target) {
  $(target).distpicker({
    autoSelect: false,
    province: '---- 所在省 ----',
    city: '---- 所在市 ----',
    district: '---- 所在区 ----'
  });
}

module.exports = {
  InitDistpicker: initDistpicker,
  GetFormatTime: GetFormatTime,
  GetFormatDate : getFormatDate,
}
