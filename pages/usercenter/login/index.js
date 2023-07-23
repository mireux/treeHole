// pages/usercenter/login/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    inputValue: '123'
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    console.log(e);
    this.setData({
      avatarUrl,
    })
    console.log(this.data.avatarUrl);
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

  getUserAvatar() {
    console.log("获取头像");
  },

  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      inputValue: e.detail.value
    })
  },
  onSubmit(e) {
    console.log(e);
    // console.log(this.data.avatarUrl);
    // console.log(this.data.inputValue);
    // console.log("登录");
    wx.uploadFile({
      filePath: this.data.avatarUrl,
      name: 'avatarImg',
      header: {
        "Content-Type": "multipart/form-data"
      },
      url: 'http://localhost:8989/upload/avatar', //服务器端接收图片的路径
      success: function (res) {
        const data = JSON.parse(res.data)
        console.log(data); //发送成功回调
        if (data.code !== 200) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: data.message,
            icon: '',
            duration: 1000,
          });
        } else {
          // 上传成功 进行登陆
          wx.login({
            success: (res) => {
              wx.request({
                url: 'http://localhost:8989/login',
                method: 'POST',
                data: {
                  "code": res.code,
                  "nickName": "lhjlhj",
                  "avatar": data.data
                },
                success: function (res) {
                  console.log(res.data)
                  if (res.data.code === 200) {
                    // 登陆成功 
                    // TODO获取数据并且返回给上一级或者存储到全局变量中
                    wx.setStorageSync('loginData', res.data.data)
                    wx.switchTab({
                      url: '/pages/usercenter/index',
                    })
                  }
                }
              })
            },
          })
        }
      }
    })


  }
})