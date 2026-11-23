import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import Header from '../components/Header';
import { useTransactions } from '../context/TransactionContext';

export const NotificationScreen = ({ navigation }) => {
  const {
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    balance,
    formatCurrency,
  } = useTransactions();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'unread'

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.isRead;
    return true;
  });

  const handleClearAll = () => {
    if (notifications.length === 0) return;
    Alert.alert(
      'Bersihkan Notifikasi',
      'Apakah Anda yakin ingin menghapus seluruh notifikasi dan peringatan dari daftar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Bersihkan',
          style: 'destructive',
          onPress: () => clearAllNotifications(),
        },
      ]
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'danger':
        return {
          name: 'alert-octagon',
          family: 'feather',
          color: colors.danger,
          bg: colors.dangerBg,
        };
      case 'warning':
        return {
          name: 'alert-triangle',
          family: 'feather',
          color: colors.warning,
          bg: colors.warningBg,
        };
      case 'info':
        return {
          name: 'information-outline',
          family: 'material',
          color: colors.info,
          bg: colors.infoBg,
        };
      case 'success':
      default:
        return {
          name: 'shield-check-outline',
          family: 'material',
          color: colors.success,
          bg: colors.successBg,
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />

      {/* Header Gelap (#450920) */}
      <Header
        title="Pusat Notifikasi"
        subtitle="Peringatan Saldo & Keuangan"
        showBack
        onBackPress={() => navigation.goBack()}
        showNotificationIcon={false}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Status Saldo Aktif (#450920) */}
        <View style={styles.statusBanner}>
          <View style={styles.statusHeaderRow}>
            <View>
              <Text style={styles.statusBannerLabel}>Kondisi Saldo SikDay</Text>
              <Text style={styles.statusBannerAmount}>{formatCurrency(balance)}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    balance <= 0
                      ? colors.dangerBg
                      : balance < 2000000
                      ? colors.warningBg
                      : colors.incomeBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusBadgeText,
                  {
                    color:
                      balance <= 0
                        ? colors.danger
                        : balance < 2000000
                        ? colors.warning
                        : colors.income,
                  },
                ]}
              >
                {balance <= 0 ? 'Defisit / Minus' : balance < 2000000 ? 'Menipis' : 'Sehat'}
              </Text>
            </View>
          </View>
        </View>

        {/* Konten Area (#F9DBBD) */}
        <View style={styles.body}>
          {/* Action Row & Filter */}
          <View style={styles.actionRow}>
            <View style={styles.filterGroup}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === 'all' && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter('all')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === 'all' && styles.filterTextActive,
                  ]}
                >
                  Semua ({notifications.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === 'unread' && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter('unread')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === 'unread' && styles.filterTextActive,
                  ]}
                >
                  Belum Dibaca ({unreadCount})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View style={styles.buttonGroup}>
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={markAllNotificationsAsRead}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="check-all"
                    size={16}
                    color={colors.deepPlum}
                  />
                  <Text style={styles.actionBtnText}>Baca Semua</Text>
                </TouchableOpacity>
              )}

              {notifications.length > 0 && (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.clearBtn]}
                  onPress={handleClearAll}
                  activeOpacity={0.7}
                >
                  <Feather name="trash-2" size={14} color={colors.magentaRose} />
                  <Text style={[styles.actionBtnText, { color: colors.magentaRose }]}>
                    Bersihkan
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* List Notifikasi */}
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name="notifications-off-outline"
                  size={42}
                  color={colors.magentaRose}
                />
              </View>
              <Text style={styles.emptyTitle}>Tidak Ada Notifikasi</Text>
              <Text style={styles.emptySubtitle}>
                {activeFilter === 'unread'
                  ? 'Semua notifikasi dan peringatan saldo telah dibaca.'
                  : 'Pusat notifikasi bersih. Belum ada peringatan saldo baru.'}
              </Text>
            </View>
          ) : (
            filteredNotifications.map((notif) => {
              const iconInfo = getNotificationIcon(notif.type);
              return (
                <View
                  key={notif.id}
                  style={[
                    styles.notifCard,
                    !notif.isRead && styles.unreadNotifCard,
                  ]}
                >
                  <View style={styles.notifTopRow}>
                    <View
                      style={[styles.notifIconWrap, { backgroundColor: iconInfo.bg }]}
                    >
                      {iconInfo.family === 'feather' ? (
                        <Feather name={iconInfo.name} size={18} color={iconInfo.color} />
                      ) : (
                        <MaterialCommunityIcons
                          name={iconInfo.name}
                          size={20}
                          color={iconInfo.color}
                        />
                      )}
                    </View>

                    <View style={styles.notifHeaderTexts}>
                      <View style={styles.titleWithBadge}>
                        <Text style={styles.notifTitle} numberOfLines={1}>
                          {notif.title}
                        </Text>
                        {!notif.isRead && <View style={styles.unreadDot} />}
                      </View>
                      <Text style={styles.notifDate}>{notif.date}</Text>
                    </View>
                  </View>

                  <Text style={styles.notifMessage}>{notif.message}</Text>

                  {/* Card Footer Controls */}
                  <View style={styles.notifFooter}>
                    {!notif.isRead ? (
                      <TouchableOpacity
                        style={styles.markReadBtn}
                        onPress={() => markNotificationAsRead(notif.id)}
                        activeOpacity={0.7}
                      >
                        <Feather name="check" size={14} color={colors.white} />
                        <Text style={styles.markReadBtnText}>Tandai Sudah Dibaca</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.readStatusTag}>
                        <Feather name="check" size={12} color={colors.income} />
                        <Text style={styles.readStatusText}>Sudah Dibaca</Text>
                      </View>
                    )}

                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => deleteNotification(notif.id)}
                      activeOpacity={0.7}
                    >
                      <Feather name="trash-2" size={14} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
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
    backgroundColor: colors.contentBg,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  statusBanner: {
    backgroundColor: colors.headerBg,
    paddingHorizontal: 20,
    paddingBottom: 18,
    paddingTop: 4,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(249, 219, 189, 0.2)',
  },
  statusBannerLabel: {
    fontSize: 11,
    color: colors.softPink,
    fontWeight: '600',
  },
  statusBannerAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  body: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  actionRow: {
    marginBottom: 14,
  },
  filterGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.deepPlum,
    borderColor: colors.deepPlum,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  filterTextActive: {
    color: colors.white,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    marginLeft: 8,
  },
  clearBtn: {
    borderColor: colors.softPink,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.deepPlum,
    marginLeft: 4,
  },
  notifCard: {
    backgroundColor: colors.cardBg, // Kartu Putih #FFFFFF
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  unreadNotifCard: {
    borderLeftWidth: 5,
    borderLeftColor: colors.blushCoral, // #DA627D
  },
  notifTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notifIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  notifHeaderTexts: {
    flex: 1,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.deepPlum,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blushCoral,
    marginLeft: 6,
  },
  notifDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  notifMessage: {
    fontSize: 12,
    color: colors.deepPlum,
    lineHeight: 18,
    marginVertical: 6,
  },
  notifFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F6EAE1',
  },
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blushCoral, // #DA627D
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  markReadBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 4,
  },
  readStatusTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readStatusText: {
    fontSize: 11,
    color: colors.income,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 8,
  },
  emptyCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECD1B8',
    marginTop: 10,
  },
  emptyIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.deepPlum,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});

export default NotificationScreen;
