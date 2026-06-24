import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider } from './src/context/AppContext';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TestMenuScreen from './src/screens/TestMenuScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import IntegrityScreen from './src/screens/IntegrityScreen';
import RecommendationScreen from './src/screens/RecommendationScreen';
import PlanScreen from './src/screens/PlanScreen';
import ModuleSelectionScreen from './src/screens/ModuleSelectionScreen';
import ModuleLessonScreen from './src/screens/ModuleLessonScreen';
import LessonQuizScreen from './src/screens/LessonQuizScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DemoProfilesScreen from './src/screens/DemoProfilesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="TestMenu" component={TestMenuScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Integrity" component={IntegrityScreen} />
          <Stack.Screen name="Recommendation" component={RecommendationScreen} />
          <Stack.Screen name="Plan" component={PlanScreen} />
          <Stack.Screen name="ModuleSelection" component={ModuleSelectionScreen} />
          <Stack.Screen name="ModuleLesson" component={ModuleLessonScreen} />
          <Stack.Screen name="LessonQuiz" component={LessonQuizScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="DemoProfiles" component={DemoProfilesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}