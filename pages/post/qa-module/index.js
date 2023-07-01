// pages/post/qa-module/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrcs: [
      'https://img2.baidu.com/it/u=3444986166,1231900769&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686157200&t=7d27eca1100a86f33feb343a35cc3ada',
      'https://img0.baidu.com/it/u=1526731885,124917181&fm=253&fmt=auto&app=138&f=JPEG?w=1357&h=500',
    ],
    tabList: [{
      text: '电子信息',
      key: 0,
    }, {
      text: '机械工程',
      key: 1,
    }, {
      text: '会展',
      key: 2,
    }, {
      text: '工商',
      key: 3,
    }],
  },

  fabHandleClick(e) {
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.getTabBar().init();
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