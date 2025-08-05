import { theme } from "@/constants/theme";
import React from "react";
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

export interface Props {
  imageUrl: string;
  name: string;
  subtitle?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Avatar: React.FC<Props> = ({
  imageUrl,
  name,
  subtitle,
  size = 64,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 80,
  },
  image: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  name: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});
export default Avatar;