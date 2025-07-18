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
import { CreditCard, QrCode, Search, MapPin, Gift } from 'lucide-react-native';

interface HomeScreenProps {
  onPaymentPress?: () => void;
}

export default function HomeScreen({ onPaymentPress }: HomeScreenProps) {
  const categories = [
    { id: 1, name: '음식점', image: require('../assets/images/food.png') },
    { id: 2, name: '카페', image: require('../assets/images/coffee.png') },
    { id: 3, name: '마트', image: require('../assets/images/mart.png') },
    { id: 4, name: '편의점', image: require('../assets/images/store.png') },
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
        {/* 상단 헤더 섹션 */}
        <View style={styles.headerSection}>
          <TouchableOpacity style={styles.headerButton} onPress={onPaymentPress}>
            <QrCode size={24} color="#FF7049" />
            <Text style={styles.headerButtonText}>QR 결제하기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.pointIcon}>
              <Text style={styles.pointIconText}>🎁</Text>
            </View>
            <Text style={styles.headerButtonText}>기타 포인트 적립하기</Text>
          </TouchableOpacity>
        </View>

        {/* 금액 카드 */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>더 많이 사용 가능 금액</Text>
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
          <Text style={styles.sectionTitle}>쉽게 가는 이용하는 가맹점</Text>
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

        {/* 1곳 가맹점 위치 */}
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <Text style={styles.sectionTitle}>1곳 가맹점 위치</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.storeItem}>
            <Image 
              source={require('../assets/images/subway.png')} 
              style={styles.storeImage}
              resizeMode="cover"
            />
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>서브웨이</Text>
              <Text style={styles.storeDistance}>32m</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 선택 받고있는 가맹점 */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>선택 받고있는 가맹점</Text>
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
  headerSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  headerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    gap: 8,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  pointIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointIconText: {
    fontSize: 18,
  },
  amountCard: {
    backgroundColor: '#FF7049',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchSection: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  storeSection: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  storeImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  storeDistance: {
    fontSize: 12,
    color: '#6F7785',
  },
  locationSection: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 12,
    color: '#6F7785',
  },
  popularSection: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
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