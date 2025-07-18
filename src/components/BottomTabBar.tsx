import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HouseIcon from '../assets/icon/house.svg';
import MapIcon from '../assets/icon/map.svg';
import CreditCardIcon from '../assets/icon/credit-card.svg';
import UserIcon from '../assets/icon/circle-user-round.svg';

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const tabs = [
    { key: 'home', label: '홈', Icon: HouseIcon },
    { key: 'map', label: '지도', Icon: MapIcon },
    { key: 'history', label: '결제 내역', Icon: CreditCardIcon },
    { key: 'profile', label: '프로필', Icon: UserIcon },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const IconComponent = tab.Icon;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            <IconComponent 
              width={24}
              height={24}
              fill={activeTab === tab.key ? '#000000' : '#6F7785'}
            />
            <Text style={[
              styles.label,
              activeTab === tab.key && styles.activeLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6F7785',
    marginTop: 4,
  },
  activeLabel: {
    color: '#000000',
    fontWeight: '600',
  },
}); 