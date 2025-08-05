import { Button } from "@/components/app/Button";
import IconButton from "@/components/common/IconButton";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");


  const onSendCode = ()=>{
    router.replace("/auth/otp-verify");
  }
  return (
    <SafeAreaView style={styles.root}>
      <IconButton
        icon="chevron-back"
        onPress={() => router.back()}
        style={styles.back}
      />

      <Text style={styles.title}>Password Recovery</Text>

      <Text style={styles.description}>
        Enter the email or phone you used during registration, and we’ll send
        you a link to reset your password.
      </Text>

      <TextInput
        placeholder="email@example.com"
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button style={styles.primaryBtn} onPress={onSendCode}>
        <Text style={styles.primaryText}>Send Verification Code</Text>
      </Button>

      <Text style={styles.footer}>
        By continuing, you agree to our{" "}
        <Text style={styles.underline}>Privacy Policy</Text>.
      </Text>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  back: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
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
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: theme.colors.textSecondary,
    fontSize: theme.typography.small.fontSize,
    lineHeight: 18,
  },
  underline: {
    textDecorationLine: "underline",
    color: theme.colors.text,
  },
});
