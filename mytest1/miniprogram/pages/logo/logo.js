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
    process:'',
    result1:"",
    result2:"",
    result3:"",
    result4:"",
    result5:"",
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
          score:'',
          animalType:'',
          process: "执行中...",
          result1:"",
          result2:"",
          result3:"",
          result4:"",
          result5:"",
        })
        imgBase64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64");
        
        // 请求百度API
        console.log("start")
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=bzLnnqfiCeVCQyX9GfF8Fv3D&client_secret=AoCM0smfVBszhnQLtjzeQQtujccy0igp',
          method: "GET",
          header: {
            'content-type': 'application/json;charset=utf-8' // 默认值
          },
          success: function(res) {
            console.log("get token success" + res.data.access_token)
            var token = res.data.access_token
            // 评分
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/logo?access_token='+token,
              method: "POST",
              data:{
                image: imgBase64,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
              },
              success: function(res) {
                console.log(res.data)
                if (res.data.error_code != null) {
                  _this.setData({
                    process:res.data.error_msg
                  })
                  return
                }
                var resList = res.data.result
                var res1 = ""
                var res2 = ""
                var res3 = ""
                var res4 = ""
                var res5 = ""
                for(let i = 0; i < resList.length; i++) {
                  if(i == 0) {
                    res1 = resList[i].name + "  概率:" + resList[i].probability 
                  } else if (i == 1) {
                    res2 =  resList[i].name + "  概率:" + resList[i].probability 
                  } else if (i == 2) {
                    res3 =  resList[i].name + "  概率:" + resList[i].probability 
                  } else if (i == 3) {
                    res4 = resList[i].name + "  概率:" + resList[i].probability 
                  } else if ( i == 4) {
                    res5 =  resList[i].name + "  概率:" + resList[i].probability 
                  }
                }
                _this.setData({
                  process: "",
                  result1: res1,
                  result2: res2,
                  result3: res3,
                  result4:res4,
                  result5:res5,
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
      fail: function(e) {
        _this.setData({
          process:'检测失败',
        })
      }
    })
  },
})