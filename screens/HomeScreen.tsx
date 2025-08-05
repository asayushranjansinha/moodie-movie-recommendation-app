import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";

import HorizontalCarousel from "@/components/common/HorizontalCarousel";
import AiringToday from "@/features/home/AiringToday";

import {
  usePopularMovies,
  useTopRatedShows,
  useUpcomingMovies,
} from "@/api/queries";

import { theme } from "@/constants/theme";
import { transformTMDBMovie } from "@/utils/tmdb";

const HomeScreen = () => {
  const router = useRouter();

  const { data: popularData, isLoading: isPopularLoading } = usePopularMovies();
  const { data: upcomingData, isLoading: isUpcomingLoading } =
    useUpcomingMovies();
  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useTopRatedShows();

  const handleMoviePress = useCallback(
    (id: string) => {
      router.push(`/movie/${id}/details`);
    },
    [router]
  );

  const handleTvPress = useCallback(
    (id: string) => {
      router.push(`/tv/${id}/details`);
    },
    [router]
  );

  const handleNotificationsPress = useCallback(() => {
    console.log("Notifications Pressed");
  }, []);

  const popularMovies = popularData?.results?.map(transformTMDBMovie) ?? [];
  const upcomingMovies = upcomingData?.results?.map(transformTMDBMovie) ?? [];
  const topRatedTV = topRatedData?.results?.map(transformTMDBMovie) ?? [];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <AiringToday onNotificationsPress={handleNotificationsPress} />

        {!isUpcomingLoading && upcomingMovies.length > 0 && (
          <HorizontalCarousel
            title="Coming Soon"
            items={upcomingMovies}
            onItemPress={handleMoviePress}
            seeAllHref="/movie/upcoming"
          />
        )}

        {!isPopularLoading && popularMovies.length > 0 && (
          <HorizontalCarousel
            title="Popular Movies"
            items={popularMovies}
            onItemPress={handleMoviePress}
            seeAllHref="/movie/popular"
          />
        )}

        {!isTopRatedLoading && topRatedTV.length > 0 && (
          <HorizontalCarousel
            title="Top Rated TV Shows"
            items={topRatedTV}
            onItemPress={handleTvPress}
            seeAllHref="/tv/top_rated"

          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;
