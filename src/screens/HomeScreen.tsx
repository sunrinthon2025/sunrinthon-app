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
import CreditCardIcon from '../assets/icon/credit-card.svg';
import ScanQRIcon from '../assets/icon/scan-qr-code.svg';
import SearchIcon from '../assets/icon/search.svg';
import MapPinIcon from '../assets/icon/map-pin.svg';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Image 
            source={require('../assets/firestation.png')} 
            style={styles.firestationLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <CreditCardIcon width={20} height={20} fill="#6F7785" />
            <Text style={styles.balanceLabel}>현재 사용 가능 금액</Text>
          </View>
          <Text style={styles.balanceAmount}>19,990원</Text>
          
          <TouchableOpacity style={styles.paymentButton}>
            <View style={styles.buttonContent}>
              <ScanQRIcon width={20} height={20} fill="#ffffff" />
              <Text style={styles.paymentButtonText}>가맹점 결제하기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon width={20} height={20} fill="#6F7785" />
            <TextInput
              style={styles.searchInput}
              placeholder="가맹점 검색하기"
              placeholderTextColor="#6F7785"
            />
          </View>
        </View>

        <View style={styles.recommendedSection}>
          <View style={styles.recommendedHeader}>
            <Text style={styles.recommendedTitle}>우리페이가 추천하는 매장</Text>
            <View style={styles.locationContainer}>
              <MapPinIcon width={16} height={16} fill="#6F7785" />
              <Text style={styles.locationText}>부천시 관악구</Text>
            </View>
          </View>
          
          <View style={styles.nearbySection}>
            <Text style={styles.nearbyTitle}>50m 이내</Text>
            <View style={styles.storeList}>
              {[1, 2, 3].map((item) => (
                <TouchableOpacity key={item} style={styles.storeItem}>
                  <Image 
                    source={require('../assets/images/subway.png')} 
                    style={styles.storeIcon}
                    resizeMode="cover"
                  />
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>서브웨이</Text>
                    <Text style={styles.storeDistance}>
                      {item === 1 ? '50m' : item === 2 ? '45m' : '38m'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.nearbySection, { marginTop: 20 }]}>
            <Text style={styles.nearbyTitle}>100m 이내</Text>
            <View style={styles.storeList}>
              {[1, 2].map((item) => (
                <TouchableOpacity key={item} style={styles.storeItem}>
                  <Image 
                    source={require('../assets/images/subway.png')} 
                    style={styles.storeIcon}
                    resizeMode="cover"
                  />
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>서브웨이</Text>
                    <Text style={styles.storeDistance}>
                      {item === 1 ? '85m' : '92m'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 36,
    height: 36,
  },
  firestationLogo: {
    width: 108,
    height: 27.648,
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    display: 'flex',
    padding: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
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
    marginHorizontal: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  balanceLabel: {
    fontSize: 17,
    color: '#6F7785',
    fontWeight: '500',
    lineHeight: 24,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0D0E0E',
    lineHeight: 30,
  },
  paymentButton: {
    borderRadius: 16,
    backgroundColor: '#FF7049',
    display: 'flex',
    height: 58,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  paymentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 24,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 24,
    color: '#6F7785',
  },
  recommendedSection: {
    paddingHorizontal: 20,
  },
  recommendedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#6F7785',
  },
  nearbySection: {
    marginTop: 12,
  },
  nearbyTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#6F7785',
  },
  storeList: {
    gap: 0,
  },
  storeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: -16,
    marginHorizontal: -14,
  },
  storeIcon: {
    width: 90,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginRight: 16,
  },

  storeInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#000',
    marginBottom: 4,
  },
  storeDistance: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#6F7785',
  },
}); 