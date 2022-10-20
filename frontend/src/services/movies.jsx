import axios from 'axios';

class MovieDataService{

  async getAll(page=0) {
    return axios.get(`http://localhost:3000/api/v1/movies?page=${page}`);
  }

  async get(id) {
    return axios.get(`http://localhost:3000/api/v1/movies/id/${id}`);
  }

  find(query, by="title", page=0) {
    return axios.get(`http://localhost:3000/api/v1/movies?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`http://localhost:3000/api/v1/movies/review/`, data);
  }

  updateReview(data) {
    return axios.put(`http://localhost:3000/api/v1/movies/review`, data);
  }

  async deleteReview(id, userId) {
    return axios.delete(`http://localhost:3000/api/v1/movies/review/`, {data:{review_id:id, user_id:userId}});
  }

  async getRatings() {
    return axios.get(`http://localhost:3000/api/v1/movies/ratings`);
  }
}

export default new MovieDataService;
