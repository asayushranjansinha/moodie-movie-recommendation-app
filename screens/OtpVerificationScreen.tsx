import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Button } from '@/components/app/Button';

const OtpVerificationScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const updated = [...code];
    updated[index] = text.slice(-1);
    setCode(updated);
  };

  const onConfirm = ()=>{
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Code Verification</Text>
      <Text style={styles.description}>
        We’ve sent a code to your email kate.fedotova@gmail.com
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, i) => (
          <TextInput
            key={i}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <Text style={styles.timerText}>
        Resend code in 00:{timer.toString().padStart(2, "0")}
      </Text>

      <Button style={styles.primaryBtn} onPress={onConfirm}>
        <Text style={styles.primaryText}>Enter Code</Text>
      </Button>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  backArrow: {
    fontSize: 26,
    color: theme.colors.text,
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  codeInput: {
    width: 48,
    height: 56,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    textAlign: "center",
    fontSize: theme.typography.heading2.fontSize,
    color: theme.colors.text,
  },
  timerText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
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
});
