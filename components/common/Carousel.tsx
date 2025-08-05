import React from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

import { theme } from "@/constants/theme";
import { Banner } from "./Banner";

export interface CarouselItem {
  id: string;
  title: string;
  image: string;
  year: string;
  genre: string;
  rating: number;
}

interface CarouselProps {
  data: CarouselItem[];
  onItemPress: (item: CarouselItem) => void;
  showsPagination?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  loop?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  data,
  onItemPress,
  showsPagination = true,
  autoplay = true,
  autoplayTimeout = 3,
  loop = true,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        showsPagination={showsPagination}
        autoplay={autoplay}
        autoplayTimeout={autoplayTimeout}
        loop={loop}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Banner
              image={item.image}
              title={item.title}
              onPress={() => onItemPress(item)}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 260,
    marginBottom: theme.spacing.lg,
  },
  swiper: {
    height: 260,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
  },
  pagination: {
    bottom: theme.spacing.sm,
  },
  dot: {
    backgroundColor: theme.colors.textSecondary,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.secondary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
