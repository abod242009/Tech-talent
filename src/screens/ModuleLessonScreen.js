import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';

const ModuleLessonScreen = ({ route, navigation }) => {
  const { moduleId } = route.params;
  const { moduleProgress, setModuleProgress } = useApp();
  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <View style={styles.container}>
        <Text>Module not found.</Text>
      </View>
    );
  }

  const handleMarkCompleted = () => {
    setModuleProgress({ ...moduleProgress, [moduleId]: { completed: true, quizScore: null } });
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{module.title}</Text>
      <Video
        source={module.video}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls
        style={{ width: '100%', height: 200, backgroundColor: '#000' }}
      />
      <Text style={styles.subTitle}>Lesson Notes</Text>
      {module.notes.map((note, index) => (
        <View key={index} style={styles.noteCard}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteText}>{note.explanation}</Text>
          <Text style={styles.noteText}>Example: {note.example}</Text>
          <Text style={styles.noteText}>Common mistake: {note.mistake}</Text>
          <Text style={styles.noteText}>Practice tip: {note.tip}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LessonQuiz', { moduleId: module.id })}
      >
        <Text style={styles.buttonText}>Start Lesson Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleMarkCompleted}>
        <Text style={styles.secondaryButtonText}>Mark as Completed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noteCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default ModuleLessonScreen;