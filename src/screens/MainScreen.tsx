import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HomeScreen from './HomeScreen';
import QRPaymentScreen from './QRPaymentScreen';
import BottomTabBar from '../components/BottomTabBar';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <QRPaymentScreen />; // 임시로 QR 화면 표시
      case 'history':
        return <QRPaymentScreen />; // 임시로 QR 화면 표시
      case 'profile':
        return <QRPaymentScreen />; // 임시로 QR 화면 표시
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomTabBar 
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
}); 