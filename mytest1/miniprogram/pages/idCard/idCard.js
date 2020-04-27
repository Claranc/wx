// pages/idCard/idCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputImgBase64: '',
    outputWord: '',
    tempFilePaths: ''
    
  },

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var imgBase64 = 'data:image/jpeg;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        // console.log("base64 = " + imgBase64)
        _this.setData({
          tempFilePaths: res.tempFilePaths[0],
          inputImgBase64: imgBase64,
        })

      
      }
    })
  },


  // 发送百度API
  translation: function(e) {
    this.setData({
      inputVal: e.detail.value.textarea
    })
    var that = this;
    console.log('start ', this.data.index)
    if(this.data.index == 0 || this.data.index == 1) {
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
      } else {
        fromLanguage = 'zh';
        toLanguage = 'wyw';
      }
      wx.request({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
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
            outputVal: outputStr
          })
        }
      })
    }
  },
})