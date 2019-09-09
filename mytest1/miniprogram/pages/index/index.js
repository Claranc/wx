// pages/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false, // 是否显示搜索框
    inputVal: "",
    category_box_width: 100, //分类总宽度
    categories: ['/images/1.jpg', 'images/add-addr.png', 'images/3.jpg'],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  goRowText: function () {
    wx.navigateTo({
      url: "/pages/rowText/rowText"
    })
  },

  goColumnText: function () {
    wx.navigateTo({
      url: "/pages/columnText/columnText"
    })
  },

  goIDCard: function () {
    wx.navigateTo({
      url: "/pages/idCard/idCard"
    })
  },

  goBankCard: function () {
    wx.navigateTo({
      url: "/pages/bankCard/bankCard"
    })
  },

  goLanguage: function () {
    wx.navigateTo({
      url: "/pages/language/language"
    })
  },

})