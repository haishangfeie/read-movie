// pages/movies/movies.js
import wxp from '../../utils/wx-promise';
import Movie from './Movie';
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
console.log(baseUrl);
Page({
  data: {
    in_theaters: null,
    coming_soon: null,
    top250: null,
    isShowSearchPage:false
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
