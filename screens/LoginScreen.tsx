import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/app/Button";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialTab = params.type === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (params.type === "signup" || params.type === "login") {
      setActiveTab(params.type);
    }
  }, [params.type]);

  const handlePrimaryAction = () => {
    console.log(`${activeTab === "login" ? "Logging in" : "Signing up"}...`);
  };

  const handlePhoneLogin = () => {
    console.log("Login with phone");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.headerRow}>
          <View />
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {activeTab === "login" ? "Login" : "Register"}
        </Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "signup" && styles.activeTab]}
            onPress={() => setActiveTab("signup")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "signup" && styles.activeTabText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "login" && styles.activeTab]}
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "login" && styles.activeTabText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter e-mail"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={theme.colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {activeTab === "login" && (
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPassword}
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <Button style={styles.primaryBtn} onPress={handlePrimaryAction}>
            <Text style={styles.primaryText}>
              {activeTab === "login" ? "Log In" : "Register"}
            </Text>
          </Button>

          <Button
            variant="outline"
            style={styles.secondaryBtn}
            onPress={handlePhoneLogin}
          >
            <Text style={styles.secondaryText}>Log in with phone number</Text>
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our{" "}
            <Text style={styles.underline}>Privacy Policy</Text>.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  skip: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.fontSize,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: theme.colors.background,
  },
  tabText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  form: {
    gap: theme.spacing.md,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 0,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  linkText: {
    color: theme.colors.text,
    fontSize: theme.typography.small.fontSize,
    textDecorationLine: "underline",
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
    width: "100%",
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.md,
  },
  secondaryText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
    textAlign: "center",
    lineHeight: 16,
  },
  underline: {
    textDecorationLine: "underline",
    color: theme.colors.text,
  },
});
