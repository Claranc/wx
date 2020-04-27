// pages/rowText/rowText.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    inputImg: '',
    outputWord: '',
    base64Data: '',
    gender:'',
    score:'',
    process:'',
  },



  chooseimage: function () {
    var _this = this;
    var imgBase64 = ""
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log("image choose success. " + res.tempFilePaths)
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          process: "执行中..."
        })
        imgBase64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        
        // 请求百度API
        console.log("start")
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=cOqjXvgrrMGuvLD8KOApPIBD&client_secret=FwHuFnoYIszms3ls7iit4s3VssvxvL6p',
          method: "GET",
          header: {
            'content-type': 'application/json;charset=utf-8' // 默认值
          },
          success: function(res) {
            console.log("get token success" + res.data.access_token)
            var token = res.data.access_token
            // 评分
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token='+token,
              method: "POST",
              data:{
                image: imgBase64,
                image_type: 'BASE64',
                face_field: 'beauty,gender',
              },
              header: {
                'content-type': 'application/json;charset=utf-8' // 默认值
              },
              success(res) {
                console.log(res.data.result.face_list[0].beauty)
                _this.setData({
                  gender:res.data.result.face_list[0].gender.type,
                  score:res.data.result.face_list[0].beauty,
                  process:'',
                })
              }
            })
          },
        })
      }
    })
  },
})