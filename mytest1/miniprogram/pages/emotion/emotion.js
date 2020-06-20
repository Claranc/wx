// pages/language/language.js

var utilMd5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    process:'',
    optimistic:'',
    pessimistic:'',
    neutral:'',
  },

  translation: function(e) {
    if (e.detail.value.textarea == "") {
      return
    }
    var _this = this
    // 请求百度API
    _this.setData({
      process:"处理中",
    })
    console.log("start")
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=cOqjXvgrrMGuvLD8KOApPIBD&client_secret=FwHuFnoYIszms3ls7iit4s3VssvxvL6p',
      method: "GET",
      header: {
        'content-type': 'application/json;charset=GBK' // 默认值
      },
      success: function(res) {
        console.log("get token success" + res.data.access_token)
        var token = res.data.access_token
        console.log("req = " + e.detail.value.textarea)
        // 评分
        wx.request({
          url: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/emotion?access_token='+token +"&charset=UTF-8",
          method: "POST",
          data:{
            text: e.detail.value.textarea,
          },
          header: {
            'content-type': 'application/json;charset=utf-8' // 默认值
          },
          success: function(res) {
            console.log(res.data)
            if (res.data.error_code != null) {
              _this.setData({
                process:res.data.error_msg,
                optimistic: "",
                pessimistic:"",
                neutral: "",
              })
              return
            }
            var resList = res.data.items
            var opt = ''
            var pes = ''
            var neu = ''
            for(let i = 0; i < 3; i++) {
              if(resList[i].label == "optimistic") {
                opt = "正向情绪: "+resList[i].prob
              } else if(resList[i].label == "pessimistic") {
                pes = "反向情绪: "+resList[i].prob
              } else {
                neu = "中性情绪: " +resList[i].prob
              }
            }
            _this.setData({
              optimistic: opt,
              pessimistic:pes,
              neutral:neu,
              process:'',
            })
          },
          fail: function(res) {
            _this.setData({
              process:'检测失败',
            })
          },
        })
      },
    })
    
  },
})