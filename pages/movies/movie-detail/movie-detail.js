// pages/movies/movie-detail/movie-detail.js
Page({
  data: {
    movie: null,
    isLookBigImg: false
  },
  onLoad() {
    this.setData({
      movie: getApp().globalData.movieDetail
    });
  },
  lookBigImg() {
    this.setData({
      isLookBigImg: true
    });
  },
  closeBigImg(){
    this.setData({
      isLookBigImg: false
    });
  }
});
