// pages/value-add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planeImageSrc: "https://p5.toutiaoimg.com/origin/pgc-image/Sb8QWM17Xc9zUR?from=pc",
    carImageSrc: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fe6fe2ae0-587a-4bf4-b403-33d04c3f784e%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691323631&t=8fb1f81b59b5cd1aa228ad32451ff89a"
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

  },
  fillInfo(e) {
    console.log(e);
    const id = e.target.dataset.valuetype
    wx.navigateTo({
      url: '/pages/value-add/fill_info/index?id=' + id,
    })
  },
})