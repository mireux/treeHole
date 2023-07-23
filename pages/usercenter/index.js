import {
  fetchUserCenter
} from '../../services/usercenter/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';

const menuData = [
  [{
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: '',
    },
  ],
  [{
    title: '退出登录',
    tilte: '',
    url: '',
    type: 'logout',
    icon: ''
  }]
];
const orderTagInfos = [{
    title: '我发布的',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '我喜欢的',
    iconName: 'deliver',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: '我评论的',
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: '回复通知',
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 1,
  }
];
const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    // phoneNumber: '',
  },
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data: {
    showMakePhone: false,
    userInfo: {
      avatarUrl: '',
      nickName: '',
      // phoneNumber: '',
    },
    menuData,
    orderTagInfos,
    customerServiceInfo: {},
    currAuthStep: 1,
    showKefu: true,
    versionNo: '',
  },

  onLoad(option) {
    this.getVersionInfo();
  },

  onShow() {
    try {
      console.log(this.data.userInfo);
      var value = wx.getStorageSync('loginData')
      if (value) {
        // Do something with return value
        console.log(value.avatar);
        this.setData({
          userInfo: value,
          currAuthStep: 2
        })
        console.log(this.data.userInfo);
      }
    } catch (e) {
      // Do something when catch error
    }
    this.getTabBar().init();
    // console.log("show ");
    // const loginData = wx.getStorageSync('loginData')
    // console.log(loginData);
    // this.setData({
    //   userInfo: loginData
    // })
    // this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.fetUseriInfoHandle();
  },

  fetUseriInfoHandle() {
    fetchUserCenter().then(
      ({
        userInfo,
        countsData,
        orderTagInfos: orderInfo,
        customerServiceInfo,
      }) => {
        // eslint-disable-next-line no-unused-expressions
        menuData?.[0].forEach((v) => {
          countsData.forEach((counts) => {
            if (counts.type === v.type) {
              // eslint-disable-next-line no-param-reassign
              v.tit = counts.num;
            }
          });
        });
        const info = orderTagInfos.map((v, index) => ({
          ...v,
          ...orderInfo[index],
        }));
        this.setData({
          userInfo,
          menuData,
          orderTagInfos: info,
          customerServiceInfo,
          currAuthStep: 2,
        });
        wx.stopPullDownRefresh();
      },
    );
  },

  onClickCell({
    currentTarget
  }) {
    const {
      type
    } = currentTarget.dataset;

    switch (type) {
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'logout': {
        this.setData({
          userInfo: {},
          currAuthStep: 1
        })
        wx.removeStorageSync('loginData')
        Toast({
          context: this,
          selector: '#t-toast',
          message: '退出成功!',
          icon: '',
          duration: 1000,
        });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    console.log(e);
    const status = e.detail.tabType;
    console.log(status);
    if (status === 0) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了回复通知',
        icon: '',
        duration: 1000,
      });
      // wx.navigateTo({
      //   url: '/pages/order/after-service-list/index'
      // });
    } else if (status === 5) {
      // wx.navigateTo({
      //   url: `/pages/order/order-list/index?status=${status}`
      // });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了我发布的',
        icon: '',
        duration: 1000,
      });
    } else if (status === 10) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了我喜欢的',
        icon: '',
        duration: 1000,
      });
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '你点击了我评论的',
        icon: '',
        duration: 1000,
      });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({
      url: '/pages/order/order-list/index'
    });
  },

  openMakePhone() {
    this.setData({
      showMakePhone: true
    });
  },

  closeMakePhone() {
    this.setData({
      showMakePhone: false
    });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const {
      currAuthStep
    } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({
        url: '/pages/usercenter/person-info/index'
      });
    } else {
      wx.navigateTo({
        url: '/pages/usercenter/login/index'
      })
      // this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const {
      version,
      envVersion = __wxConfig
    } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});