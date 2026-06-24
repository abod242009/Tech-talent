import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';
import ExamCard from '../components/ExamCard';
import { getQuestionsBySubject } from '../data/questions';

const TestMenuScreen = ({ navigation }) => {
  const { examState } = useApp();
  const { t } = useTranslation();
  const englishQuestions = getQuestionsBySubject('english');
  const mathQuestions = getQuestionsBySubject('math');
  const criticalQuestions = getQuestionsBySubject('critical');

  const allCompleted =
    examState.english.completed && examState.math.completed && examState.critical.completed;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('examsTitle')}</Text>
      <Text style={styles.subtitle}>{t('examsSubtitle')}</Text>
      <ExamCard
        title={t('englishExam')}
        questions={englishQuestions.length}
        minutes={5}
        status={examState.english.completed ? 'completed' : examState.english.started ? 'inProgress' : 'notStarted'}
        onPress={() => navigation.navigate('Quiz', { subject: 'english', timer: 5 })}
      />
      <ExamCard
        title={t('mathExam')}
        questions={mathQuestions.length}
        minutes={7}
        status={examState.math.completed ? 'completed' : examState.math.started ? 'inProgress' : 'notStarted'}
        onPress={() => navigation.navigate('Quiz', { subject: 'math', timer: 7 })}
      />
      <ExamCard
        title={t('criticalExam')}
        questions={criticalQuestions.length}
        minutes={6}
        status={examState.critical.completed ? 'completed' : examState.critical.started ? 'inProgress' : 'notStarted'}
        onPress={() => navigation.navigate('Quiz', { subject: 'critical', timer: 6 })}
      />
      <TouchableOpacity
        style={[styles.resultsButton, !allCompleted && { backgroundColor: '#ccc' }]}
        disabled={!allCompleted}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.resultsButtonText}>{t('viewResults')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  resultsButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  resultsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestMenuScreen;