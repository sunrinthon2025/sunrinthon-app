import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DocumentUploadScreen from './src/screens/DocumentUploadScreen';
import ImageConfirmScreen from './src/screens/ImageConfirmScreen';
import SignupCompleteScreen from './src/screens/SignupCompleteScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'documentUpload' | 'imageConfirm' | 'signupComplete' | 'main'>('onboarding');
  const [uploadedImageUri, setUploadedImageUri] = useState<string>('');

  const handleOnboardingComplete = () => {
    setCurrentScreen('documentUpload');
  };

  const handleImageUploaded = (imageUri: string) => {
    setUploadedImageUri(imageUri);
    setCurrentScreen('imageConfirm');
  };

  const handleImageConfirm = () => {
    setCurrentScreen('signupComplete');
  };

  const handleSignupComplete = () => {
    setCurrentScreen('main');
  };

  const handleRetakeImage = () => {
    setCurrentScreen('documentUpload');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onContinue={handleOnboardingComplete} />;
      case 'documentUpload':
        return <DocumentUploadScreen onImageUploaded={handleImageUploaded} />;
      case 'imageConfirm':
        return (
          <ImageConfirmScreen 
            imageUri={uploadedImageUri}
            onConfirm={handleImageConfirm}
            onRetake={handleRetakeImage}
          />
        );
      case 'signupComplete':
        return <SignupCompleteScreen onComplete={handleSignupComplete} />;
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
