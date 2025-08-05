import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTvCredits } from "@/api/queries";
import PageHeader from "@/components/app/PageHeader";
import { theme } from "@/constants/theme";
import { TMDBCast } from "@/types/api.types";
import { useLocalSearchParams } from "expo-router";

const TVCreditsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useTvCredits(id);
  const cast = data?.cast ?? [];

  if (!data || isLoading) return null;

  const ListItem = ({ item }: { item: TMDBCast }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.character}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <PageHeader title="TV Show Cast" />

      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={ListItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TVCreditsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing.lg,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  image: {
    backgroundColor: theme.colors.surface,
    height: 64,
    width: 64,
    borderRadius: 99999,
  },
  name: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "left",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },
});
