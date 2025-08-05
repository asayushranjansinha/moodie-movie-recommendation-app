import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { TMDBTVDetail } from "@/types/api.types"; // update path if needed

type TVMetaProps = {
  tv: TMDBTVDetail;
};

const getYear = (date: string) => {
  return new Date(date).getFullYear();
};

const TVMeta: React.FC<TVMetaProps> = ({ tv }) => {
  const {
    name,
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    vote_average,
    type,
  } = tv;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.metaRow}>
        {first_air_date && (
          <>
            <Text style={styles.metaText}>{getYear(first_air_date)}</Text>
            <View style={styles.separator} />
          </>
        )}

        <Text style={styles.metaText}>
          {number_of_seasons} season{number_of_seasons !== 1 ? "s" : ""}
        </Text>
        <View style={styles.separator} />

        <Text style={styles.metaText}>
          {number_of_episodes} episode{number_of_episodes !== 1 ? "s" : ""}
        </Text>

        {type && (
          <>
            <View style={styles.separator} />
            <Text style={styles.metaText}>{type}</Text>
          </>
        )}

        <View style={styles.separator} />
        <Text style={[styles.metaText, { color: theme.colors.success }]}>
          {vote_average.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default TVMeta;

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
});
