import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Description from "@/components/common/Description";
import GenreTags from "@/components/common/GenreTags";
import HorizontalCarousel from "@/components/common/HorizontalCarousel";

import HeroBanner from "@/components/common/HeroBanner";
import MovieCredits from "@/features/movie/MovieCredits";
import MovieMeta from "@/features/movie/MovieMeta";

import { useMovieDetails, useSimilarMovies } from "@/api/queries";
import { theme } from "@/constants/theme";
import { transformTMDBMovie } from "@/utils/tmdb";
import { useCallback } from "react";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: movie, isLoading } = useMovieDetails(id);
  const { data: similar, isLoading: loadingRecs } = useSimilarMovies(id);
  const onItemPress = useCallback(
    (id: string) => {
      router.push(`/movie/${id}/details`);
    },
    [router]
  );
  const onCastMemberPress = useCallback(
    (id: string) => {
      router.push(`/cast/${id}`);
    },
    [router]
  );

  if (!movie || isLoading) return null;

  const similarMovies = similar?.map(transformTMDBMovie) ?? [];
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.screen}>
        <HeroBanner
          imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          onBackPress={() => router.back()}
        />

        <View style={styles.content}>
          <MovieMeta
            title={movie.title}
            release_date={movie.release_date}
            runtime={movie.runtime}
            rating={movie.vote_average}
            matchPercentage={88}
          />

          <Description
            title="Synopsis"
            description={movie.overview}
            maxLines={3}
          />
        </View>
        <MovieCredits movieId={id} onCastMemberPress={onCastMemberPress} />
        <View style={styles.content}>
          <GenreTags genres={movie.genres.map((g) => g.name)} />
        </View>
        {!loadingRecs && (
          <HorizontalCarousel
            items={similarMovies}
            onItemPress={onItemPress}
            title="More Like This"
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
  },
});

export default MovieDetailsScreen;
