import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './src/screens/MainScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DocumentUploadScreen from './src/screens/DocumentUploadScreen';
import ImageConfirmScreen from './src/screens/ImageConfirmScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'documentUpload' | 'imageConfirm' | 'main'>('onboarding');
  const [uploadedImageUri, setUploadedImageUri] = useState<string>('');

  const handleOnboardingComplete = () => {
    setCurrentScreen('documentUpload');
  };

  const handleImageUploaded = (imageUri: string) => {
    setUploadedImageUri(imageUri);
    setCurrentScreen('imageConfirm');
  };

  const handleImageConfirm = () => {
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
