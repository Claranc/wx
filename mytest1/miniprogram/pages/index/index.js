// pages/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false, // 是否显示搜索框
    inputVal: "",
    category_box_width: 100, //分类总宽度
    categories: ["上装", "裤装"]
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
})