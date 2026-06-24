import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';

const ResultsScreen = ({ navigation }) => {
  const { examState, setRecommendation } = useApp();
  const { t } = useTranslation();

  const englishScore = examState.english.score || 0;
  const mathScore = examState.math.score || 0;
  const criticalScore = examState.critical.score || 0;
  const academicScore = Math.round((englishScore + mathScore + criticalScore) / 3);
  // Determine weakest subject
  const subjectScores = [
    { name: 'english', score: englishScore },
    { name: 'math', score: mathScore },
    { name: 'critical', score: criticalScore },
  ];
  subjectScores.sort((a, b) => a.score - b.score);
  const weakest = subjectScores[0].name;

  // Save academic score and weakest in recommendation context to use later
  useEffect(() => {
    setRecommendation((prev) => ({ ...(prev || {}), academicScore, weakestSubject: weakest }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('resultsTitle')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('englishExam')}</Text>
        <Text style={styles.cardScore}>{englishScore}%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('mathExam')}</Text>
        <Text style={styles.cardScore}>{mathScore}%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('criticalExam')}</Text>
        <Text style={styles.cardScore}>{criticalScore}%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Academic Score</Text>
        <Text style={styles.cardScore}>{academicScore}%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weakest Subject</Text>
        <Text style={styles.cardScore}>{
          weakest === 'english' ? t('englishExam') : weakest === 'math' ? t('mathExam') : t('criticalExam')
        }</Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Integrity')}
      >
        <Text style={styles.nextButtonText}>Continue to Integrity Score</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
  },
  cardScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;