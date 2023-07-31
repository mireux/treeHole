Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    listItem: {
      type: Object
    },
    index: {
      type: Number
    }
  },

  data: {},

  lifetimes: {
    ready() {
      // this.init();
      console.log(this.data);
    },
    detached() {
      // this.clear();
    },
  },

  pageLifeTimes: {},

  methods: {

  }
});