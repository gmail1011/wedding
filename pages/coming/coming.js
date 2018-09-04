//index.js
var util = require("../../util/util")
//获取应用实例
var app = getApp()
Page({
  data: {
    lists: [
      {
        videoId:null,
        videoUrl:null,
        videoImgUrl:null,
        videoPlayNumber:12,
        title: "《高山流水》 - 古筝",
        videoDescrption:null,
        videoUploadName: util.ossAliyuncs + "/images/banner6.jpg",
        videoFavorate:null,
        videoSpack:0,
        isVideo: true,
        createTime:null
         
      } 
    ],
    controls: true//是否显示播放控件
  },
  onLoad: function (options) {

    console.log("====222======" + host + "video/list")
    wx.request({
      url: util.host +"video/list",
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
  //下拉刷新
  onPullDownRefresh: function () {

  },
  //上拉加载
  onReachBottom: function () {

  },
  //点击video对象播放当前视频
  play: function (e) {
    //当前对象索引
    var index = e.currentTarget.id.split("-")[1],
      lists = this.data.lists,
      video = wx.createVideoContext(e.currentTarget.id);
    //当前video对象 isPlay设置     
    lists[index].isPlay = !!lists[index].isPlay ? false : true;

    console.log(lists[index].isPlay)

    //isPlay为true 执行播放操作
    if (lists[index].isPlay) {
      //播放当前video对象时其他video对象全部停止
      lists.forEach(function (item, i) {
        if (item.isVideo) {
          var video = wx.createVideoContext("vds-" + i);
          video.pause();
          //设置其他其他video对象isPlay为false
          if (i != index)
            item.isPlay = false;
        }
      });
      video.play();
    } else {
      video.pause();
    }
  },
  //进入详情
  detail: function (e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../details/detail?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.title
    })
  }
})
