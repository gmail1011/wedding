var util = require("../..//util/util")
var that=null;
Page({
  data: {
    isShow: false,//控制emoji表情是否显示
    hideImage:true,
    isLoad: true,//解决初试加载时emoji动画执行一次
    content: "",//评论框的内容
    isLoading: true,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
    videoUrl: util.host1 + "/min/wedding1.mp4",
    detail:
      {
        imgUrl: util.host + "img_video.png",
        title: "双管巴乌",
        info: "6666。",
        avatar: util.ossAliyuncs + "/images/banner4.jpg",
        uName: "雨碎江南",
        isVideo: true,
       
        browse: 4299,
        like: 2113,
        comment: 789,
        time: "昨天" 
      },
    comments: [
      {
        avatar: util.ossAliyuncs + "/images/banner4.jpg",
        uName: "😝月老",
        time: "2018-8-11",
        content: "祝你们幸福"
      },
      {
        avatar: util.ossAliyuncs + "/images/banner6.jpg",
        uName: "玫瑰草",
        time: "2018-9-11",
        content: "加油你们是最幸福的"
      },
      {
        avatar: util.ossAliyuncs + "/images/banner2.jpg",
        uName: "麦田的守望者",
        time: "2018-07-11",
        content: "一下子长这么大了，好快"
      },
      {
        avatar: util.ossAliyuncs + "/images/Screenshot_2016-12-13-10-13-16-926.png",
        uName: "~LUCK",
        time: "2018-6-11",
        content: "厉害了"
      },
      {
        avatar: util.ossAliyuncs + "/images/banner3.jpg",
        uName: "沃德天·娜么帥",
        time: "2018-7-21",
        content: "好早 加油"
      }
    ],
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
    alipayEmoji: [],//支付宝表情
    title: ''//页面标题
  },
  play(e) {

  },
  onLoad: function (options) {
    that=this;
    console.log("------->" + util.host1+ "min/" + options.videoId);

    that.setData({
     
        videoUrl: util.host1 + "min/" + options.videoId,
    })

    var em = {}, that = this, emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
    that.setData({
      emojis: emojis
    })
    //alipayEmoji
    // for (var j = 1; j <= 121; j++) {
    //   if (j < 10) j = "0" + j;
    //   that.data.alipayEmoji.push("emotion_small_" + j)
    // }
  },
  onReady: function () {
    // 页面渲染完成
    //设置当前标题
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  // 开始播放
  bindplay:function(){
      this.setData({
        hideImage:false
      })
  },
  bindpause:function(){
    this.setData({
      hideImage: true
    })
  },


  onUnload: function () {
    // 页面关闭
  },
  //上拉加载
  onReachBottom: function () {
    var conArr = [], that = this;
    that.data.cfBg = false;
    console.log("onReachBottom")
    if (that.data._index < 5) {
      for (var i = 0; i < 5; i++) {
        conArr.push({
          avatar: util.ossAliyuncs + "/images/banner5.jpg",
          uName: "雨碎江南",
          time: util.formatTime(new Date()),
          content: "我是上拉加载的新数据" + i
        })

      }
      //模拟网络加载
      setTimeout(function () {
        that.setData({
          comments: that.data.comments.concat(conArr)
        })
      }, 1000)
    } else {
      that.setData({
        isLoading: false
      })
    }
    ++that.data._index;
  },
  //解决滑动穿透问题
  emojiScroll: function (e) {
    console.log(e)
  },
  //文本域失去焦点时 事件处理
  textAreaBlur: function (e) {
    //获取此时文本域值
    console.log(e.detail.value)
    this.setData({
      content: e.detail.value
    })

  },
  //文本域获得焦点事件处理
  textAreaFocus: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  //点击表情显示隐藏表情盒子
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false,
      cfBg: !this.data.false
    })
  },
  //表情选择
  emojiChoose: function (e) {
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content + e.currentTarget.dataset.emoji
    })
  },
  //点击emoji背景遮罩隐藏emoji盒子
  cemojiCfBg: function () {
    this.setData({
      isShow: false,
      cfBg: false
    })
  },
  //发送评论评论 事件处理
  send: function () {
    var that = this, conArr = [];
    //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
    setTimeout(function () {
      if (that.data.content.trim().length > 0) {
        conArr.push({
          avatar: util.ossAliyuncs + "/images/banner5.jpg",
          uName: "雨碎江南",
          time: util.formatTime(new Date()),
          content: that.data.content
        })
        that.setData({
          comments: that.data.comments.concat(conArr),
          content: "",//清空文本域值
          isShow: false,
          cfBg: false
        })
      } else {
        that.setData({
          content: ""//清空文本域值
        })
      }
    }, 100)
  }
})