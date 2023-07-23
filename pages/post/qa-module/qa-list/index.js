// pages/post/qa-module/qa-list/index.js
Component({
  externalClasses: ['wr-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    qaList: {
      type: 'Array',
      value: [],
    },
    id: {
      type: 'String',
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
  },

  lifetimes: {
    ready() {
      this.init();
      console.log(this.qaList);
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    independentID: "",
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      console.log(this.qaList);
      this.genIndependentID(this.id || '');
    },
    genIndependentID(id) {
      if (id) {
        this.setData({
          independentID: id
        });
      } else {
        this.setData({
          independentID: `qa-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },

  }
})