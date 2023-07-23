// pages/value-add/fill_info/index.js
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
  },
  submitInfo(e) {
    // Toast({
    //   context: this,
    //   selector: '#t-toast',
    //   message: '提交成功',
    //   icon: '',
    //   duration: 1000,

    // });
    // wx.navigateBack();
    wx.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1000,
      success: function () {
        setTimeout(function () {
          wx.navigateBack({ //返回
            delta: 1
          })
        }, 1000);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})