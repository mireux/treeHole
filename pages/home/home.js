// pages/index/index.js
import {
  fetchHome
} from '../../services/home/home';
import {
  fetchGoodsList
} from '../../services/good/fetchGoods';
// import Toast from 'tdesign-miniprogram/toast/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://img2.baidu.com/it/u=3444986166,1231900769&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686157200&t=7d27eca1100a86f33feb343a35cc3ada'
    }, {
      id: 1,
      type: 'image',
      url: 'https://img0.baidu.com/it/u=1526731885,124917181&fm=253&fmt=auto&app=138&f=JPEG?w=1357&h=500',
    }], //轮播图数据
    iconList: [{
      icon: 'emoji',
      color: 'red',
      badge: 1,
      name: '广场',
      url: '/pages/home/home',
    }, {
      icon: 'friend',
      color: 'orange',
      badge: 2,
      name: '树洞',
      url: '',
    }, {
      icon: 'noticefill',
      color: 'yellow',
      badge: 3,
      name: '组局',
      url: '/pages/grouping/index',
    }, {
      icon: 'questionfill',
      color: 'olive',
      badge: 4,
      name: '其他',
      url: '/pages/value-add/index',
    }], //九宫格数据
    gridCol: 4, //九宫格显示行数
    tagList: ['最新发布', '最热发布'],
    index: 0, //tab选中下标
    TabCur: 0,
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    tabList: [],
  },
  goodListPagination: {
    index: 0,
    num: 20,
  },
  privateData: {
    tabIndex: 0,
  },
  //tab点击事件
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  detail() {
    wx.navigateTo({
      url: '/pages/addRepair/index',
    })
  },
  onShow() {
    this.getTabBar().init();
  },

  goodListClickHandle(e) {
    console.log(e);
    const {
      index
    } = e.detail;
    wx.navigateTo({
      url: `/pages/post/detail/index?index=${index}`,
    });
  },
  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },
  //点击九宫格
  pageDetail(e) {
    let that = this;
    let url = that.data.iconList[e.currentTarget.dataset.index].url;
    if (e.currentTarget.dataset.index === 0) {
      this.loadGoodsList()
    } else if (e.currentTarget.dataset.index === 1) {
      this.setData({
        goodsList: []
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }

  },
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  goPage(e) {

  },
  fabHandleClick(e) {
    console.log("添加新的树洞");
    wx.navigateTo({
      url: `/pages/post/new-post/index`,
    });
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
  init() {
    this.loadHomePage();
  },
  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({
      swiper
    }) => {
      this.setData({
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.init();
  },
  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });

      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3
      });
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})