import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/app/Button";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.replace({
      pathname: "/auth/login",
      params: { type: "login" },
    });
  };

  const handleSignUp = () => {
    router.replace({
      pathname: "/auth/login",
      params: { type: "signup" },
    });
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={{
          uri: "https://image.tmdb.org/t/p/original//aTvePCU7exLepwg5hWySjwxojQK.jpg",
        }}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "rgba(15,15,35,0.6)", "rgba(15,15,35,1)"]}
          style={styles.overlay}
        >
          <SafeAreaView style={styles.content}>
            <Text style={styles.title}>Moodie</Text>
            <Text style={styles.subtitle}>
              Get ready to dive into the greatest{"\n"}stories in TV and Film
            </Text>

            <Button style={styles.primaryBtn} onPress={handleSignIn}>
              <Text style={styles.primaryText}>Sign In</Text>
            </Button>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.legal}>
              By creating an account or signing in, you agree to our{" "}
              <Text style={styles.underline}>Terms of Service</Text> and{" "}
              <Text style={styles.underline}>Privacy Policy</Text>.
            </Text>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  background: {
    flex: 1,
    width: "100%",
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: theme.spacing.xxl,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: "center",
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  primaryBtn: {
    width: "100%",
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.md,
  },
  primaryText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryBtn: {
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
    width: "100%",
  },
  secondaryText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  legal: {
    textAlign: "center",
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginHorizontal: "auto",
    width: "80%",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
