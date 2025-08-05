import React, { forwardRef } from "react";
import { Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheet } from "@/components/common/BottomSheet";

type Props = {
  onClose?: () => void;
};

const NotificationBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onClose }, ref) => {
    return (
      <BottomSheet ref={ref} title="Notifications" onClose={onClose}>
        <Text style={{ color: "#fff" }}>🔔 You have new messages!</Text>
        <Text style={{ color: "#fff" }}>
          📩 Don’t forget to check your inbox.
        </Text>
      </BottomSheet>
    );
  }
);
NotificationBottomSheet.displayName = "NotificationBottomSheet";

export default NotificationBottomSheet;
