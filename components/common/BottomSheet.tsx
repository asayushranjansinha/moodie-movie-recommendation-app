import React, { forwardRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
}

export const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onClose, title, children }, ref) => {
    const snapPoints = useMemo(() => ["75%", "90%"], []);
    const insets = useSafeAreaInsets();

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                if (onClose) {
                  onClose();
                } else {
                  (
                    ref as React.RefObject<BottomSheetModal>
                  )?.current?.dismiss();
                }
              }}
              style={styles.closeButton}
            >
              <Ionicons
                name="close-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={{
              paddingBottom: insets.bottom + theme.spacing.lg,
            }}
          >
            {children}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  bottomSheetBackground: {
    backgroundColor: theme.colors.card,
  },
  handleIndicator: {
    backgroundColor: theme.colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
    fontFamily: "Inter-Bold",
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
});

BottomSheet.displayName = "BottomSheet";
