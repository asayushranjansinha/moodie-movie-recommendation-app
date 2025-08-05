import { useRouter } from "expo-router";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import IconButton from "@/components/common/IconButton";
import { theme } from "@/constants/theme";

type Props = {
  onBackPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
};

const PageHeader = ({ onBackPress, title, style }: Props) => {
  const router = useRouter();
  const onBackPressHandler = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, style]}>
      <View style={styles.side}>
        <IconButton icon="chevron-back" onPress={onBackPressHandler} />
      </View>

      <View style={styles.center}>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>
      </View>

      <View style={styles.side} />
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  side: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    ...theme.typography.heading2,
    color: theme.colors.text,
  },
});
