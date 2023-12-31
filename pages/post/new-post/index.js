// pages/post/new-post/index.js
const $api = require('../../../services/_utils/api').API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    checked: false,
    typeValue: "0",
    options: [{
        value: 0,
        label: '圈子'
      },
      {
        value: 1,
        label: '树洞'
      }
    ],
  },
  handleChange(e) {
    this.setData({
      typeValue: e.detail.value
      // checked: e.detail.checked,
    });
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
  createPost(e) {
    let openId = wx.getStorageSync('loginData').openId
    console.log(openId);
    let data = {
      publishUser: openId,
      postTitle: "测试",
      postBody: "测试内容时这个，你说能不能一次成功",
      tags: 0,
      contactInformation: '15330477982'
    }
    console.log(data);
    $api.addPost(data).then(res => {
      console.log(res);
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  method: {
    handleAdd(e) {
      const {
        fileList
      } = this.data;
      const {
        files
      } = e.detail;

      // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
      this.setData({
        fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
      });

      // 方法2：每次选择图片都上传，展示每次上传图片的进度
      // files.forEach(file => this.uploadFile(file))
    },
    onUpload(file) {
      const {
        fileList
      } = this.data;

      this.setData({
        fileList: [...fileList, {
          ...file,
          status: 'loading'
        }],
      });
      const {
        length
      } = fileList;

      const task = wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: 'file',
        formData: {
          user: 'test'
        },
        success: () => {
          this.setData({
            [`fileList[${length}].status`]: 'done',
          });
        },
      });
      task.onProgressUpdate((res) => {
        this.setData({
          [`fileList[${length}].percent`]: res.progress,
        });
      });
    },
    handleRemove(e) {
      const {
        index
      } = e.detail;
      const {
        fileList
      } = this.data;

      fileList.splice(index, 1);
      this.setData({
        fileList,
      });
    },
  }
})