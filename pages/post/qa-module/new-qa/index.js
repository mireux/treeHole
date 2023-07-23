// pages/post/qa-module/new-qa/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relation: '',
    content: '',
    title: '',
    subjectText: '',
    subjectVisible: false,
    subjectValue: [],
    subjects: [{
        label: '电子信息',
        value: '电子信息'
      },
      {
        label: '机械工程',
        value: '机械工程'
      },
      {
        label: '会展',
        value: '会展'
      },
      {
        label: '工商',
        value: '工商'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onSubjectPicker() {
    this.setData({
      subjectVisible: true
    })
  },
  onPickerChange(e) {
    const {
      value
    } = e.detail;

    console.log('picker change:', e.detail);
    this.setData({
      subjectVisible: false,
      subjectValue: value,
      subjectText: value.join(' '),
    });
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
  onPickerCancel() {
    this.setData({
      subjectVisible: false,
    });
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