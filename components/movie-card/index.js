// components/movie-card/index.js
import wxp from '../../utils/wx-promise';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTapCard(e) {
      getApp().globalData.movieDetail = e.currentTarget.dataset.movie;
      wxp.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail'
      })
    }
  },
  externalClasses: ['my-movie-card']
});
