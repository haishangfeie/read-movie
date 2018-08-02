// pages/movies/movies.js
import wxp from '../../utils/wx-promise';
import Movie from './Movie'
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
Page({
  onLoad() {
    this.getMovies('coming_soon');
  },
  getMovies(key) {
    let url = baseUrl + '/v2/movie/' + key;
    // 添加参数
    url += '?start=0&count=3';
    wxp
      .request({
        url
      })
      .then(res => {
        console.log(res);
        res.data.forEach(item => {
          console.log(new Movie(item))
        });
        // console.log(class Movie())
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: {
    in_theaters: null,
    coming_soon: null,
    top250: null,
    isShowSearchPage:true
  },
  onLoad() {
    this.getMovie('in_theaters', '正在热映');
    this.getMovie('coming_soon', '即将上映');
    this.getMovie('top250', '豆瓣top250');
  },
  getMovie(key, titleTxt) {
    let url = baseUrl + '/v2/movie/' + key + '?start=0&count=3';
    wxp
      .request({
        url
      })
      .then(res => {
        console.log(res.data);
        let movies = { title: titleTxt, subjects: [] };
        res.data.subjects.forEach((item, index) => {
          movies.subjects.push(new Movie(item));
        });
        console.log(movies);
        this.setData({ [key]: movies });
      });
  }
});
