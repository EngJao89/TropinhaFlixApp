export function getListMovies(size: any, movies: any[]) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }
  return popularMovies;
}

export function randomBanner(movies: any[]) {
  return Math.floor(Math.random() * movies.length);
}
