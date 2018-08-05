// pages/movies/movie-detail/movie-detail.js
Page({
  data: {
    movie: null
  },
  onLoad() {
    this.setData({
      movie: getApp().globalData.movieDetail
    });
  }
});
var a = {
  title: '这个杀手不太冷 Léon',
  original_title: '这个杀手不太冷 Léon',
  countries: ['法国'],
  year: 1994,
  wish_count: 71203,
  comments_count: 203861,
  directors: [{ avatars: { large: null }, name: '吕克·贝松' }],
  casts: [
    {
      avatars: {
        large:
          'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg'
      },
      name: '吕克·贝松'
    },
    {
      avatars: {
        large:
          'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg'
      },
      name: '让·雷诺'
    },
    {
      avatars: {
        large:
          'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg'
      },
      name: '娜塔莉·波特曼'
    }
  ],
  genres: ['剧情', '动作', '犯罪'],
  summary: '',
  image:
    'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg',
  rating: { average: 9.4, max: 10, min: 0, stars: '45' },
  directorsTxt: '吕克·贝松',
  castsTxt: '吕克·贝松 / 让·雷诺 / 娜塔莉·波特曼',
  countriesTxt: '法国',
  genresTxt: '剧情/动作/犯罪',
  directorsAndcastsArr: [
    {
      imgUrl:
        'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p33301.jpg',
      role: '主演',
      name: '吕克·贝松'
    },
    {
      imgUrl:
        'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p8833.jpg',
      role: '主演',
      name: '让·雷诺'
    },
    {
      imgUrl:
        'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p2274.jpg',
      role: '主演',
      name: '娜塔莉·波特曼'
    }
  ]
};
