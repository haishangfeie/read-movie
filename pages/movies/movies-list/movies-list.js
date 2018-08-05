// pages/movies/movies-list/movies-list.js
import wxp from '../../../utils/wx-promise';
import MovieCards from '../MovieCards';
const app = getApp();
const baseUrl = app.globalData.baseApiUrl;
const initStart = 0;
const initCount = 20;
const count = initCount;

Page({
  data: {
    movies: [],
    isEnd: false,
    start: initStart,
    isUpdate: false
  },
  onLoad(opts) {
    // this.updateMovies('top250');
  },
  // updateMovies(key) {
  //   if (!this.data.isUpdate) {
  //     this.setData({
  //       isUpdate:true
  //     });
  //     let url = `${baseUrl}/v2/movie/${key}?start=${
  //       this.data.start
  //     }&count=${count}`;
  //     this.showLoading();
  //     wxp
  //       .request({
  //         url
  //       })
  //       .then(res => {
  //         let { subjects } = new MovieCards('', res.data.subjects);
  //         this.setData({
  //           movies: subjects
  //         });
  //         wx.hideLoading();
  //         // 如果数据的长度等于希望获取的长度，则认为还有数据可以加载
  //         if (subjects.length === initCount) {
  //           this.setData({
  //             start: this.data.start + initCount
  //           });
  //         } else {
  //           this.setData({
  //             isEnd: true
  //           });
  //         }
  //       });
  //   }
  // }
});
