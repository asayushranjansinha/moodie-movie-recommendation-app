import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import QueryProvider from "@/api/components/QueryProvider";
import { theme } from "@/constants/theme";
// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  useFrameworkReady();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryProvider>
          <InnerLayout />
        </QueryProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function InnerLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="splash" />
        <Stack.Screen name="welcome" options={{ animation: "fade" }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
