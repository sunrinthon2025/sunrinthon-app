import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DocumentUploadScreen from './src/screens/DocumentUploadScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'upload' | 'main'>('onboarding');

  const handleOnboardingComplete = () => {
    setCurrentScreen('upload');
  };

  const handleUploadComplete = () => {
    setCurrentScreen('main');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onContinue={handleOnboardingComplete} />;
      case 'upload':
        return <DocumentUploadScreen onNext={handleUploadComplete} />;
      case 'main':
        return <MainScreen />;
      default:
        return <OnboardingScreen onContinue={handleOnboardingComplete} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <StatusBar style="auto" />
    </>
  );
}
