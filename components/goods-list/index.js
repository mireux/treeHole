Component({
  externalClasses: ['wr-class'],

  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  data: {
    independentID: '',
  },

  lifetimes: {
    ready() {
      this.init();
    },
  },

  methods: {


    init() {
      this.genIndependentID(this.id || '');
    },

    genIndependentID(id) {
      if (id) {
        this.setData({
          independentID: id
        });
      } else {
        this.setData({
          independentID: `goods-list-${~~(Math.random() * 10 ** 8)}`,
        });
      }
    },
  },
});