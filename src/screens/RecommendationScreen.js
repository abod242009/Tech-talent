import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

const RecommendationScreen = ({ navigation }) => {
  const { profile, recommendation, setRecommendation } = useApp();
  const academicScore = recommendation?.academicScore || 0;
  const integrityLevel = recommendation?.integrityLevel || 'Low Risk';
  const weakestSubject = recommendation?.weakestSubject || 'english';

  const computeTrack = () => {
    let level;
    if (academicScore < 50) level = 'foundation';
    else if (academicScore < 75) level = 'support';
    else if (academicScore < 90) level = 'ready';
    else level = 'advanced';
    // apply high-score risk rule
    if (level === 'advanced') {
      if (integrityLevel === 'Medium Risk') level = 'ready';
      if (integrityLevel === 'High Risk') level = 'needsConfirmation';
    }
    return level;
  };
  const level = computeTrack();
  let trackName = '';
  if (profile.goal === 'tawjihi') {
    switch (level) {
      case 'foundation':
        trackName = 'Foundation Palestinian Curriculum Track';
        break;
      case 'support':
        trackName = 'Support Palestinian Curriculum Track';
        break;
      case 'ready':
        trackName = 'Ready Palestinian Curriculum Track';
        break;
      case 'advanced':
        trackName = 'Advanced Palestinian Curriculum Track';
        break;
      case 'needsConfirmation':
        trackName = 'Result Needs Confirmation — Retake Suggested';
        break;
      default:
        trackName = '';
    }
  } else if (profile.goal === 'international') {
    switch (level) {
      case 'foundation':
        trackName = 'Foundation International Track';
        break;
      case 'support':
        trackName = 'Support International Track';
        break;
      case 'ready':
        trackName = 'Ready Pre‑International Track';
        break;
      case 'advanced':
        trackName = 'Advanced Pre‑International Track';
        break;
      case 'needsConfirmation':
        trackName = 'Result Needs Confirmation — Retake Suggested';
        break;
      default:
        trackName = '';
    }
  } else {
    // Not sure yet
    switch (level) {
      case 'foundation':
        trackName = 'Explore Both Paths — Foundation';
        break;
      case 'support':
        trackName = 'Explore Both Paths — Support';
        break;
      case 'ready':
        trackName = 'Explore Both Paths — Ready';
        break;
      case 'advanced':
        trackName = 'Explore Both Paths — Advanced';
        break;
      case 'needsConfirmation':
        trackName = 'Result Needs Confirmation — Retake Suggested';
        break;
      default:
        trackName = '';
    }
  }

  useEffect(() => {
    setRecommendation((prev) => ({ ...prev, trackName, level }));
  }, [trackName, level]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Pathway</Text>
      <View style={styles.card}>
        <Text style={styles.trackName}>{trackName}</Text>
        <Text style={styles.details}>Academic Score: {academicScore}%</Text>
        <Text style={styles.details}>Weakest Subject: {weakestSubject}</Text>
        <Text style={styles.details}>Integrity: {integrityLevel}</Text>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Plan')}
      >
        <Text style={styles.nextButtonText}>Continue to Learning Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    marginBottom: 4,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecommendationScreen;