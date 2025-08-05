import {
  FetchTMDBOptions,
  TMDBCreditsResponse,
  TMDBMovie,
  TMDBMovieDetailResponse,
  TMDBMovieListResponse,
  TMDBPersonDetails,
  TMDBTV,
  TMDBTVDetailResponse,
  TMDBTVListResponse,
} from "@/types/api.types";
import axios from "axios";

const TMDB_API_BASE = "https://api.themoviedb.org/3";

// LISTS
export const fetchMovies = async ({
  type = "popular",
  language = "en-US",
  page = 1,
  query,
}: FetchTMDBOptions): Promise<TMDBMovieListResponse> => {
  let url = "";

  if (type === "search") {
    url = `${TMDB_API_BASE}/search/movie?query=${encodeURIComponent(
      query || ""
    )}&language=${language}&page=${page}`;
  } else {
    url = `${TMDB_API_BASE}/movie/${type}?language=${language}&page=${page}`;
  }

  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

export const fetchTVShows = async ({
  type = "popular",
  language = "en-US",
  page = 1,
  query,
}: FetchTMDBOptions): Promise<TMDBTVListResponse> => {
  let url = "";

  if (type === "search") {
    url = `${TMDB_API_BASE}/search/tv?query=${encodeURIComponent(
      query || ""
    )}&language=${language}&page=${page}`;
  } else {
    url = `${TMDB_API_BASE}/tv/${type}?language=${language}&page=${page}`;
  }

  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

// DETAILS
export const fetchMovieDetails = async (
  id: string,
  language = "en-US"
): Promise<TMDBMovieDetailResponse> => {
  const url = `${TMDB_API_BASE}/movie/${id}?language=${language}`;

  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

export const fetchTvShowDetails = async (
  id: string,
  language = "en-US"
): Promise<TMDBTVDetailResponse> => {
  const url = `${TMDB_API_BASE}/tv/${id}?language=${language}`;

  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

// CREDITS
export const fetchMovieCredits = async (
  movieId: string
): Promise<TMDBCreditsResponse> => {
  const url = `${TMDB_API_BASE}/movie/${movieId}/credits`;

  const res = await axios.get<TMDBCreditsResponse>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

export const fetchTvCredits = async (
  tvId: string
): Promise<TMDBCreditsResponse> => {
  const url = `${TMDB_API_BASE}/tv/${tvId}/credits`;

  const res = await axios.get<TMDBCreditsResponse>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

// SIMILAR
export const fetchSimilarMovies = async (id: string): Promise<TMDBMovie[]> => {
  const url = `${TMDB_API_BASE}/movie/${id}/similar?language=en-US`;

  const res = await axios.get<TMDBMovieListResponse>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data.results;
};

export const fetchSimilarTvs = async (id: string): Promise<TMDBTV[]> => {
  const url = `${TMDB_API_BASE}/tv/${id}/similar?language=en-US`;

  const res = await axios.get<TMDBTVListResponse>(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data.results;
};

export const fetchPersonDetails = async (
  personId: string
): Promise<TMDBPersonDetails> => {
  const url = `${TMDB_API_BASE}/person/${personId}?language=en-US`;

  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return res.data;
};

export const fetchAiringToday = async () => {
  const response = await axios.get(`${TMDB_API_BASE}/tv/airing_today`, {
    params: {
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  });

  return response.data.results?.[0];
};
