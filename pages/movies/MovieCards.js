import Movie from './Movie';
export default class MovieCards {
  constructor(title, subjects) {
    this.title = title;
    this.subjects = [];
    subjects.forEach(item => {
      this.subjects.push(new Movie(item));
    });
  }
}
