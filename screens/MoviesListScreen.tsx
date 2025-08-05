import { useMoviesByCategory } from "@/api/queries";
import { Card } from "@/components/app/Card";
import PageHeader from "@/components/app/PageHeader";
import { theme } from "@/constants/theme";
import { ShowBaseType } from "@/types/app.types";
import { transformTMDBMovie } from "@/utils/tmdb";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const NUM_COLUMNS = 3;
const CARD_GAP = theme.spacing.md; // Gap between cards
const TOTAL_HORIZONTAL_SPACE = theme.spacing.lg * 2; // Left + right padding
const TOTAL_GAP_SPACE = CARD_GAP * (NUM_COLUMNS - 1); // Gaps between cards
const AVAILABLE_WIDTH = SCREEN_WIDTH - TOTAL_HORIZONTAL_SPACE - TOTAL_GAP_SPACE;
const CARD_WIDTH = AVAILABLE_WIDTH / NUM_COLUMNS;

const CARD_ASPECT_RATIO = 1.5; // Height/Width ratio (3:2 aspect ratio)
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;

const MoviesListScreen = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { data, isLoading } = useMoviesByCategory(category);
  const router = useRouter();
  const onItemPress = (id: string) => {
    router.push(`/movie/${id}/details`);
  };

  if (!data || isLoading) return null;

  const movies = data?.results?.map(transformTMDBMovie) ?? [];

  const renderItem = ({
    item,
    index,
  }: {
    item: ShowBaseType;
    index: number;
  }) => (
    <View style={styles.cardContainer} key={`${item.id}-${index}`}>
      <Card
        title={item.title}
        image={item.image}
        year={item.year}
        onPress={() => {
          onItemPress(item.id);
        }}
        style={styles.card}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <PageHeader
        title="Movies"
      />
      <View style={styles.content}>
        <FlatList
          data={movies}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          ListEmptyComponent={
            !isLoading && <Text style={styles.emptyText}>No movies found.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  grid: {
    paddingBottom: theme.spacing.xl,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: CARD_GAP,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.xl,
  },
});

export default MoviesListScreen;
