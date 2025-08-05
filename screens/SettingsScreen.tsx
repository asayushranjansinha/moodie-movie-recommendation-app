import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/app/PageHeader';
import { theme } from '@/constants/theme';

const SettingsScreen = () => {
  const [videoQuality, setVideoQuality] = useState('Maximum');
  const [language, setLanguage] = useState('English');
  const [themeMode, setThemeMode] = useState('Dark');

  const VideoQualitySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Video Quality</Text>
      <View style={styles.optionsContainer}>
        {['Minimal', 'Optimal', 'Maximum'].map((quality) => (
          <TouchableOpacity
            key={quality}
            style={[
              styles.optionButton,
              videoQuality === quality && styles.selectedOption,
            ]}
            onPress={() => setVideoQuality(quality)}
          >
            <Text
              style={[
                styles.optionText,
                videoQuality === quality && styles.selectedOptionText,
              ]}
            >
              {quality}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const LanguageSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Primary Movie Language</Text>
      <View style={styles.optionsContainer}>
        {['Russian', 'English'].map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.optionButton,
              language === lang && styles.selectedOption,
            ]}
            onPress={() => setLanguage(lang)}
          >
            <Text
              style={[
                styles.optionText,
                language === lang && styles.selectedOptionText,
              ]}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const ThemeSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>App Theme</Text>
      <View style={styles.optionsContainer}>
        {['System', 'Dark', 'Light'].map((theme) => (
          <TouchableOpacity
            key={theme}
            style={[
              styles.optionButton,
              themeMode === theme && styles.selectedOption,
            ]}
            onPress={() => setThemeMode(theme)}
          >
            <Text
              style={[
                styles.optionText,
                themeMode === theme && styles.selectedOptionText,
              ]}
            >
              {theme}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const PaymentSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentCard}>
          <View style={styles.cardIcon} />
          <Text style={styles.paymentText}>Mir 4321</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.paymentCard, styles.selectedPaymentCard]}>
          <View style={styles.cardIcon} />
          <Text style={styles.paymentText}>Mir 8970</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addCardButton}>
          <View style={styles.cardIcon} />
          <Text style={styles.paymentText}>Link Card</Text>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <PageHeader title="Settings" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <VideoQualitySection />
        <LanguageSection />
        <ThemeSection />
        <PaymentSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  optionButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: theme.colors.text,
  },
  paymentContainer: {
    gap: theme.spacing.sm,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedPaymentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardIcon: {
    width: 24,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: theme.spacing.sm,
  },
  paymentText: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
    flex: 1,
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    fontWeight: '300',
  },
});

export default SettingsScreen;