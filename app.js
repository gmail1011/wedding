//app.js
App({

  login_weixin: function (data) {
    console.log("-------------========")
    console.log(data)
      wx.request({
        url: host+'user/login',
        data: data,  
      success: (res => {
        console.log("----------------")
        console.log(res.data.data)  
        if (res.statusCode === 200) {
          //200: 服务端业务处理正常结束

          this.globalData.userId = res.data.userId
        } else {
          //其它错误，提示用户错误信息
           
        } 
      }),
      fail: (res => {
        if (this._errorHandler != null) {
          this._errorHandler(res)
        }
        reject(res)
      }) 

    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // wx.request({
    //   url: 'http://dengpaoedu.com/weixin//buyer/product/list',
    //   success: (res => {
    //     console.log("----------------")
    //     console.log(res)
    //     if (res.statusCode === 200) {
    //       //200: 服务端业务处理正常结束
    //       resolve(res)
    //     } else {
    //       //其它错误，提示用户错误信息
    //       if (this._errorHandler != null) {
    //         //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
    //         this._errorHandler(res)
    //       }
    //       reject(res)
    //     }
    //   }),
    //   fail: (res => {
    //     if (this._errorHandler != null) {
    //       this._errorHandler(res)
    //     }
    //     reject(res)
    //   })

    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              this.login_weixin(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId:null
  }
})