import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { QRCodeData } from '../types';

const { width } = Dimensions.get('window');

export default function QRPaymentScreen() {
  const [timeLeft, setTimeLeft] = useState(152);
  const [qrData, setQrData] = useState<QRCodeData>({
    paymentId: 'payment_123456',
    amount: 15000,
    expiresAt: new Date(Date.now() + 152000),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const qrValue = JSON.stringify({
    paymentId: qrData.paymentId,
    amount: qrData.amount,
    timestamp: new Date().toISOString(),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>우리페이 현장 결제</Text>
        </View>
      </View>

      <View style={styles.qrSection}>
        <QRCode
          value={qrValue}
          size={202}
          color="black"
          backgroundColor="white"
        />
        
        <Text style={styles.instructionText}>
          위 QR 코드를 인식해주세요
        </Text>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {formatTime(timeLeft)}
          </Text>
          <Text style={styles.expireText}>
            {' '}만료
          </Text>
        </View>
      </View>

      <View style={styles.affiliationSection}>
        <Text style={styles.affiliationLabel}>소속</Text>
        <Image 
          source={require('../../assets/firestation.png')} 
          style={styles.policeImage}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerText: {
    fontSize: 17,
    color: '#6F7785',
    fontWeight: '500',
    lineHeight: 24,
  },
  qrSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 17,
    color: '#6F7785',
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  timerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 17,
    color: '#F03839',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  expireText: {
    fontSize: 17,
    color: '#6F7785',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
  },
  affiliationSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  affiliationLabel: {
    fontSize: 17,
    color: '#6F7785',
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  policeImage: {
    width: 108,
    height: 27.648,
  },
}); 