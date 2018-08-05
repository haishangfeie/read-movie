export default class Movie {
  constructor(movie_s) {
    this.title = movie_s.title;
    this.original_title = movie_s.original_title;
    this.countries = movie_s.countries;
    this.year = movie_s.year;
    this.wish_count = movie_s.wish_count;
    this.comments_count = movie_s.comments_count;
    this.directors = movie_s.directors;
    this.casts = movie_s.casts;
    this.genres = movie_s.genres;
    this.summary = movie_s.summary;
    this.image = movie_s.images.large;
    this.rating = movie_s.rating;
    this.directorsTxt = this.getObjTxt(movie_s.directors);
    this.castsTxt = this.getObjTxt(movie_s.casts);
    this.countriesTxt = this.getArrTxt(movie_s.countries);
    this.genresTxt = this.getArrTxt(movie_s.genres);
    this.directorsAndcastsArr = this.getAllPersonCardArr({
      directors: movie_s.directors,
      casts: movie_s.casts
    });
  }
  getObjTxt(arr) {
    let str = '';
    arr.forEach((item, index) => {
      str += item.name + ' / ';
    });
    return str.slice(0, -3);
  }
  getArrTxt(arr) {
    let str = '';
    arr.forEach((item, index) => {
      str += item + '/';
    });
    return str.slice(0, -1);
  }
  getAllPersonCardArr(obj) {
    let personCardArr = [
      ...this.getPersonCardArr(obj.directors, '导演'),
      ...this.getPersonCardArr(obj.casts, '主演')
    ];
    return personCardArr;
  }
  getPersonCardArr(arr, role) {
    let personCardArr = [];
    arr.forEach((item, index) => {
      if (item.avatars && item.avatars.large) {
        let obj = {
          imgUrl: item.avatars.large,
          role,
          name: item.name
        };
        personCardArr.push(obj);
      }
    });
    return personCardArr;
  }
}
var a = {
  title: '这个杀手不太冷 Léon',
  original_title: '这个杀手不太冷 Léon',
  countries: ['法国'],
  year: 1994,
  wish_count: 71203,
  comments_count: 203861,
  directors: [
    {
      avatars: { large: null },
      name: '吕克·贝松'
    }
  ],
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
  rating: { average: 9.4, max: 10, min: 0, stars: '45' }
};
