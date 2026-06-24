import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';

const WelcomeScreen = ({ navigation }) => {
  const { language, setLanguage, profile, resetAll } = useApp();
  const { t } = useTranslation();

  const handleStart = () => {
    if (profile) {
      Alert.alert(
        'Continue?',
        'A saved profile exists. Would you like to continue with it?',
        [
          {
            text: 'New Profile',
            onPress: async () => {
              await resetAll();
              navigation.navigate('Profile');
            },
          },
          { text: 'Continue', onPress: () => navigation.navigate('TestMenu') },
        ],
      );
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>{t('appName')}</Text>
      <Text style={styles.subtitle}>{t('subtitle')}</Text>
      <Text style={styles.description}>{t('description')}</Text>
      <View style={styles.languageRow}>
        <TouchableOpacity
          style={[styles.langButton, language === 'en' && styles.langSelected]}
          onPress={() => setLanguage('en')}
        >
          <Text style={styles.langButtonText}>{t('english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, language === 'ar' && styles.langSelected]}
          onPress={() => setLanguage('ar')}
        >
          <Text style={styles.langButtonText}>{t('arabic')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
        <Text style={styles.primaryButtonText}>{t('startCheck')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('DemoProfiles')}>
        <Text style={styles.secondaryButtonText}>{t('viewDemos')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  languageRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
    borderRadius: 6,
  },
  langSelected: {
    backgroundColor: '#007AFF33',
    borderColor: '#007AFF',
  },
  langButtonText: {
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default WelcomeScreen;