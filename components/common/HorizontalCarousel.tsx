import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Href, Link } from "expo-router";

import { Card } from "@/components/app/Card";
import { theme } from "@/constants/theme";
import { ShowBaseType } from "@/types/app.types";

interface Props {
  items: ShowBaseType[];
  onItemPress: (id: string) => void;
  seeAllHref?: Href;
  title?: string;
}

const HorizontalCarousel: React.FC<Props> = ({
  items,
  onItemPress,
  seeAllHref,
  title = "More Like This",
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: ShowBaseType;
    index: number;
  }) => (
    <View
      style={[
        styles.itemContainer,
        {
          marginLeft: index === 0 ? theme.spacing.lg : 0,
        },
      ]}
    >
      <Card
        title={item.title}
        image={item.image}
        year={item.year}
        onPress={() => onItemPress(item.id)}
      />
    </View>
  );

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeAllHref && (
          <Link href={seeAllHref}>
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
        )}
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
      />
    </View>
  );
};

export default HorizontalCarousel;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
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
  listContainer: {
    paddingVertical: theme.spacing.sm,
  },
  itemContainer: {
    marginRight: theme.spacing.md,
  },
});
