// pages/post/qa-module/index.js
import {
  fetchQaList
} from '../../../services/qa/qa';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: "0",
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
    tagList: ['最新发布', '最热发布'],
    qaList: [],
    qaListLoadStatus: 0,
    pageLoading: false,
    current: 1,
  },
  qaListPagination: {
    index: 0,
    num: 20,
  },
  privateData: {
    tabIndex: 0,
  },
  fabHandleClick(e) {
    wx.navigateTo({
      url: `/pages/post/qa-module/new-qa/index`,
    });
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  tabChangeHandle(e) {
    // console.log(e);
    this.setData({
      TabCur: "0",
      scrollLeft: -60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  init() {
    wx.stopPullDownRefresh();
    this.loadQaList(true);
    console.log(this.qaList);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.loadQaList();
  },
  onReTry() {
    this.loadQaList();
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
    if (this.data.qaListLoadStatus === 0) {
      this.loadQaList();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async loadQaList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      qaListLoadStatus: 1
    });

    const pageSize = this.qaListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.qaListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }
    try {
      const nextList = await fetchQaList(pageIndex, pageSize);
      this.setData({
        qaList: fresh ? nextList.qaList : this.data.qaList.concat(nextList.qaList),
        qaListLoadStatus: 0,
      })
      this.qaListPagination.index = pageIndex;
      this.qaListPagination.num = pageSize;
    } catch (err) {
      this.setData({
        qaListLoadStatus: 3
      });
    }
  },

})