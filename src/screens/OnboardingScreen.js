import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

export const OnboardingScreen = ({ navigation }) => {
  const handleProceed = () => {
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />
      <View style={styles.container}>
        {/* Top Floating Visual Section */}
        <View style={styles.illustrationArea}>
          <View style={styles.paperPlaneContainer}>
            <MaterialCommunityIcons
              name="send"
              size={36}
              color={colors.peachCream}
              style={styles.planeIcon}
            />
          </View>

          <View style={styles.avatarCircleOuter}>
            <View style={styles.avatarCircleInner}>
              <MaterialCommunityIcons
                name="wallet-giftcard"
                size={70}
                color={colors.peachCream}
              />
            </View>
          </View>

          {/* Badges */}
          <View style={[styles.badge, styles.badgeLeft]}>
            <Feather name="trending-up" size={16} color={colors.white} />
            <Text style={styles.badgeText}>Hemat 30%</Text>
          </View>

          <View style={[styles.badge, styles.badgeRight]}>
            <Feather name="shield" size={16} color={colors.deepPlum} />
            <Text style={[styles.badgeText, { color: colors.deepPlum }]}>Aman & Rapi</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>SikDay</Text>
          <Text style={styles.description}>
            Catat pemasukan dan pengeluaran harianmu dengan praktis, kelola pos
            tabungan, dan raih kebebasan finansial bersama SikDay.
          </Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleProceed}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>YUK ATUR KEUANGAN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleProceed}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>LEWATI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.headerBg,
    justifyContent: 'space-between',
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
  paperPlaneContainer: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  planeIcon: {
    transform: [{ rotate: '-25deg' }],
  },
  avatarCircleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(218, 98, 125, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.softPink,
  },
  avatarCircleInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.magentaRose,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.peachCream,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
  },
  badgeLeft: {
    bottom: 50,
    left: 30,
    backgroundColor: colors.blushCoral,
  },
  badgeRight: {
    top: 90,
    left: 40,
    backgroundColor: colors.peachCream,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 6,
  },
  bottomSheet: {
    paddingHorizontal: 28,
    paddingBottom: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.softPink,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 165, 171, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: colors.peachCream,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.blushCoral,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: colors.blushCoral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skipButton: {
    marginTop: 18,
    paddingVertical: 8,
  },
  skipButtonText: {
    color: colors.peachCream,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
});

export default OnboardingScreen;