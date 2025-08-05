import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSwitcher from "../features/profile/ProfileSwitcher";
import IconButton from "@/components/common/IconButton";

const ProfileScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSwitcher = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSwitcher = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton icon="people" onPress={openSwitcher} />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="create-outline" size={22} color={theme.colors.text} />
          <Ionicons
            name="settings-outline"
            size={22}
            color={theme.colors.text}
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ekaterina Fedotova</Text>
        <Text style={styles.email}>kate.fedotova@gmail.com</Text>
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.infoText}>27.04.2002</Text>
          <Ionicons
            name="female"
            size={14}
            color={theme.colors.textSecondary}
            style={{ marginLeft: 12 }}
          />
          <Text style={styles.infoText}>Female</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.options}>
        {["Settings", "Subscription", "Support"].map((item) => (
          <TouchableOpacity key={item} style={styles.optionRow}>
            <Text style={styles.optionText}>{item}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Sheet */}
      <ProfileSwitcher ref={bottomSheetRef} onClose={closeSwitcher} />
      {/* <NotificationBottomSheet ref={bottomSheetRef} /> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    ...theme.typography.heading2,
    color: theme.colors.text,
  },
  headerIcons: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: theme.spacing.sm,
  },
  name: {
    ...theme.typography.heading3,
    color: theme.colors.text,
  },
  email: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
  options: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  optionRow: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  content: {
    padding: theme.spacing.lg,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  profileName: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  profileType: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  addChild: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  addChildText: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
});
