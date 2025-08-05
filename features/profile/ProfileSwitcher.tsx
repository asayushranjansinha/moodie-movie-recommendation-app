import React, { forwardRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { theme } from "@/constants/theme";
import { BottomSheet } from "@/components/common/BottomSheet";

const profiles = [
  {
    id: "1",
    name: "Ekaterina Fedotova",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987",
    type: "Adult",
  },
  {
    id: "2",
    name: "Sasha",
    avatar: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
    type: "Kids",
  },
];

type Props = {
  onClose?: () => void;
};

const ProfileSwitcher = forwardRef<BottomSheetModal, Props>(({ onClose }, ref) => {
  return (
    <BottomSheet ref={ref} title="Switch Profile" onClose={onClose}>
      <View style={styles.content}>
        {profiles.map((profile) => (
          <TouchableOpacity key={profile.id} style={styles.profileRow}>
            <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileType}>{profile.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addChild}>
          <Text style={styles.addChildText}>Add Child</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
});


ProfileSwitcher.displayName = "ProfileSwitcher";
export default ProfileSwitcher;

const styles = StyleSheet.create({
  content: {
    paddingBottom: theme.spacing.xxl,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
  },
  profileName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontFamily: "Inter-SemiBold",
  },
  profileType: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    fontFamily: "Inter-Regular",
  },
  addChild: {
    marginTop: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
  },
  addChildText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontFamily: "Inter-SemiBold",
  },
});
