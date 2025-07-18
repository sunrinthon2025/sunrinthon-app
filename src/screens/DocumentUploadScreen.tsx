import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Folder, File } from 'lucide-react-native';

interface DocumentUploadScreenProps {
  onNext: () => void;
}

export default function DocumentUploadScreen({ onNext }: DocumentUploadScreenProps) {
  const [activeTab, setActiveTab] = useState('소속증명서');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 라이브러리 접근 권한이 필요합니다.');
      return false;
    }

    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
      return false;
    }
    
    return true;
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* 제목 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>소속증명 및 직업증명서 중 하나를</Text>
          <Text style={styles.title}>제출해주세요</Text>
        </View>

        {/* 탭 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === '소속증명서' && styles.activeTab]}
            onPress={() => setActiveTab('소속증명서')}
          >
            <Text style={[styles.tabText, activeTab === '소속증명서' && styles.activeTabText]}>
              소속증명서
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === '직업증명서' && styles.activeTab]}
            onPress={() => setActiveTab('직업증명서')}
          >
            <Text style={[styles.tabText, activeTab === '직업증명서' && styles.activeTabText]}>
              직업증명서
            </Text>
          </TouchableOpacity>
        </View>

        {/* 업로드 버튼들 */}
        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImageFromCamera}>
            <View style={styles.uploadIcon}>
              <Camera size={24} color="#6F7785" />
            </View>
            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadTitle}>눌러서 업로드</Text>
              <Text style={styles.uploadSubtitle}>카메라</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={pickImageFromLibrary}>
            <View style={styles.uploadIcon}>
              <Folder size={24} color="#6F7785" />
            </View>
            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadTitle}>눌러서 업로드</Text>
              <Text style={styles.uploadSubtitle}>파일</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 업로드된 이미지 미리보기 */}
        {uploadedImage && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: uploadedImage }} style={styles.previewImage} />
            <View style={styles.previewInfo}>
              <Text style={styles.uploadSuccess}>업로드 성공!</Text>
              <View style={styles.fileNameContainer}>
                <File size={16} color="#6F7785" />
                <Text style={styles.fileName}>Screenshot 2022-02-2...</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 다음 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, !uploadedImage && styles.disabledButton]} 
          onPress={onNext}
          disabled={!uploadedImage}
        >
          <Text style={[styles.nextButtonText, !uploadedImage && styles.disabledButtonText]}>
            다음
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'flex-start',
    gap: 0,
    alignSelf: 'stretch',
    borderRadius: 9999,
    backgroundColor: '#F2F3F5',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 9999,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6F7785',
  },
  activeTabText: {
    color: '#000000',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadTextContainer: {
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7D7D7D',
    lineHeight: 20,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6F7785',
    lineHeight: 26,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  previewImage: {
    width: '100%',
    height: 204,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    resizeMode: 'cover',
  },
  previewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  uploadSuccess: {
    fontSize: 14,
    fontWeight: '500',
    color: '#45BF52',
    lineHeight: 20,
  },
  fileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6F7785',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  nextButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#FF7049',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
}); 