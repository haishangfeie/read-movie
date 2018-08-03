export default class Movie {
  constructor(movie_s) {
    this.title = movie_s.title;
    this.image = movie_s.images.large;
    this.rating = movie_s.rating;
  }
}
