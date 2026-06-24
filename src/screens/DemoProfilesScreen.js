import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { getModuleForRecommendation } from '../data/modules';

// Demo profile definitions as per prototype plan
const demoProfiles = [
  {
    id: 'foundation',
    profile: {
      name: 'Foundation Student',
      age: 14,
      grade: 'Grade 8',
      preferredLanguage: 'en',
      goal: 'tawjihi',
    },
    examScores: { english: 35, math: 45, critical: 50 },
    integrityLevel: 'Low Risk',
  },
  {
    id: 'support',
    profile: {
      name: 'Support Student',
      age: 15,
      grade: 'Grade 9',
      preferredLanguage: 'en',
      goal: 'tawjihi',
    },
    examScores: { english: 65, math: 55, critical: 70 },
    integrityLevel: 'Low Risk',
  },
  {
    id: 'advanced',
    profile: {
      name: 'Advanced Student',
      age: 16,
      grade: 'Grade 10',
      preferredLanguage: 'en',
      goal: 'tawjihi',
    },
    examScores: { english: 95, math: 100, critical: 95 },
    integrityLevel: 'Low Risk',
  },
];

const DemoProfilesScreen = ({ navigation }) => {
  const {
    setProfile,
    setExamState,
    setRiskSignals,
    setRecommendation,
    setLearningPlan,
    setModuleProgress,
  } = useApp();

  const loadDemo = (demo) => {
    // Set profile
    setProfile(demo.profile);
    // Set exam state
    setExamState({
      english: { answers: {}, completed: true, score: demo.examScores.english, timeTaken: 0 },
      math: { answers: {}, completed: true, score: demo.examScores.math, timeTaken: 0 },
      critical: { answers: {}, completed: true, score: demo.examScores.critical, timeTaken: 0 },
    });
    // Determine weakest subject
    const subjects = [
      { name: 'english', score: demo.examScores.english },
      { name: 'math', score: demo.examScores.math },
      { name: 'critical', score: demo.examScores.critical },
    ];
    subjects.sort((a, b) => a.score - b.score);
    const weakest = subjects[0].name;
    // Compute academic score
    const academicScore = Math.round(
      (demo.examScores.english + demo.examScores.math + demo.examScores.critical) / 3,
    );
    // Determine level
    let level;
    if (academicScore < 50) level = 'foundation';
    else if (academicScore < 75) level = 'support';
    else if (academicScore < 90) level = 'ready';
    else level = 'advanced';
    // Determine track name
    let trackName;
    if (demo.profile.goal === 'tawjihi') {
      if (level === 'foundation') trackName = 'Foundation Palestinian Curriculum Track';
      else if (level === 'support') trackName = 'Support Palestinian Curriculum Track';
      else if (level === 'ready') trackName = 'Ready Palestinian Curriculum Track';
      else trackName = 'Advanced Palestinian Curriculum Track';
    }
    // Determine recommended module
    const recommendedModule = getModuleForRecommendation({ subject: weakest, level, goal: demo.profile.goal });
    // Set recommendation
    setRecommendation({
      academicScore,
      weakestSubject: weakest,
      integrityLevel: demo.integrityLevel,
      level,
      trackName,
      recommendedModuleId: recommendedModule?.id,
    });
    // Generate plan
    const plan = [
      `Week 1: Review ${weakest === 'english' ? 'English' : weakest === 'math' ? 'Math' : 'Critical Thinking'} foundations.`,
      'Week 2: Practise skills.',
      'Week 3: Take practice problems.',
      'Week 4: Review and take quiz.',
    ];
    setLearningPlan(plan);
    // Reset module progress
    setModuleProgress({});
    // Clear risk signals
    setRiskSignals([]);
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Demo Profiles</Text>
      {demoProfiles.map((demo) => (
        <TouchableOpacity
          key={demo.id}
          style={styles.card}
          onPress={() => loadDemo(demo)}
        >
          <Text style={styles.cardTitle}>{demo.profile.name}</Text>
          <Text>English: {demo.examScores.english}%</Text>
          <Text>Math: {demo.examScores.math}%</Text>
          <Text>Critical: {demo.examScores.critical}%</Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default DemoProfilesScreen;