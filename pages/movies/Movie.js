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

