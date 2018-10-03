//index.js
var util = require("../../util/util")
var timer = require('./time.js');
//获取应用实例
var util = require('../../util/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: "",
    end_second: 1538706600,
    controls: true,//是否显示播放控件,
    color: util.HSV_to_RGB(100, 200, 100)
  },
  onLoad: function (options) {
    console.log('onLoad ' + this.end_second);
    var that = this

    setInterval(function () {
      var current = new Date();
    
      if (current.getTime() >= that.data.end_second) {
        var end = new Date();
        end.setHours(23, 59, 59, 999);
        that.end_second = end.getTime() + 1;
      }
      var diff_time = Math.floor((that.data.end_second - current.getTime()/1000));
      var days = Math.floor(diff_time / 86400);
      var timesecodes = diff_time - days * 86400;
      var hours = Math.floor(timesecodes/ 3600);
      var minutes = Math.floor((timesecodes / 60) % 60);
      var seconds = timesecodes % 60;
      var realTime = days +' 天 '+(hours < 10 ? '0' : '') + hours + ' : ' + (minutes < 10 ? '0' : '') + minutes + ' : ' + (seconds < 10 ? '0' : '') + seconds

      that.setData({
        motto: realTime
      });

      if (seconds%3==0){
        that.changeColor(hours, minutes, seconds);
      }
      
    }, 1000);
  },
  //下拉刷新
  onPullDownRefresh: function () {

  },
  //上拉加载
  onReachBottom: function () {

  },
  changeColor: function (hours, minutes, seconds) {
    var h = util.calculate_h(hours, minutes, seconds);
    var s = util.calculate_s(hours, minutes, seconds);
    var v = util.calculate_v(hours, minutes, seconds);
    var font_h = h + 0.5;
    if (font_h > 1) {
      font_h -= 1;
    }

    this.setData({
      color: util.HSV_to_RGB(font_h, s, v),
      background_color: util.HSV_to_RGB(h, s, v)
    })
  }
 
 
})
