import { TMDBMovie, TMDBTV } from "@/types/api.types";
import { ShowBaseType } from "@/types/app.types";

export const transformTMDBMovie = (show: TMDBMovie | TMDBTV): ShowBaseType => ({
  id: String(show.id),
  title: "title" in show ? show.title : show.name,
  image: show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : show.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${show.backdrop_path}`
    : "",
  year:
    ("release_date" in show ? show.release_date : show.first_air_date)?.slice(
      0,
      4
    ) || "N/A",
});
