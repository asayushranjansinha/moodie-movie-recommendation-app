import { theme } from "@/constants/theme";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  description: string;
  maxLines?: number;
}

const Description: React.FC<Props> = ({ title, description, maxLines = 3 }) => {
  const [layoutReady, setLayoutReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > maxLines) {
      setShouldShowButton(true);
    }
    setLayoutReady(true);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={styles.description}
        numberOfLines={!isExpanded && layoutReady ? maxLines : undefined}
        onTextLayout={handleTextLayout}
      >
        {description}
      </Text>

      {shouldShowButton && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {isExpanded ? "Show Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Description;

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading3,
    color: theme.colors.text,
    fontFamily: "Inter-SemiBold",
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    fontFamily: "Inter-Regular",
  },
  toggleButton: {
    marginTop: theme.spacing.sm,
    alignSelf: "flex-start",
  },
  toggleText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
