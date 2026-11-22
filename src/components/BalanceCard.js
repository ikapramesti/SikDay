import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { useTransactions } from '../context/TransactionContext';

export const BalanceCard = ({ balance: propBalance, expense: propExpense }) => {
  const { balance, totalExpense, formatCurrency } = useTransactions();

  const displayBalance = propBalance !== undefined ? propBalance : balance;
  const displayExpense = propExpense !== undefined ? propExpense : totalExpense;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Saldo Total</Text>
          <Text style={styles.balanceValue}>{formatCurrency(displayBalance)}</Text>
        </View>

        <View style={[styles.column, styles.alignRight]}>
          <Text style={styles.label}>Pengeluaran</Text>
          <Text style={styles.expenseValue}>{formatCurrency(displayExpense)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBg,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 13,
    color: colors.softPink,
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.3,
  },
  expenseValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.peachCream,
    letterSpacing: 0.3,
  },
});

export default BalanceCard;