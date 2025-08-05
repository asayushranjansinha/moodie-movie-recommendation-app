import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import IconButton from "@/components/common/IconButton";
import { theme } from "@/constants/theme";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface HeroBannerProps {
  imageUrl: string;
  onBackPress: () => void;
  // onPreviewPress: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl,
  onBackPress,
  // onPreviewPress,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.backgroundImage}
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={[
            "transparent",
            "rgba(15,15,35,0.6)",
            theme.colors.background,
          ]}
          locations={[0, 0.7, 1]}
          style={styles.gradient}
        />

        <SafeAreaView style={styles.safeArea}>
          {/* Top Navigation */}
          <View style={styles.navigationContainer}>
            <IconButton icon="chevron-back" onPress={onBackPress} />
          </View>

          {/* Preview Label */}
          {/* <View style={styles.previewContainer}>
            <TouchableOpacity
              style={styles.previewLabel}
              onPress={onPreviewPress}
            >
              <Ionicons
                name="play-outline"
                size={16}
                color={theme.colors.text}
              />
              <Text style={styles.previewText}>Preview</Text>
            </TouchableOpacity>
          </View> */}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default HeroBanner;
const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.6,
    position: "relative",
  },
  backgroundImage: {
    width: screenWidth,
    height: "100%",
    justifyContent: "space-between",
  },
  safeArea: {
    flex: 1,
  },
  navigationContainer: {
    paddingHorizontal: theme.spacing.lg,
    zIndex: 10,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
  },
  previewContainer: {
    position: "absolute",
    bottom: theme.spacing.xl,
    left: theme.spacing.lg,
    zIndex: 5,
  },
  previewLabel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(26, 26, 46, 0.9)",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  previewText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    fontWeight: "500",
  },
});
