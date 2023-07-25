import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
//importing token has different syntax in vite than React
const TMDB_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZWMyNTQ2M2Y4ZGZlNGEzNTFiZGYwNGYwMjlmMzlhOSIsInN1YiI6IjY0YjM2YTI5MjNkMjc4MDBhZGM5MDIxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ihoJZMBuhI95wnk80S3S_n3qkU_2IUru1-VqElF_BaM'

const headers = {
  Authorization: "bearer" + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
