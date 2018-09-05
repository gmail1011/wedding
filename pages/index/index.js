//index.js
//获取应用实例
const app = getApp()
var util = require("../../util/util")
var socketOpen = false
var socketMsgQueue = []
Page({
  data: {
    images: [{ url: "../../images/img_1.jpg" }, { url: "../../images/img_2.jpg" }, { url: "../../images/img_3.jpg" }, { url: "../../images/img_4.jpg" },],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  loadSocket: function () {
    console.log("======连接====");
    wx.connectSocket({
      url: 'ws://dengpaoedu.com/weixin/webSocket',
      method: "GET",
      success: function (res) {
        console.log("======连接成功");

      },
      fail: function () {
        console.log("======连接成功失败");
      } 
    }) 

    wx.onSocketOpen(function (res) {
    
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    wx.onSocketMessage(function (res) {
     
      let message=JSON.parse(res.data);
      console.log("======收到消息====" + res.data + "   " + message.anwserType);
      if (message.anwserType==1){
        console.log("=====11111111111");
        // 选择题
        wx.navigateTo({
          url: '../singleChoiceDetail/singleChoiceDetail?data=' + res.data
        });

      } else if (message.anwserType == 2) {
        // 问答题

      } else if (message.anwserType == 3) {
      // 视频在线提问题

      } else if (message.anwserType ==4) {
      // 点赞倒计时题
      }
    })


  },
  //事件处理函数
  bindViewTap: function () {

    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  playVideo: function (event) {
    wx.navigateTo({
      url: '../video/video'
    })
  },
  onLoad: function () {
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (true) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
         
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.loadSocket();
  },
  onLaunch: function () {

  },
  onShow: function () {
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})