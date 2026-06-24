import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';

const ModuleSelectionScreen = ({ navigation }) => {
  const { recommendation } = useApp();
  const moduleId = recommendation?.recommendedModuleId;
  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <View style={styles.container}>
        <Text>No module available for this recommendation.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.detail}>Subject: {module.subject}</Text>
      <Text style={styles.detail}>Level: {module.level}</Text>
      <Text style={styles.detail}>Goal: {module.goal}</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('ModuleLesson', { moduleId: module.id })}
      >
        <Text style={styles.startButtonText}>Start Module</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModuleSelectionScreen;