import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Global context for BridgeLearn
 * This context stores the student profile, exam answers and results,
 * integrity signals, recommendations and module progress. It also
 * handles persistence to local storage so the app works offline.
 */
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language selection ("en" or "ar")
  const [language, setLanguage] = useState('en');
  // Student profile: name, age, grade, preferredLanguage, goal, situation
  const [profile, setProfile] = useState(null);
  // Exam status and answers
  const [examState, setExamState] = useState({
    english: { answers: {}, completed: false, score: 0, timeTaken: 0 },
    math: { answers: {}, completed: false, score: 0, timeTaken: 0 },
    critical: { answers: {}, completed: false, score: 0, timeTaken: 0 },
  });
  // Risk signals for integrity score
  const [riskSignals, setRiskSignals] = useState([]);
  // Recommendation and plan
  const [recommendation, setRecommendation] = useState(null);
  const [learningPlan, setLearningPlan] = useState(null);
  // Module progress: keyed by moduleId
  const [moduleProgress, setModuleProgress] = useState({});

  /**
   * Load saved state from AsyncStorage on app start
   */
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('@bridgelearn_state');
        if (data) {
          const parsed = JSON.parse(data);
          setLanguage(parsed.language || 'en');
          setProfile(parsed.profile || null);
          setExamState(parsed.examState || examState);
          setRiskSignals(parsed.riskSignals || []);
          setRecommendation(parsed.recommendation || null);
          setLearningPlan(parsed.learningPlan || null);
          setModuleProgress(parsed.moduleProgress || {});
        }
      } catch (err) {
        console.warn('Failed to load saved state', err);
      }
    })();
  }, []);

  /**
   * Persist state to AsyncStorage whenever it changes.
   */
  useEffect(() => {
    (async () => {
      try {
        const toSave = {
          language,
          profile,
          examState,
          riskSignals,
          recommendation,
          learningPlan,
          moduleProgress,
        };
        await AsyncStorage.setItem('@bridgelearn_state', JSON.stringify(toSave));
      } catch (err) {
        console.warn('Failed to save state', err);
      }
    })();
  }, [language, profile, examState, riskSignals, recommendation, learningPlan, moduleProgress]);

  /**
   * Reset all saved data (used for new profile or demo reset)
   */
  const resetAll = async () => {
    setProfile(null);
    setExamState({
      english: { answers: {}, completed: false, score: 0, timeTaken: 0 },
      math: { answers: {}, completed: false, score: 0, timeTaken: 0 },
      critical: { answers: {}, completed: false, score: 0, timeTaken: 0 },
    });
    setRiskSignals([]);
    setRecommendation(null);
    setLearningPlan(null);
    setModuleProgress({});
    await AsyncStorage.removeItem('@bridgelearn_state');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        profile,
        setProfile,
        examState,
        setExamState,
        riskSignals,
        setRiskSignals,
        recommendation,
        setRecommendation,
        learningPlan,
        setLearningPlan,
        moduleProgress,
        setModuleProgress,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);