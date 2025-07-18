import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { Search, ArrowLeft } from 'lucide-react-native';

interface SearchScreenProps {
  onBackPress?: () => void;
}

export default function SearchScreen({ onBackPress }: SearchScreenProps) {
  const [searchText, setSearchText] = useState('');

  const recentSearches = [
    '김치찌개 맛집',
    '김치찌개 맛집',
    '김치찌개 맛집',
  ];

  const recommendedStores = [
    { id: 1, name: '맥도날드 부천역점', subtitle: '이전 맥도날드 원조' },
    { id: 2, name: '맥도날드 부천역점', subtitle: '이전 맥도날드 원조' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6F7785" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="검색어를 입력하세요"
            placeholderTextColor="#6F7785"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 최근 검색어 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 검색어</Text>
          {recentSearches.map((search, index) => (
            <TouchableOpacity key={index} style={styles.recentSearchItem}>
              <Search size={17} color="#6F7785" />
              <Text style={styles.recentSearchText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 서비스가 추천하는 가맹점 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>서비스가 추천하는 가맹점</Text>
          {recommendedStores.map((store) => (
            <TouchableOpacity key={store.id} style={styles.recommendedStoreItem}>
              <Image 
                source={require('../assets/images/mc.jpg')} 
                style={styles.recommendedStoreImage}
                resizeMode="cover"
              />
              <View style={styles.recommendedStoreInfo}>
                <Text style={styles.recommendedStoreName}>{store.name}</Text>
                <Text style={styles.recommendedStoreSubtitle}>{store.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6F7785',
    lineHeight: 20,
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  recentSearchText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 24,
  },
  recommendedStoreItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    alignSelf: 'stretch',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  recommendedStoreImage: {
    height: 170,
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 16,
  },
  recommendedStoreInfo: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  recommendedStoreName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0D0E0E',
    lineHeight: 24,
    marginBottom: 4,
  },
  recommendedStoreSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6F7785',
    lineHeight: 20,
  },
}); 