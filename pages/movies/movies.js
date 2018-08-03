// pages/movies/movies.js
import wxp from '../../utils/wx-promise';
import Movie from './Movie';
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
Page({
  onLoad() {
    this.getMovies('in_theaters', '正在热映');
    this.getMovies('coming_soon', '即将上映');
    this.getMovies('top250', '豆瓣top250');
  },
  getMovies(key, title) {
    let url = baseUrl + '/v2/movie/' + key;
    // 添加参数
    url += '?start=0&count=3';
    wxp
      .request({
        url
      })
      .then(res => {
        let obj = { title };
        obj.subjects = [];
        res.data.subjects.forEach(item => {
          obj.subjects.push(new Movie(item));
        });
        debugger;
        this.setData({
          [key]: obj
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: {
    in_theaters: {
      // title: '正在热映',
      // movies: [
      //   {
      //     name: '你的名字',
      //     image: '/images/tmp1.jpg',
      //     rating: 8,
      //     stars: 44
      //   },
      //   {
      //     name: '我不是潘金莲',
      //     image: '/images/tmp1.jpg',
      //     rating: 7,
      //     stars: 36
      //   },
      //   {
      //     name: '名侦探柯南：天空的遇难船',
      //     image: '/images/tmp1.jpg',
      //     rating: 6,
      //     stars: 30
      //   }
      // ]
    },
    coming_soon: {},
    top250: {}
  }
});
