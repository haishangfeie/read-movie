// components/stars/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: null,
      value: 0
    }
  },
  attached() {
    this.ratingToArray()
  },
  /**
   * 组件的初始数据
   */
  data: {
    ratingArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ratingToArray() {
      let rating = this.properties.rating * 10;
      let ratingArr = [];
      while (ratingArr.length <= 5) {
        if (rating - 10 > 0) {
          ratingArr.push(10);
          rating -= 10;
        } else if (rating - 5 > 0) {
          ratingArr.push(5);
          rating -= 5;
        } else {
          ratingArr.push(0);
        }
      }
      this.setData({
        ratingArr
      });
    }
  }
});
