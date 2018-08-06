// pages/movies/movies-list/movies-list.js
import wxp from '../../../utils/wx-promise';
import MovieCards from '../MovieCards';
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
const initStart = 0;
const initCount = 20;
let start = initStart;
const count = initCount;
let isUpdate = false;
Page({
  data: {
    movies: [],
    isEnd: false,
    key: ''
  },
  onLoad(opts) {
    this.setNavigationBarTitleText(opts.title);
    this.setData({ key: opts.key }, () => {
      this.updateMovies();
    });
    this.initParams();
  },
  initParams() {
    isUpdate = false;
    start = initStart;
  },
  setNavigationBarTitleText(title) {
    wx.setNavigationBarTitle({
      title
    });
  },
  updateMovies() {
    if (!isUpdate && !this.data.isEnd) {
      isUpdate = true;
      let url = `${baseUrl}/v2/movie/${
        this.data.key
      }?start=${start}&count=${count}`;
      this.showLoading();
      wxp
        .request({
          url
        })
        .then(res => {
          let { subjects } = new MovieCards('', res.data.subjects);
          this.setData(
            {
              movies: [...this.data.movies, ...subjects]
            },
            () => {
              wx.hideLoading();
              isUpdate = false;
            }
          );
          // 如果数据的长度等于希望获取的长度，则认为还有数据可以加载
          if (subjects.length === initCount) {
            start += initCount;
          } else {
            this.setData({
              isEnd: true
            });
          }
        })
        .catch(() => {
          wx.hideLoading();
          isUpdate = false;
        });
    }
  },
  showLoading(obj = { title: '加载中...' }) {
    wx.showLoading(obj);
  }
});
