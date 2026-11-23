import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import colors from '../constants/colors';
import { useTransactions } from '../context/TransactionContext';
import { TRANSACTION_CATEGORIES } from '../constants/categories';

export const AddTransactionScreen = ({ navigation }) => {
  const { addTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Jajan');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validasi Gagal', 'Judul transaksi tidak boleh kosong.');
      return;
    }

    const cleanAmount = (amount || '').toString().replace(/[^0-9.]/g, '');
    const numericAmount = Number(cleanAmount);
    if (!cleanAmount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Validasi Gagal', 'Nominal harus berupa angka lebih besar dari 0.');
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date: date || new Date().toISOString().split('T')[0],
      note: note.trim() || '-',
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />

      {/* Header Gelap (#450920) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={26} color={colors.peachCream} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catat Transaksi Baru</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Area Konten Utama (#F9DBBD) */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Type Toggle: Pengeluaran vs Pemasukan (Kartu Putih #FFFFFF) */}
        <View style={styles.typeToggleContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.typeButtonExpenseActive,
            ]}
            onPress={() => setType('expense')}
            activeOpacity={0.8}
          >
            <Feather
              name="arrow-up-right"
              size={18}
              color={type === 'expense' ? colors.white : colors.deepPlum}
            />
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.typeButtonTextActive,
              ]}
            >
              Pengeluaran
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.typeButtonIncomeActive,
            ]}
            onPress={() => setType('income')}
            activeOpacity={0.8}
          >
            <Feather
              name="arrow-down-left"
              size={18}
              color={type === 'income' ? colors.white : colors.deepPlum}
            />
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.typeButtonTextActive,
              ]}
            >
              Pemasukan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Nominal (Kartu Putih #FFFFFF) */}
        <View style={styles.cardSection}>
          <Text style={styles.inputLabel}>Nominal Transaksi (IDR)</Text>
          <View style={styles.amountInputRow}>
            <Text style={styles.currencyPrefix}>Rp</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor="#A88B7D"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Input Judul Transaksi (Kartu Putih #FFFFFF) */}
        <View style={styles.cardSection}>
          <Text style={styles.inputLabel}>Judul Transaksi</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Contoh: Kopi Sore, Tagihan Internet, Modul Kuliah"
            placeholderTextColor="#A88B7D"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Pilihan Kategori (Kartu Putih #FFFFFF) */}
        <View style={styles.cardSection}>
          <Text style={styles.inputLabel}>Kategori Anggaran ({TRANSACTION_CATEGORIES.length} Pilihan)</Text>
          <View style={styles.categoriesWrap}>
            {TRANSACTION_CATEGORIES.map((cat) => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => setCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Input Tanggal (Kartu Putih #FFFFFF) */}
        <View style={styles.cardSection}>
          <Text style={styles.inputLabel}>Tanggal (YYYY-MM-DD)</Text>
          <View style={styles.dateInputRow}>
            <Feather name="calendar" size={18} color={colors.magentaRose} />
            <TextInput
              style={styles.dateInput}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#A88B7D"
            />
          </View>
        </View>

        {/* Input Catatan / Note (Kartu Putih #FFFFFF) */}
        <View style={styles.cardSection}>
          <Text style={styles.inputLabel}>Catatan Tambahan (Opsional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Keterangan rincian transaksi..."
            placeholderTextColor="#A88B7D"
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Tombol Aksi Utama Simpan (CTA #DA627D) */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text style={styles.saveButtonText}>Simpan Transaksi</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.headerBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.headerBg,
  },
  closeButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.contentBg,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 40,
  },
  typeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    elevation: 2,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  typeButtonExpenseActive: {
    backgroundColor: colors.blushCoral,
  },
  typeButtonIncomeActive: {
    backgroundColor: colors.income,
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.deepPlum,
    marginLeft: 6,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  cardSection: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECD1B8',
    elevation: 2,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.magentaRose,
    marginBottom: 8,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyPrefix: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.deepPlum,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: colors.deepPlum,
    paddingVertical: 4,
  },
  textInput: {
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: '600',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E2D2',
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  categoriesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E2BFA2',
    margin: 4,
  },
  categoryChipSelected: {
    backgroundColor: colors.deepPlum,
    borderColor: colors.deepPlum,
  },
  categoryChipText: {
    fontSize: 12,
    color: colors.deepPlum,
    fontWeight: '700',
  },
  categoryChipTextSelected: {
    color: colors.peachCream,
    fontWeight: '800',
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: '600',
    marginLeft: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blushCoral,
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 8,
    shadowColor: colors.blushCoral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});

export default AddTransactionScreen;