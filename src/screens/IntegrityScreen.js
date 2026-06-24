import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

const IntegrityScreen = ({ navigation }) => {
  const { riskSignals, setRecommendation } = useApp();
  let level = 'Low Risk';
  if (riskSignals.length >= 4) level = 'High Risk';
  else if (riskSignals.length >= 2) level = 'Medium Risk';

  const signalDescriptions = {
    fast: 'Unusually fast answer speed',
    timeout: 'Time expired',
    exit: 'Left test screen',
  };

  // Save integrity level in recommendation state
  useEffect(() => {
    setRecommendation((prev) => ({ ...(prev || {}), integrityLevel: level }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Integrity Score</Text>
      <View style={styles.card}>
        <Text style={styles.score}>{level}</Text>
      </View>
      <Text style={styles.subTitle}>Risk signals detected:</Text>
      {riskSignals.length === 0 && <Text style={{ marginBottom: 8 }}>None</Text>}
      {riskSignals.map((s, index) => (
        <Text key={index} style={{ marginBottom: 4 }}>
          • {signalDescriptions[s] || s}
        </Text>
      ))}
      <Text style={styles.note}>
        The Integrity Score does not automatically punish or exclude the student. It only helps explain how
        reliable the test conditions were.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Recommendation')}
      >
        <Text style={styles.nextButtonText}>Continue to Recommendation</Text>
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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 12,
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

export default IntegrityScreen;