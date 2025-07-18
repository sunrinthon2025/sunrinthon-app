import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboardingCompleted(true);
  };

  return (
    <>
      {isOnboardingCompleted ? (
        <MainScreen />
      ) : (
        <OnboardingScreen onContinue={handleOnboardingComplete} />
      )}
      <StatusBar style="auto" />
    </>
  );
}
