import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import GoogleIcon from '../assets/icon/google.svg';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };



  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login.png')}
        style={styles.backgroundImage}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.content}>
              <View style={styles.topSection}>
                <Image 
                  source={require('../assets/logo.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
                
                <Text style={styles.title}>신결제에</Text>
                <Text style={styles.title}>혁신을 더하다</Text>
              </View>

              <View style={styles.bottomSection}>
                                  <TouchableOpacity
                    style={[styles.googleButton, isLoading && styles.disabledButton]}
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <GoogleIcon width={20} height={20} />
                    <Text style={styles.googleButtonText}>
                      {isLoading ? '로그인 중...' : 'Google로 계속하기'}
                    </Text>
                  </TouchableOpacity>
                
                <Text style={styles.bottomText}>
                  로그인에 문제가 있나요?
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingTop: 60,
    alignItems: 'flex-start',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 44,
    marginBottom: 4,
  },
  bottomSection: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  googleButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    width: 354,
    height: 58,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bottomText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
}); 