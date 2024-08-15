import axios from 'axios';

// URL FILMES EM CARTAZ:
// https://api.themoviedb.org/3/movie/now_playing?api_key=7b45a390504c5a2f6079662497b6ad99&language=pt-BR&page=1

export const key = process.env.API_KEY;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;
