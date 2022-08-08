// pages/feedback/feedback.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word1: "",
    word2: "",
  },

  addClick: function(e) {
    var that = this
    if (that.data.word1 == "" || that.data.word2 == "") {
      wx.showModal({
        title: '提示',
        content: '请输入一组近义词哦~',
        confirmText: "我知道了",
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } 
    else {
      wx.cloud.callFunction({
        name: 'add_new_words',
        data: {
          word1: that.data.word1,
          word2: that.data.word2,
        },
        success: res => {
          console.log(res);
          if (res.result.errCode == 0) {
            wx.showModal({
              title: '提示',
              content: '添加成功！',
              confirmText: "我知道了",
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.showModal({
              title: '抱歉，出错了呢~',
              content: res.result.errMsg,
              confirmText: "我知道了",
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        },
        fail: err => {
          console.log(err)
          console.error('[云函数] [reply_feedback] 调用失败', err)
          wx.showModal({
            title: '调用失败',
            content: '请检查云函数是否已部署',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },

  bindKeyInputWord1: function(e) {
    console.log("Word1 input", e.detail.value)
    this.setData({
      word1: e.detail.value
    })
  },

  bindKeyInputWord2: function(e) {
    console.log("Word2 input", e.detail.value)
    this.setData({
      word2: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})