import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../constants/colors';
import Header from '../components/Header';
import TransactionItem from '../components/TransactionItem';
import { useTransactions } from '../context/TransactionContext';

export const TransactionsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    transactions,
    balance,
    totalIncome,
    totalExpense,
    getCategoryTotal,
    formatCurrency,
    userProfile,
  } = useTransactions();

  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const handleOpenDetail = (transactionId) => {
    navigation.navigate('TransactionDetail', { transactionId });
  };

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const userFirstName = (userProfile.name || 'Pengguna').split(' ')[0];

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Header
          greeting="Selamat Datang"
          userName={`Hai, ${userFirstName}`}
          onMenuPress={() => {}}
          onNotificationPress={() => navigation.navigate('Notification')}
        />

        <View style={styles.summaryContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Saldo Total (Balance)</Text>
            <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <View style={[styles.statIconBox, { backgroundColor: colors.incomeBg }]}>
                <Feather name="arrow-down-left" size={16} color={colors.income} />
              </View>
              <View>
                <Text style={styles.statBoxLabel}>Pemasukan</Text>
                <Text style={[styles.statBoxValue, { color: colors.income }]}>
                  {formatCurrency(totalIncome)}
                </Text>
              </View>
            </View>

            <View style={styles.statBox}>
              <View style={[styles.statIconBox, { backgroundColor: colors.expenseBg }]}>
                <Feather name="arrow-up-right" size={16} color={colors.expense} />
              </View>
              <View>
                <Text style={styles.statBoxLabel}>Pengeluaran</Text>
                <Text style={[styles.statBoxValue, { color: colors.peachCream }]}>
                  {formatCurrency(totalExpense)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bannerCard}>
            <View style={styles.bannerIconCircle}>
              <MaterialCommunityIcons
                name="calculator-variant"
                size={28}
                color={colors.deepPlum}
              />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Smart Budgeting SikDay</Text>
              <Text style={styles.bannerSubtitle}>
                Pengeluaran harian terkendali rapi dalam batas aman keuangan.
              </Text>
            </View>
          </View>

          <View style={styles.quickGrid}>
            <View style={styles.quickCard}>
              <View style={styles.quickIconCircle}>
                <MaterialCommunityIcons name="chart-donut" size={24} color={colors.deepPlum} />
              </View>
              <Text style={styles.quickTitle}>SIMPANAN</Text>
              <Text style={styles.quickAmount} numberOfLines={1}>
                {formatCurrency(getCategoryTotal('Simpanan'))}
              </Text>
            </View>

            <View style={[styles.quickCard, styles.quickCardHighlight]}>
              <View style={[styles.quickIconCircle, styles.quickIconCircleDark]}>
                <MaterialCommunityIcons name="safe" size={24} color={colors.peachCream} />
              </View>
              <Text style={[styles.quickTitle, styles.textPeach]}>DARURAT</Text>
              <Text style={[styles.quickAmount, styles.textSoftPink]} numberOfLines={1}>
                {formatCurrency(getCategoryTotal('Tabungan Darurat'))}
              </Text>
            </View>

            <View style={styles.quickCard}>
              <View style={styles.quickIconCircle}>
                <MaterialCommunityIcons name="gift-outline" size={24} color={colors.deepPlum} />
              </View>
              <Text style={styles.quickTitle}>JAJAN</Text>
              <Text style={styles.quickAmount} numberOfLines={1}>
                {formatCurrency(getCategoryTotal('Jajan'))}
              </Text>
            </View>

            <View style={styles.quickCard}>
              <View style={styles.quickIconCircle}>
                <MaterialCommunityIcons name="rocket-launch-outline" size={24} color={colors.deepPlum} />
              </View>
              <Text style={styles.quickTitle}>INVESTASI</Text>
              <Text style={styles.quickAmount} numberOfLines={1}>
                {formatCurrency(getCategoryTotal('Investasi'))}
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Daftar Transaksi</Text>
              <Text style={styles.sectionSubtitle}>
                {filteredTransactions.length} transaksi aktif
              </Text>
            </View>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={handleAddTransaction}
              activeOpacity={0.85}
            >
              <Feather name="plus" size={16} color={colors.white} />
              <Text style={styles.ctaButtonText}>Tambah</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                filter === 'all' && styles.filterChipActive,
              ]}
              onPress={() => setFilter('all')}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'all' && styles.filterTextActive,
                ]}
              >
                Semua ({transactions.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterChip,
                filter === 'income' && styles.filterChipIncomeActive,
              ]}
              onPress={() => setFilter('income')}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'income' && styles.filterTextActive,
                ]}
              >
                Pemasukan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterChip,
                filter === 'expense' && styles.filterChipExpenseActive,
              ]}
              onPress={() => setFilter('expense')}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'expense' && styles.filterTextActive,
                ]}
              >
                Pengeluaran
              </Text>
            </TouchableOpacity>
          </View>

          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={44}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyTitle}>Belum Ada Transaksi</Text>
              <Text style={styles.emptySubtitle}>
                Tidak ada data pada kategori filter yang dipilih.
              </Text>
            </View>
          ) : (
            <View style={styles.transactionList}>
              {filteredTransactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  onPress={() => handleOpenDetail(tx.id)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 100,
  },
  summaryContainer: {
    backgroundColor: colors.headerBg,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  balanceHeader: {
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 13,
    color: colors.softPink,
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(249, 219, 189, 0.25)',
    marginVertical: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statBoxLabel: {
    fontSize: 11,
    color: colors.softPink,
    fontWeight: '500',
  },
  statBoxValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  body: {
    backgroundColor: colors.contentBg,
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    padding: 14,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    elevation: 2,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  bannerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.deepPlum,
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 11,
    color: colors.magentaRose,
    lineHeight: 15,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    elevation: 3,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  quickCardHighlight: {
    backgroundColor: colors.deepPlum,
    borderColor: colors.deepPlum,
  },
  quickIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(69, 9, 32, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickIconCircleDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  quickTitle: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.deepPlum,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  quickAmount: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.magentaRose,
    marginTop: 3,
  },
  textPeach: {
    color: colors.peachCream,
  },
  textSoftPink: {
    color: colors.softPink,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.deepPlum,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.magentaRose,
    marginTop: 2,
    fontWeight: '500',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blushCoral,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    elevation: 3,
    shadowColor: colors.blushCoral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  ctaButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 4,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    marginRight: 8,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: colors.deepPlum,
    borderColor: colors.deepPlum,
  },
  filterChipIncomeActive: {
    backgroundColor: colors.income,
    borderColor: colors.income,
  },
  filterChipExpenseActive: {
    backgroundColor: colors.blushCoral,
    borderColor: colors.blushCoral,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  filterTextActive: {
    color: colors.white,
  },
  transactionList: {
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    marginTop: 6,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.deepPlum,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default TransactionsScreen;