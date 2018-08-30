var config = require('../../comm/script/config')
var app = getApp();
Page({
  data:{
    gridList: [
      { enName: 'favorite', text: '我的家族', icon:"icon_user_home.png"},
      { enName: 'history', text: '我的收藏',icon:"icon_collection.png"},
      { enName: 'shake', text: '浏览记录', icon: "icon_user_history.png"},
      { enName: 'gallery', text: '婚礼中奖', icon: "icon_user_prize.png"},
      { enName: 'setting', text: '祝福相册', icon: "icon_user_image.png"},
      { enName: 'setting', text: '设置', icon: "icon_user_setting.png"}
    ],
    skin: ''
  },
  onLoad:function(cb){
    var that = this
    console.log(app.globalData.userInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url: "../" + data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  }
})