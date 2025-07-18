import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import QRPaymentScreen from './QRPaymentScreen';
import BottomTabBar from '../components/BottomTabBar';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [showQR, setShowQR] = useState(false);

  const handlePaymentPress = () => {
    setShowQR(true);
    setActiveTab('home'); // QR 화면으로 이동할 때 홈 탭으로 설정
  };

  const handleBackFromQR = () => {
    setShowQR(false);
  };

  const renderScreen = () => {
    if (showQR) {
      return <QRPaymentScreen onBack={handleBackFromQR} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen onPaymentPress={handlePaymentPress} />;
      case 'map':
        return <MapScreen onPaymentPress={handlePaymentPress} />;
      case 'history':
        return <QRPaymentScreen onBack={handleBackFromQR} />; // 임시로 QR 화면 표시
      case 'profile':
        return <QRPaymentScreen onBack={handleBackFromQR} />; // 임시로 QR 화면 표시
      default:
        return <HomeScreen onPaymentPress={handlePaymentPress} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {!showQR && (
        <BottomTabBar 
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      )}
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