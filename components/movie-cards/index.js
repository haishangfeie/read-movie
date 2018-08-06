import wxp from '../../utils/wx-promise';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moviesBlock: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: ''
    }
  },
  externalClasses: ['my-movies-wrap'],
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    getMore(e) {
      let {key,title}=e.currentTarget.dataset;
      wxp.navigateTo({
        url: `/pages/movies/movies-list/movies-list?key=${key}&title=${title}`
      });
    }
  }
});
