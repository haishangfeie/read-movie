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
