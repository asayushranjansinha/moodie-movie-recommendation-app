import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "@/components/common/IconButton";
import { theme } from "@/constants/theme";
import NotificationBottomSheet from "./NotificationBottomSheet";

const NotificationButton: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.notificationCountContainer}>
        <Text>3</Text>
      </View>
      <IconButton icon="notifications-outline" onPress={openBottomSheet} />
      <NotificationBottomSheet ref={bottomSheetRef} />
    </View>
  );
};

export default NotificationButton;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  notificationCountContainer: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    ...theme.shadows.small,
  },
});
