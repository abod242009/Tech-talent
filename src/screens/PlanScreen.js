import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { getModuleForRecommendation } from '../data/modules';

const PlanScreen = ({ navigation }) => {
  const { profile, recommendation, setRecommendation, learningPlan, setLearningPlan } = useApp();
  const academicLevel = recommendation?.level || 'foundation';
  const weakestSubject = recommendation?.weakestSubject || 'english';

  const generatePlan = () => {
    // Simple template: 4-week plan focusing on the weakest subject
    const subjectName = weakestSubject === 'english' ? 'English' : weakestSubject === 'math' ? 'Math' : 'Critical Thinking';
    return [
      `Week 1: Review ${subjectName} fundamentals and practise basics.`,
      `Week 2: Practise problem solving in ${subjectName}.`,
      `Week 3: Work on advanced topics and take practice quizzes.`,
      `Week 4: Take a mini checkpoint quiz and review mistakes.`,
    ];
  };

  const plan = learningPlan || generatePlan();

  // Determine recommended module based on weakest subject, level and goal
  const module = getModuleForRecommendation({ subject: weakestSubject, level: academicLevel, goal: profile.goal });

  useEffect(() => {
    setLearningPlan(plan);
    setRecommendation((prev) => ({ ...prev, recommendedModuleId: module?.id }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2–4 Week Learning Plan</Text>
      {plan.map((line, index) => (
        <Text key={index} style={styles.line}>• {line}</Text>
      ))}
      {module && (
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => navigation.navigate('ModuleSelection')}
        >
          <Text style={styles.openButtonText}>Open Recommended Module</Text>
        </TouchableOpacity>
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
  line: {
    fontSize: 14,
    marginBottom: 6,
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlanScreen;