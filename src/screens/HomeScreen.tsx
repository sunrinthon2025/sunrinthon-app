import React from 'react';
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
import { CreditCard, ScanLine, Search, MapPin, Package } from 'lucide-react-native';

interface HomeScreenProps {
  onPaymentPress?: () => void;
}

export default function HomeScreen({ onPaymentPress }: HomeScreenProps) {
  const categories = [
    { id: 1, name: '음식점', image: require('../assets/images/food.png') },
    { id: 2, name: '카페', image: require('../assets/images/coffee.png') },
    { id: 3, name: '마트', image: require('../assets/images/mart.png') },
    { id: 4, name: '편의점', image: require('../assets/images/gs25.png') },
  ];

  const subwayStores = [
    { id: 1, name: '서브웨이 강남역점', distance: '32m' },
    { id: 2, name: '서브웨이', distance: '120m' },
    { id: 3, name: '서브웨이', distance: '200m' },
  ];

  const mcdonaldsStores = [
    { id: 1, name: '맥도날드 부천역점', distance: '1.2km' },
    { id: 2, name: '맥도날드 부천역점', distance: '1.2km' },
    { id: 3, name: '맥도날드 부천역점', distance: '1.2km' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 상단 로고 */}
        <View style={styles.logoSection}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 상단 헤더 섹션 */}
        <View style={styles.headerSection}>
          <TouchableOpacity style={styles.headerButton} onPress={onPaymentPress}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonSubtitle}>가맹점</Text>
              <Text style={styles.buttonTitle}>QR 결제하기</Text>
            </View>
            <ScanLine size={24} color="#FF7049" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonSubtitle}>가맹점</Text>
              <Text style={styles.buttonTitle}>포장 주문하기</Text>
            </View>
            <Package size={24} color="#FF7049" />
          </TouchableOpacity>
        </View>

        {/* 금액 카드 */}
        <View style={styles.amountCard}>
          <View style={styles.amountHeader}>
            <CreditCard size={20} color="#ffffff" />
            <Text style={styles.amountLabel}>현재 사용 가능 금액</Text>
          </View>
          <Text style={styles.amountValue}>19,990원</Text>
        </View>

        {/* 가맹점 검색 */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6F7785" />
            <TextInput 
              style={styles.searchInput} 
              placeholder="가맹점 검색하기"
              placeholderTextColor="#6F7785"
            />
          </View>
          
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 쉽게 가는 이용하는 가맹점 */}
        <View style={styles.storeSection}>
          <Text style={styles.sectionTitle}>내가 자주 이용하는 가맹점</Text>
          {subwayStores.map((store) => (
            <TouchableOpacity key={store.id} style={styles.storeItem}>
              <Image 
                source={require('../assets/images/subway.png')} 
                style={styles.storeImage}
                resizeMode="cover"
              />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeDistance}>{store.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 광고 이미지 */}
        <TouchableOpacity style={styles.adContainer}>
          <Image 
            source={require('../assets/images/ad.png')} 
            style={styles.adImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* 선택 받고있는 가맹점 */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>나와 가까운 가맹점</Text>
          {mcdonaldsStores.map((store) => (
            <TouchableOpacity key={store.id} style={styles.popularStoreItem}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/300x200/FFD700/000000?text=McDonald%27s' }} 
                style={styles.popularStoreImage}
                resizeMode="cover"
              />
              <View style={styles.popularStoreInfo}>
                <Text style={styles.popularStoreName}>{store.name}</Text>
                <Text style={styles.popularStoreDistance}>{store.distance}</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 36,
    height: 36,
    aspectRatio: 1,
  },
  headerSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  headerButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
    gap: 8,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  buttonContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6F7785',
    lineHeight: 20,
    marginBottom: 4,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0D0E0E',
    lineHeight: 24,
  },

  amountCard: {
    backgroundColor: '#FF7049',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchSection: {
    borderRadius: 12,
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    marginBottom: 16,
    marginHorizontal: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryImage: {
    width: 40,
    height: 40,
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 0,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 24,
  },
  storeSection: {
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 26,
    marginBottom: 16,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  storeImage: {
    width: 90,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 26,
    marginBottom: 2,
  },
  storeDistance: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6F7785',
    lineHeight: 20,
  },

  adContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  adImage: {
    height: 92.5,
    alignSelf: 'stretch',
    aspectRatio: 370.00 / 92.50,
    borderRadius: 16,
  },
  popularSection: {
    borderRadius: 12,
    marginBottom: 20,
  },
  popularStoreItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  popularStoreImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  popularStoreInfo: {
    paddingHorizontal: 8,
  },
  popularStoreName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  popularStoreDistance: {
    fontSize: 12,
    color: '#6F7785',
  },
}); 