import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Description from "@/components/common/Description";
import GenreTags from "@/components/common/GenreTags";
import HorizontalCarousel from "@/components/common/HorizontalCarousel";

import HeroBanner from "@/components/common/HeroBanner";

import { useSimilarTvs, useTvDetails } from "@/api/queries";
import { theme } from "@/constants/theme";
import TVCredits from "@/features/tv/TVCredits";
import TVMeta from "@/features/tv/TVMeta";
import { transformTMDBMovie } from "@/utils/tmdb";
import { useCallback } from "react";

const TVDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: tv, isLoading } = useTvDetails(id);
  const { data: similar, isLoading: loadingRecs } = useSimilarTvs(id);
  const onItemPress = useCallback(
    (id: string) => {
      router.push(`/tv/${id}/details`);
    },
    [router]
  );
  const onCastMemberPress = useCallback(
    (id: string) => {
      router.push(`/cast/${id}`);
    },
    [router]
  );

  if (!tv || isLoading) return null;

  const similarTvs = similar?.map(transformTMDBMovie) ?? [];
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={styles.screen}>
        <HeroBanner
          imageUrl={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          onBackPress={() => router.back()}
        />

        <View style={styles.content}>
          <TVMeta tv={tv} />

          <Description
            title="Synopsis"
            description={tv.overview}
            maxLines={3}
          />
        </View>
        <TVCredits tvId={id} onCastMemberPress={onCastMemberPress} />
        <View style={styles.content}>
          <GenreTags genres={tv.genres.map((g) => g.name)} />
        </View>
        {!loadingRecs && (
          <HorizontalCarousel
            items={similarTvs}
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

export default TVDetailsScreen;
