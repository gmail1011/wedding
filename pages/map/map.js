// pages/map/index.js
var util = require("../..//util/util")
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, 
  },
  markertap(e) {
    console.log(util.host + "v1/users/getWedding")
    wx.request({
      url: util.host + "v1/users/getWedding",
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        var lng = res.data.data.lng
        var lat = res.data.data.lat   
        console.log(lat)     
        wx.openLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          scale: 18,
          name: res.data.data.hotel,
          address: res.data.data.address
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })

    wx.request({
      url: util.host + "v1/users/getWedding",
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)

        var lng = res.data.data.lng
        var lat = res.data.data.lat
        that.setData({  
          mainInfo: res.data.data,       
          lng: lng, // 全局属性，用来取定位坐标
          lat: lat,
          markers: [{ 
            iconPath: "/images/nav.png",
            id: 0,
            latitude: lat, // 页面初始化 options为页面跳转所带来的参数 
            longitude: lng,
            width: 50,
            height: 50
          }],       
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  callhe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  }
})