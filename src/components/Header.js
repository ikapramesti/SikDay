import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { useTransactions } from '../context/TransactionContext';

export const Header = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  onMenuPress,
  onNotificationPress,
  showNotificationIcon = true,
  greeting,
  userName,
}) => {
  const navigation = useNavigation();
  const { unreadCount } = useTransactions();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      navigation.navigate('Notification');
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.peachCream} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMenuPress}
            activeOpacity={0.7}
          >
            <Feather name="menu" size={24} color={colors.peachCream} />
          </TouchableOpacity>
        )}

        {showNotificationIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleNotificationPress}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color={colors.peachCream} />
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      {greeting && (
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
      )}

      {title && (
        <View style={styles.textContainer}>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBg,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.blushCoral, 
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.deepPlum,
  },
  unreadBadgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  textContainer: {
    marginTop: 4,
  },
  greetingText: {
    fontSize: 14,
    color: colors.softPink,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginTop: 2,
  },
  subtitleText: {
    fontSize: 12,
    color: colors.softPink,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginTop: 2,
  },
});

export default Header;