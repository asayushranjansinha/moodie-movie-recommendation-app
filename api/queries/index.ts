import {
  fetchAiringToday,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovies,
  fetchPersonDetails,
  fetchSimilarMovies,
  fetchSimilarTvs,
  fetchTvCredits,
  fetchTvShowDetails as fetchTvDetails,
  fetchTVShows,
} from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";

export const usePopularMovies = () =>
  useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => fetchMovies({ type: "popular" }),
  });

export const useUpcomingMovies = () =>
  useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: () => fetchMovies({ type: "upcoming" }),
  });

export const useTopRatedShows = () =>
  useQuery({
    queryKey: ["tv", "top_rated"],
    queryFn: () => fetchTVShows({ type: "top_rated" }),
  });

export const useMovieDetails = (id: string) =>
  useQuery({
    queryKey: ["movie", "details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });

export const useTvDetails = (id: string) =>
  useQuery({
    queryKey: ["tv", "details", id],
    queryFn: () => fetchTvDetails(id),
    enabled: !!id,
  });

export const useMovieCredits = (id: string) =>
  useQuery({
    queryKey: ["movie", "credits", id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
  });

export const useTvCredits = (id: string) =>
  useQuery({
    queryKey: ["tv", "credits", id],
    queryFn: () => fetchTvCredits(id),
    enabled: !!id,
  });

export const useSimilarMovies = (id: string) =>
  useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id),
    enabled: !!id,
  });
export const useSimilarTvs = (id: string) =>
  useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarTvs(id),
    enabled: !!id,
  });

export const usePersonDetails = (personId: string) =>
  useQuery({
    queryKey: ["person", "details", personId],
    queryFn: () => fetchPersonDetails(personId),
    enabled: !!personId,
  });

export const useAiringToday = () => {
  return useQuery({
    queryKey: ["airing-today"],
    queryFn: fetchAiringToday,
  });
};

export const useMoviesByCategory = (category: string) =>
  useQuery({
    queryKey: ["movies", `${category}`],
    queryFn: () => fetchMovies({ type: category }),
  });

export const useTvsByCategory = (category: string) =>
  useQuery({
    queryKey: ["tv", `${category}`],
    queryFn: () => fetchTVShows({ type: category }),
  });
