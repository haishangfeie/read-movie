// pages/movies/movies.js
import wxp from '../../utils/wx-promise';
import MovieCards from './MovieCards';
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
const initStart = 0;
const initCount = 20;
let start = initStart;
const count = initCount;
let isUpdateMovies = false;
let updateMoviesReq = null;
Page({
  data: {
    in_theaters: null,
    coming_soon: null,
    top250: null,
    isShowSearchPage: false,
    isFocus: false,
    inputTimer: null,
    searchRes: null,
    input: '',
    isSearchMoviesEnd: false
  },
  onLoad() {
    this.initParams();
    this.showLoading();
    Promise.all([
      this.getMovies('in_theaters', '正在热映'),
      this.getMovies('coming_soon', '即将上映'),
      this.getMovies('top250', '豆瓣top250')
    ]).then(() => {
      console.log('hideLoading');
      wx.hideLoading();
    });
  },
  initParams() {
    isUpdateMovies = false;
    start = initStart;
  },
  getMovies(key, title) {
    let url = baseUrl + '/v2/movie/' + key;
    // 添加参数
    url += '?start=0&count=3';
    return new Promise((resolve, reject) => {
      wxp
        .request({
          url
        })
        .then(res => {
          let obj = new MovieCards(title, res.data.subjects);
          this.setData({
            [key]: obj
          });
          console.log(key);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  focusInput() {
    this.setData({
      isFocus: true
    });
  },
  delInput() {
    // 清除内容和输入
    this.setData({
      input: '',
      searchRes: null,
      isShowSearchPage: false,
      isSearchMoviesEnd: false
    });
    // 初始化参数
    start = initStart;
  },
  searchMovie(e) {
    // 记录当前输入值
    this.setData({
      input: e.detail.value
    });
    // 节流
    clearTimeout(this.data.inputTimer);
    let inputTimer = setTimeout(() => {
      if (e.detail.value === '') {
        this.setData({
          searchRes: null,
          isShowSearchPage: false,
          input: e.detail.value,
          isSearchMoviesEnd: false
        });
        return;
      }
      // 初始化参数
      start = initStart;
      let url = `${baseUrl}/v2/movie/search?q=${
        this.data.input
      }&start=${start}&count=${count}`;
      this.showLoading();
      // 在搜索前将 isSearchMoviesEnd 重置为 false
      this.setData({ isSearchMoviesEnd: false });
      wxp
        .request({
          url
        })
        .then(res => {
          let { subjects } = new MovieCards('', res.data.subjects);
          // 给搜索结果赋值前，要先将可能发送的加载更多的请求取消掉，因为如果不取消掉，搜索结果后会混入之前加载更多的结果
          updateMoviesReq && updateMoviesReq.abort(); // 取消请求任务
          this.setData(
            {
              isShowSearchPage: true,
              searchRes: subjects
            },
            wx.hideLoading
          );
          // 如果数据的长度等于希望获取的长度，则认为还有数据可以加载
          if (subjects.length === initCount) {
            start += initCount;
          } else {
            this.setData({
              isSearchMoviesEnd: true
            });
          }
        });
    }, 400);
    this.setData({ inputTimer });
  },
  updateMovies() {
    let url = `${baseUrl}/v2/movie/search?q=${
      this.data.input
    }&start=${start}&count=${count}`;
    if (!isUpdateMovies && !this.data.isSearchMoviesEnd) {
      isUpdateMovies = true;
      this.showLoading();
      // 这里没有使用 promise 是因为请求在输入搜索时要取消
      updateMoviesReq = wx.request({
        url,
        success: res => {
          let { subjects } = new MovieCards('', res.data.subjects);
          this.setData(
            {
              isShowSearchPage: true,
              searchRes: [...this.data.searchRes, ...subjects]
            },
            () => {
              wx.hideLoading();
              isUpdateMovies = false;
            }
          );

          // 如果数据的长度等于希望获取的长度，则认为还有数据可以加载
          if (subjects.length === initCount) {
            start += initCount;
          } else {
            this.setData({
              isSearchMoviesEnd: true
            });
          }
        },
        fail: () => {
          wx.hideLoading();
          isUpdateMovies = false;
        },
        complete: () => {
          console.log('updateMovies完成了');
          updateMoviesReq = null;
        }
      });
    }
  },
  showLoading(obj = { title: '加载中...' }) {
    wx.showLoading(obj);
  }
});
