import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAiringToday } from "@/api/queries";
import NotificationButton from "@/features/notifications/NotificationButton";
import { theme } from "@/constants/theme";
import { useCallback } from "react";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

type Props = {
  onNotificationsPress: () => void;
};

const FeaturedMovie: React.FC<Props> = ({ onNotificationsPress }) => {
  const router = useRouter();
  const { data: show, isLoading } = useAiringToday();

  const onDetailsPress = useCallback(() => {
    router.push(`/tv/${show.id}/details`);
  }, [router, show]);

  if (isLoading || !show) {
    return (
      <View style={[styles.featuredSection, styles.centered]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  const imageUrl1 = `https://image.tmdb.org/t/p/original${
    show.backdrop_path || show.poster_path
  }`;
  const title = show.name || show.original_name;
  const subtitle = show.original_language?.toUpperCase();

  
  return (
    <View style={styles.featuredSection}>
      <ImageBackground
        source={{
          uri: imageUrl1,
        }}
        style={styles.featuredImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "transparent",
            "transparent",
            "rgba(15,15,35,0.8)",
            "rgba(15,15,35,1)",
          ]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <NotificationButton />
            </View>

            {/* Featured Movie Content */}
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{title}</Text>
              <Text style={styles.featuredSubtitle}>{subtitle}</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playButtonText}>Airing Today</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={onDetailsPress}
                >
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
export default FeaturedMovie;
const styles = StyleSheet.create({
  featuredSection: {
    height: height * 0.75,
  },
  featuredImage: {
    flex: 1,
    width: "100%",
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: theme.spacing.lg,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  featuredContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl * 1.5,
  },
  featuredTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: theme.colors.text,
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  featuredSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.md,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    gap: theme.spacing.sm,
    ...theme.shadows.small,
  },
  playButtonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.background,
    fontWeight: "600",
  },
  detailsButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  detailsButtonText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    fontWeight: "600",
  },
});
