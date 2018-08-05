// components/stars/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Object,
      value: { average: 0, stars: 0 }
    }
  },
  attached() {
    this.ratingToArray();
  },
  /**
   * 组件的初始数据
   */
  data: {
    ratingArr: [0, 0, 0, 0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ratingToArray() {
      let rating = this.properties.rating.stars * 1;
      let ratingArr = [];
      for (let i = 0; i < 5; i++) {
        if (rating - 10 >= 0) {
          ratingArr.push(10);
          rating -= 10;
        } else if (rating - 5 >= 0) {
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
