import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { GoogleUserInfo } from '../types';

WebBrowser.maybeCompleteAuthSession();

// Google OAuth 설정
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // 실제 클라이언트 ID로 교체 필요
const GOOGLE_REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'sunrinthon-app',
});

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<GoogleUserInfo | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: GOOGLE_REDIRECT_URI,
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        access_type: 'offline',
      },
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthResponse(response);
    }
  }, [response]);

  const handleAuthResponse = async (response: AuthSession.AuthSessionResult) => {
    if (response.type === 'success') {
      try {
        // 토큰 교환
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: GOOGLE_CLIENT_ID,
            code: response.params.code,
            redirectUri: GOOGLE_REDIRECT_URI,
            extraParams: {
              code_verifier: request?.codeVerifier || '',
            },
          },
          discovery
        );

        // 사용자 정보 가져오기
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.accessToken}`
        );
        const userInfo = await userInfoResponse.json();

        setUserInfo(userInfo);
        Alert.alert('로그인 성공', `${userInfo.name}님 환영합니다!`);
        
        // 여기서 메인 화면으로 이동
        console.log('사용자 정보:', userInfo);
      } catch (error) {
        console.error('토큰 교환 오류:', error);
        Alert.alert('오류', '로그인 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await promptAsync();
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('오류', '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>우리페이</Text>
        <Text style={styles.subtitle}>소방청 전용 결제 서비스</Text>
        
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.logoInner} />
          </View>
        </View>

        {userInfo ? (
          <View style={styles.userInfo}>
            <Text style={styles.welcomeText}>
              {userInfo.name}님 환영합니다!
            </Text>
            <Text style={styles.emailText}>{userInfo.email}</Text>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => {
                // QR 결제 화면으로 이동하는 로직
                Alert.alert('QR 결제', 'QR 결제 화면으로 이동합니다.');
              }}
            >
              <Text style={styles.qrButtonText}>QR 결제 시작</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.googleButton, isLoading && styles.disabledButton]}
            onPress={handleGoogleLogin}
            disabled={isLoading || !request}
          >
            <Text style={styles.googleButtonText}>
              {isLoading ? '로그인 중...' : 'Google로 로그인'}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.description}>
          소방청 직원만 이용 가능한 서비스입니다
        </Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 60,
  },
  logoContainer: {
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 40,
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  qrButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
}); 