import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../i18n/translations';

const ExamCard = ({ title, questions, minutes, status, onPress }) => {
  const { t } = useTranslation();
  let statusLabel = '';
  switch (status) {
    case 'completed':
      statusLabel = t('completed');
      break;
    case 'inProgress':
      statusLabel = t('inProgress');
      break;
    default:
      statusLabel = t('notStarted');
      break;
  }
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{questions} {t('questions')} • {minutes} {t('minutes')}</Text>
      <Text style={styles.status}>{statusLabel}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{status === 'completed' ? t('viewResults') : status === 'notStarted' ? t('startExam') : t('continueExam')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExamCard;