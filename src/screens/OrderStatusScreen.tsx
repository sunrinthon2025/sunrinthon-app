import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

interface OrderStatusScreenProps {
  store: {
    id: number;
    name: string;
    address: string;
    distance?: string;
  };
  orderAmount: number;
}

export default function OrderStatusScreen({ store, orderAmount }: OrderStatusScreenProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    })();
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}시 ${minutes}분 주문`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
      >
        {/* 매장 위치 마커 */}
        <Marker
          coordinate={{
            latitude: region.latitude + 0.001,
            longitude: region.longitude + 0.001,
          }}
        >
          <Image 
            source={require('../assets/images/subwaypin.png')} 
            style={styles.markerImage}
            resizeMode="contain"
          />
        </Marker>
      </MapView>

      {/* 하단 주문 상태 카드 */}
      <View style={styles.orderCard}>
        <View style={styles.cardContent}>
          <Text style={styles.statusTitle}>음식이 조리중입니다</Text>
          <Text style={styles.statusSubtitle}>5분이 걸릴 예정이에요</Text>
          
          <View style={styles.storeInfo}>
            <View style={styles.storeLogoContainer}>
              <Image 
                source={require('../assets/images/subway.png')} 
                style={styles.storeLogo}
                resizeMode="cover"
              />
            </View>
            <View style={styles.storeDetails}>
              <Text style={styles.storeName}>서브웨이</Text>
              <Text style={styles.orderTime}>{getCurrentTime()}</Text>
            </View>
            <Text style={styles.orderAmount}>{orderAmount.toLocaleString()}원</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  orderCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    gap: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 28,
  },
  statusSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6F7785',
    lineHeight: 22,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
  },
  storeLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#4CAF50',
  },
  storeLogo: {
    width: '100%',
    height: '100%',
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 22,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6F7785',
    lineHeight: 18,
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF7049',
    lineHeight: 24,
  },
}); 