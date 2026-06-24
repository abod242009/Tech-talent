import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { modules } from '../data/modules';
import QuestionCard from '../components/QuestionCard';

const LessonQuizScreen = ({ route, navigation }) => {
  const { moduleId } = route.params;
  const { moduleProgress, setModuleProgress } = useApp();
  const module = modules.find((m) => m.id === moduleId);
  const questions = module.quizQuestions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected[currentIndex] === undefined) {
      Alert.alert('Please select an answer before continuing.');
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleSelect = (optionIndex) => {
    setSelected({ ...selected, [currentIndex]: optionIndex });
  };
  const handleSubmit = () => {
    if (Object.keys(selected).length < questions.length) {
      Alert.alert('Please answer all questions.');
      return;
    }
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selected[idx] === q.correctAnswer) correct++;
    });
    const result = Math.round((correct / questions.length) * 100);
    setScore(result);
    setShowResult(true);
    setModuleProgress({ ...moduleProgress, [moduleId]: { completed: result >= 70, quizScore: result } });
  };
  if (!module) return (<View style={styles.container}><Text>Module not found.</Text></View>);
  return (
    <View style={styles.container}>
      {!showResult ? (
        <>
          <Text style={styles.title}>{module.title} Quiz</Text>
          <Text style={styles.progress}>{`Question ${currentIndex + 1} of ${questions.length}`}</Text>
          <QuestionCard
            question={questions[currentIndex].question}
            options={questions[currentIndex].options}
            selectedOption={selected[currentIndex]}
            onSelect={handleSelect}
          />
          <View style={styles.navButtons}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]}
              disabled={currentIndex === 0}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity onPress={handleNext} style={styles.navButton}>
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.title}>Lesson Quiz Result</Text>
          <Text style={styles.score}>{score}%</Text>
          <Text style={styles.status}>{score >= 70 ? 'Status: Completed' : 'Status: Needs Review'}</Text>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.navButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 12,
  },
  progress: {
    fontSize: 14,
    marginBottom: 8,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default LessonQuizScreen;