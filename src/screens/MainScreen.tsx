import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import QRPaymentScreen from './QRPaymentScreen';
import PaymentHistoryScreen from './PaymentHistoryScreen';
import SearchScreen from './SearchScreen';
import StoreDetailScreen from './StoreDetailScreen';
import BottomTabBar from '../components/BottomTabBar';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const [showQR, setShowQR] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  const handlePaymentPress = () => {
    setShowQR(true);
    setActiveTab('home'); // QR 화면으로 이동할 때 홈 탭으로 설정
  };

  const handleSearchPress = () => {
    setShowSearch(true);
  };

  const handleStorePress = (store: any) => {
    setSelectedStore(store);
    setShowStoreDetail(true);
  };

  const handleBackFromQR = () => {
    setShowQR(false);
  };

  const handleBackFromSearch = () => {
    setShowSearch(false);
  };

  const handleBackFromStoreDetail = () => {
    setShowStoreDetail(false);
    setSelectedStore(null);
  };

  const renderScreen = () => {
    if (showQR) {
      return <QRPaymentScreen onBack={handleBackFromQR} />;
    }

    if (showSearch) {
      return <SearchScreen onBackPress={handleBackFromSearch} onStorePress={handleStorePress} />;
    }

    if (showStoreDetail && selectedStore) {
      return (
        <StoreDetailScreen 
          store={selectedStore} 
          onBack={handleBackFromStoreDetail}
          onOrder={handlePaymentPress}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen onPaymentPress={handlePaymentPress} onSearchPress={handleSearchPress} onStorePress={handleStorePress} />;
      case 'map':
        return <MapScreen onPaymentPress={handlePaymentPress} onStorePress={handleStorePress} />;
      case 'history':
        return <PaymentHistoryScreen />;
      case 'profile':
        return <QRPaymentScreen onBack={handleBackFromQR} />; // 임시로 QR 화면 표시
      default:
        return <HomeScreen onPaymentPress={handlePaymentPress} onSearchPress={handleSearchPress} onStorePress={handleStorePress} />;
    }
  };

  // StoreDetail 화면일 때는 SafeAreaView 사용하고 바텀바 숨김
  if (showStoreDetail) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </SafeAreaView>
    );
  }

  // Map 화면일 때는 SafeArea 없이
  if (activeTab === 'map' && !showQR && !showSearch) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
        <BottomTabBar 
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </View>
    );
  }

  // 다른 페이지들은 SafeAreaView 사용
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {!showQR && !showSearch && (
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