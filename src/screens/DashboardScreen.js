import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';

const DashboardScreen = ({ navigation }) => {
  const {
    profile,
    examState,
    riskSignals,
    recommendation,
    learningPlan,
    moduleProgress,
    resetAll,
    setExamState,
    setRiskSignals,
    setRecommendation,
    setLearningPlan,
  } = useApp();
  // Build summary strings
  const englishScore = examState.english.score || 0;
  const mathScore = examState.math.score || 0;
  const criticalScore = examState.critical.score || 0;
  const academicScore = recommendation?.academicScore || 0;
  const weakestSubject = recommendation?.weakestSubject;
  const integrityLevel = recommendation?.integrityLevel;
  const trackName = recommendation?.trackName;
  const moduleId = recommendation?.recommendedModuleId;
  const module = modules.find((m) => m.id === moduleId);
  const modProg = moduleProgress[moduleId];

  const handleRetake = () => {
    // reset exam related state
    setExamState({
      english: { answers: {}, completed: false, score: 0, timeTaken: 0 },
      math: { answers: {}, completed: false, score: 0, timeTaken: 0 },
      critical: { answers: {}, completed: false, score: 0, timeTaken: 0 },
    });
    setRiskSignals([]);
    setRecommendation(null);
    setLearningPlan(null);
    navigation.navigate('TestMenu');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {profile && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student</Text>
          <Text>Name: {profile.name}</Text>
          <Text>Grade: {profile.grade}</Text>
          <Text>Goal: {profile.goal}</Text>
          <Text>Language: {profile.preferredLanguage}</Text>
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Assessment</Text>
        <Text>English Score: {englishScore}%</Text>
        <Text>Math Score: {mathScore}%</Text>
        <Text>Critical Thinking Score: {criticalScore}%</Text>
        <Text>Academic Score: {academicScore}%</Text>
        {weakestSubject && <Text>Weakest Subject: {weakestSubject}</Text>}
      </View>
      {integrityLevel && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Integrity</Text>
          <Text>Integrity Level: {integrityLevel}</Text>
          <Text>Risk signals: {riskSignals.join(', ') || 'None'}</Text>
        </View>
      )}
      {trackName && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendation</Text>
          <Text>Pathway: {trackName}</Text>
          <Text>Priority subject: {weakestSubject}</Text>
          {learningPlan && <Text>Plan summary: {learningPlan[0]}</Text>}
        </View>
      )}
      {module && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Module Progress</Text>
          <Text>Module: {module.title}</Text>
          <Text>Video: {modProg?.completed ? 'Completed' : 'Not completed'}</Text>
          <Text>Quiz Score: {modProg?.quizScore != null ? `${modProg.quizScore}%` : 'Not taken'}</Text>
          <Text>Status: {modProg?.completed ? 'Completed' : modProg?.quizScore ? 'Needs Review' : 'Not started'}</Text>
        </View>
      )}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleRetake}>
          <Text style={styles.primaryButtonText}>Retake Assessment</Text>
        </TouchableOpacity>
        {learningPlan && (
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Plan')}>
            <Text style={styles.primaryButtonText}>Open Plan</Text>
          </TouchableOpacity>
        )}
        {module && (
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('ModuleLesson', { moduleId: module.id })}>
            <Text style={styles.primaryButtonText}>Continue Module</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            await resetAll();
            navigation.navigate('Welcome');
          }}
        >
          <Text style={styles.secondaryButtonText}>Reset Demo Data</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonGroup: {
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default DashboardScreen;