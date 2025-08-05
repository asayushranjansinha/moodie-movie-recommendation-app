import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Badge from "@/components/ui/Badge";
import { theme } from "@/constants/theme";

type MovieMetaProps = {
  title: string;
  release_date: string;
  runtime: number;
  rating: number;
  matchPercentage?: number;
  badge?: string;
};

const formatRuntime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const getYear = (date: string) => {
  return new Date(date).getFullYear();
};

const MovieMeta: React.FC<MovieMetaProps> = ({
  title,
  release_date,
  runtime,
  rating,
  matchPercentage,
  badge = "HD",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.metaRow}>
        {matchPercentage !== undefined && (
          <>
            <Text style={styles.matchPercentage}>{matchPercentage}% match</Text>
            <View style={styles.separator} />
          </>
        )}

        <Text style={styles.metaText}>{getYear(release_date)}</Text>
        <View style={styles.separator} />
        <Text style={styles.metaText}>{formatRuntime(runtime)}</Text>
        <View style={styles.separator} />
        <Text style={styles.metaText}>{rating.toFixed(1)}</Text>
      </View>

      {badge && (
        <Badge style={styles.badgeContainer}>
          <Ionicons name="flame" size={16} color={theme.colors.secondary} />
          <Text style={styles.badgeText}>{badge}</Text>
        </Badge>
      )}
    </View>
  );
};

export default MovieMeta;
const styles = StyleSheet.create({
  container: {
    paddingTop: theme.spacing.md,
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.text,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing.md,
  },
  matchPercentage: {
    ...theme.typography.caption,
    color: theme.colors.success,
    fontWeight: "600",
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.sm,
  },
  metaText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  badgeText: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    fontWeight: "600",
    marginLeft: theme.spacing.xs,
  },
});
