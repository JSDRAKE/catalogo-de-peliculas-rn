import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@env";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "es-ES",
  },
});

export const fetchPopularMovies = async () => {
  const response = await api.get("/movie/popular");
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=es-ES`;
    console.log("URL generada:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos obtenidos:", data);
    return data;
  } catch (error) {
    console.error(
      `Error al cargar detalles para movieId=${movieId}:`,
      error.message
    );
    throw error;
  }
};
