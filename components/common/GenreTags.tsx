import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { theme } from "@/constants/theme";
import Badge from "@/components/ui/Badge";

interface GenreTagsProps {
  genres: string[];
  maxVisible?: number;
}

const GenreTags: React.FC<GenreTagsProps> = ({ genres, maxVisible }) => {
  const displayGenres = maxVisible ? genres.slice(0, maxVisible) : genres;

  const renderGenreTag = (genre: string, index: number) => (
    <Badge style={styles.badgeContainer} key={`genre-${index}`}>
      <Text style={styles.badgeText}>{genre}</Text>
    </Badge>
  );

  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {displayGenres.map(renderGenreTag)}
        {maxVisible && genres.length > maxVisible && (
          <TouchableOpacity style={styles.moreTag}>
            <Text style={styles.moreText}>+{genres.length - maxVisible}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default GenreTags;

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    gap: theme.spacing.sm,
  },
  moreTag: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
  },
  moreText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: "600",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  badgeText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "600",
    marginLeft: theme.spacing.xs,
  },
});
