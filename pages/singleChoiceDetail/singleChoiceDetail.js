var that;
var util = require("../../util/util")
var interval=new Object();
Page({


  data: {
    choseQuestionBank: '',
    currentUserId: null,
    questionList: [{
      title: "谁是最美的新娘",
      number: 12,
      options: ["胡秋蓉", "张三", "李四", "王五"],
      correctAnswer: ["A"],
      userChose: ["B"]
    }],
    times:10,
    nowQuestion:{},
    nowQuestionNumber: '',
    answerId:null,
    choseCharacter: '',
    score: 0,
    // blank:"blank",
    newMultiQuestionList: [],
    loading: true
  },


  onLoad: function(option) {
    that = this;
    var data = JSON.parse(option.data);
    var nowQuestion = {};
    nowQuestion.title = data.title;
    nowQuestion.number = data.number;
    var options = [];
    options.push(data.A);
     options.push(data.B);
    options.push(data.C);
    options.push(data.D);
    nowQuestion.options=options;
    nowQuestion.prize=data.prizeId;
    nowQuestion.content = data.content;

    console.log(data); 
    console.log(nowQuestion);
    this.setData({
      nowQuestion,
      times: data.times,
      answerId: data.anwserId
    });
    this.startTimer(data.times)
  },

  //开始计时
  startTimer: function (currentstartTimer) {

    //注意点3: 清除定时器 为了保证每次只有一个定时器，和下拉刷新 配合，否则会导致 计时数据跳动，因为创建了多个定时器。
    var interval=setInterval(function () {
      var second = currentstartTimer;
      if (second <= 0) {
       
        wx.showToast({
          title: '时间已用完,返回',
        });
       
      }
      if(second<-3){
        clearInterval(interval);
        wx.navigateBack({ changed: true });//返回上一页
      }
      if (second>=0){
        this.setData({
          times: second
        })
      }
     
      currentstartTimer--;
    }.bind(this), 1000);
  },

  getRandomSingleChoice: function(arr, count) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  onShow: function() {

  },

  choseA: function () {
    console.log(  getApp().globalData)
    wx.request({ 
      url: util.host + '/v1/users/answerQuestion',
      data: {
        userId: getApp().globalData.userId,
        answerId: this.data.answerId,
        date: Date.parse(new Date()),
        answer: this.data.nowQuestion.options[0],
        prizeId:this.data.nowQuestion.prize  
 
      },
      success: (res => {
        console.log("----------------")
        console.log(res.data.data)
        if (res.statusCode === 200) {
        } else {

        }
      }),
      fail: (res => {
        if (this._errorHandler != null) {
          this._errorHandler(res)
        }
      })
    })
  },

  choseB: function() {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    if ("B" == answer) {
      getApp().globalData.score++;
      // var score = that.data.score + 1;
      questionList[nowQuestionNumber].attributes.answerResult = "correct";
      questionList[nowQuestionNumber].attributes.userChose = "B";
      that.setData({
        questionList: questionList,
        choseCharacter: "B",
        // score: score,
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    } else if ("B" != answer) {
      questionList[nowQuestionNumber].attributes.answerResult = "error";
      questionList[nowQuestionNumber].attributes.userChose = "B";
      that.setData({
        questionList: questionList,
        choseCharacter: "B",
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    }
  },

  choseC: function() {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    if ("C" == answer) {
      getApp().globalData.score++;
      // var score = that.data.score + 1;
      questionList[nowQuestionNumber].attributes.answerResult = "correct";
      questionList[nowQuestionNumber].attributes.userChose = "C";
      that.setData({
        questionList: questionList,
        choseCharacter: "C",
        // score: score,
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    } else if ("C" != answer) {
      questionList[nowQuestionNumber].attributes.answerResult = "error";
      questionList[nowQuestionNumber].attributes.userChose = "C";
      that.setData({
        questionList: questionList,
        choseCharacter: "C",
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    }

  },

  choseD: function() {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    if ("D" == answer) {
      getApp().globalData.score++;
      // var score = that.data.score + 1;
      questionList[nowQuestionNumber].attributes.answerResult = "correct";
      questionList[nowQuestionNumber].attributes.userChose = "D";
      that.setData({
        questionList: questionList,
        choseCharacter: "D",
        // score: score,
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    } else if ("D" != answer) {
      questionList[nowQuestionNumber].attributes.answerResult = "error";
      questionList[nowQuestionNumber].attributes.userChose = "D";
      that.setData({
        questionList: questionList,
        choseCharacter: "D",
      });
      that.nextQuestion = setTimeout(function() {
        if (nowQuestionNumber == 19) {
          that.setData({
            nowQuestion: questionList[nowQuestionNumber],
            nowQuestionNumber: nowQuestionNumber,
          });
        } else if (nowQuestionNumber != 19) {
          var nextQuestionNumber = nowQuestionNumber + 1;
          that.setData({
            nowQuestion: questionList[nextQuestionNumber],
            nowQuestionNumber: nextQuestionNumber,
          });
        }
      }, 300);
      that.overSingleChoice(nowQuestionNumber);
    }

  },

  afterQuestion: function() {
    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    var afterQuestionNumber = nowQuestionNumber + 1;
    if (questionList[nowQuestionNumber].attributes.answerResult == null) {
      questionList[nowQuestionNumber].attributes.answerResult = "blank";
      questionList[nowQuestionNumber].attributes.userChose = "空";
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
        questionList: questionList
      })
    } else if (questionList[nowQuestionNumber].attributes.answerResult != null) {
      that.setData({
        nowQuestion: questionList[afterQuestionNumber],
        nowQuestionNumber: afterQuestionNumber,
      })
    }
    console.log(that.data.questionList)
  },





  answerCard: function() {
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList,
      getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },

  overSingleChoice: function(questionNumber) {
    getApp().globalData.singleChoiceAnswerNow = that.data.questionList;
    getApp().globalData.multiChoiceAnswerNow = that.data.newMultiQuestionList;
    if (questionNumber == 19) {
      wx.redirectTo({
        url: '../multiChoiceExplain/multiChoiceExplain'
      });
    }
  }

})