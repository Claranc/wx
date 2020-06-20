// pages/language/language.js

var utilMd5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    outputVal: '',
    array: ["文言文 至 白话文", "白话文 至 文言文","中文 至 英文", "英文 至 中文"],
    index: 0,
    process:"翻译结果:",
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindConfirm: function(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },

  translation: function(e) {
    this.setData({
      inputVal: e.detail.value.textarea
    })
    var that = this;
    that.setData({
      process:"翻译中"
    })
    console.log('start ', this.data.index)
    if(this.data.index >= 0 && this.data.index <= 3) {
      if(this.data.inputVal == "") {
        that.setData({
          outputVal: ""
        })
        return
      }
      let urlEncodeQ = encodeURIComponent(this.data.inputVal)
      let inputParam = '20171014000088210' + this.data.inputVal + '34' + 'SOGxECeBexPAxEvNTPne';
      console.log(" inputParam = ", inputParam)
      let signVal = utilMd5.md5(inputParam);
      console.log('signval = ', signVal);
      let fromLanguage = '';
      let toLanguage = '';
      if (this.data.index == 0) {
        fromLanguage = 'wyw';
        toLanguage= 'zh';
      } else if(this.data.index == 1) {
        fromLanguage = 'zh';
        toLanguage = 'wyw';
      } else if(this.data.index == 2) {
        fromLanguage = 'zh';
        toLanguage = 'en';
      } else {
        fromLanguage = 'en';
        toLanguage = 'zh';
      }
      wx.request({
        url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
        method: "POST",
        data:{
          q: this.data.inputVal,
          from: fromLanguage,
          to: toLanguage,
          appid: '20171014000088210',
          salt: '34',
          sign: signVal,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        success(res) {
          console.log(res.data)
          let outputStr = res.data.trans_result[0].dst;
          console.log(outputStr)
          that.setData({
            outputVal: outputStr,
            process:"翻译结果:"
          })
        }
      })
    }
  },
})