
var app = getApp()
var util = require("../../util/util")
Page({
  data: {
    list: []
  },
  onLoad: function () {
    var that=this
    wx.request({
      url: util.host + '/user/prize/listPrize', 
      data: {
        userId: app.globalData.userId
      },
      success: function (res) {
          console.log("-------->");
        console.log(res.data.data)
        that.setData({
          list: res.data.data
        })
      },
      fail: function (res) {
        console.log("fail");
        console.log(res)
      }
    }) 



    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})