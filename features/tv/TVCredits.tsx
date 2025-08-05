import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Avatar from "@/components/ui/Avatar";
import { useTvCredits } from "@/api/queries";
import { theme } from "@/constants/theme";
import { TMDBCast } from "@/types/api.types";
import { useRouter } from "expo-router";

interface Props {
  tvId: string;
  onCastMemberPress?: (id: string) => void;
}

const TVCredits: React.FC<Props> = ({ tvId, onCastMemberPress }) => {
  const { data, isLoading } = useTvCredits(tvId);
  const cast = data?.cast ?? [];

  const router = useRouter();

  const renderCastMember = ({
    item,
    index,
  }: {
    item: TMDBCast;
    index: number;
  }) => (
    <Avatar
      style={{
        marginLeft: index === 0 ? theme.spacing.lg : 0,
        marginRight: index === cast.length - 1 ? theme.spacing.lg : 0,
      }}
      imageUrl={
        item.profile_path
          ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
          : ""
      }
      name={item.name}
      subtitle={item.character}
      size={64}
      onPress={() => onCastMemberPress?.(item.id.toString())}
    />
  );

  const onSeeAllPress = useCallback(() => {
    router.push(`/tv/${tvId}/credits`);
  }, [router, tvId]);

  if (isLoading || cast.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Cast</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cast.slice(0, 10)}
        renderItem={renderCastMember}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default TVCredits;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading3,
    color: theme.colors.text,
    fontFamily: "Inter-SemiBold",
  },
  seeAllText: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    fontWeight: "600",
  },
  listContainer: {},
  separator: {
    width: theme.spacing.md,
  },
});
