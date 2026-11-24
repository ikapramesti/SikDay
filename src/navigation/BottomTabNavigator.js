import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../constants/colors';
import TransactionsScreen from '../screens/TransactionsScreen';
import SummaryScreen from '../screens/SummaryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const EmptyAddPlaceholder = () => null;

export const BottomTabNavigator = () => {
  const rootNavigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="TransactionsTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.peachCream,
        tabBarInactiveTintColor: 'rgba(255, 165, 171, 0.65)',
        tabBarStyle: [
          styles.tabBar,
          {
            height: 70 + insets.bottom,
            paddingBottom: 10 + insets.bottom,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={24}
              color={focused ? colors.peachCream : color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SummaryTab"
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Ringkasan',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'chart-box' : 'chart-box-outline'}
              size={24}
              color={focused ? colors.peachCream : color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddPlaceholderTab"
        component={EmptyAddPlaceholder}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            rootNavigation.navigate('AddTransaction');
          },
        }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.floatingCenterButton}>
              <Feather name="plus" size={28} color={colors.white} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle-outline'}
              size={24}
              color={focused ? colors.peachCream : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bottomBarBg, 
    borderTopWidth: 0,
    elevation: 16,
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  floatingCenterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.blushCoral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
    borderWidth: 4,
    borderColor: colors.deepPlum,
    shadowColor: colors.blushCoral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default BottomTabNavigator;