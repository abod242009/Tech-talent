import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';
import { getQuestionsBySubject } from '../data/questions';
import QuestionCard from '../components/QuestionCard';

/**
 * QuizScreen renders the readiness exam for a given subject. It handles
 * timer countdown, answer navigation and submission. When time runs out
 * or the student submits, it computes the score and updates global state.
 */
const QuizScreen = ({ route, navigation }) => {
  const { subject, timer } = route.params;
  const { examState, setExamState, riskSignals, setRiskSignals } = useApp();
  const { t } = useTranslation();
  const questions = getQuestionsBySubject(subject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [timeLeft, setTimeLeft] = useState(timer * 60); // seconds
  const [startTime] = useState(Date.now());

  // Start timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mark exam as started when component mounts
  useEffect(() => {
    setExamState((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], started: true },
    }));
  }, []);

  // When timer reaches zero, auto submit
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(true);
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (selected[currentIndex] === undefined) {
      Alert.alert('', t('warningSelectAnswer'));
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelect = (optionIndex) => {
    setSelected({ ...selected, [currentIndex]: optionIndex });
  };

  const handleSubmit = (timeExpired = false) => {
    // ensure all answered
    if (!timeExpired && Object.keys(selected).length < questions.length) {
      Alert.alert('', t('warningSelectAnswer'));
      return;
    }
    // calculate score
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selected[index] === q.correctAnswer) correctCount++;
    });
    const score = Math.round((correctCount / questions.length) * 100);
    const timeTakenSec = Math.floor((Date.now() - startTime) / 1000);
    // detect fast answer risk (<30 seconds for 5 questions)
    if (timeTakenSec < 30 && questions.length >= 5) {
      setRiskSignals((prev) => [...prev, 'fast']);
    }
    if (timeExpired) {
      setRiskSignals((prev) => [...prev, 'timeout']);
    }
    // update exam state
    setExamState((prev) => ({
      ...prev,
      [subject]: {
        answers: selected,
        completed: true,
        score,
        timeTaken: timeTakenSec,
      },
    }));
    navigation.goBack();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const subjectTitle = {
    english: t('englishExam'),
    math: t('mathExam'),
    critical: t('criticalExam'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.subjectName}>{subjectTitle[subject]}</Text>
        <Text style={styles.timer}>{`${t('timeLeft')}: ${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}</Text>
        <Text style={styles.progress}>{`Question ${currentIndex + 1} of ${questions.length}`}</Text>
      </View>
      <QuestionCard
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        selectedOption={selected[currentIndex]}
        onSelect={handleSelect}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handlePrevious} style={[styles.navButton, currentIndex === 0 && { opacity: 0.5 }]} disabled={currentIndex === 0}>
          <Text style={styles.navButtonText}>{t('previous')}</Text>
        </TouchableOpacity>
        {currentIndex < questions.length - 1 ? (
          <TouchableOpacity onPress={handleNext} style={styles.navButton}>
            <Text style={styles.navButtonText}>{t('next')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleSubmit(false)} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>{t('submit')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    marginBottom: 16,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timer: {
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 4,
  },
  progress: {
    fontSize: 14,
    color: '#666',
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
});

export default QuizScreen;