import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../constants/colors";
import { useTransactions } from "../context/TransactionContext";
import {
  TRANSACTION_CATEGORIES,
  getCategoryIconInfo,
} from "../constants/categories";

export const TransactionDetailScreen = ({ route, navigation }) => {
  const { transactionId } = route.params || {};
  const {
    getTransactionById,
    editTransaction,
    deleteTransaction,
    formatCurrency,
  } = useTransactions();

  const transaction = getTransactionById(transactionId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(transaction?.title || "");
  const [editAmount, setEditAmount] = useState(
    transaction ? String(transaction.amount) : "",
  );
  const [editType, setEditType] = useState(transaction?.type || "expense");
  const [editCategory, setEditCategory] = useState(
    transaction?.category || "Jajan",
  );
  const [editDate, setEditDate] = useState(transaction?.date || "");
  const [editNote, setEditNote] = useState(transaction?.note || "");

  if (!transaction) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Transaksi tidak ditemukan.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isIncome = transaction.type === "income";
  const iconInfo = getCategoryIconInfo(transaction.category);

  const handleDelete = () => {
    Alert.alert(
      "Hapus Transaksi",
      `Yakin ingin menghapus "${transaction.title}"?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteTransaction(transaction.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      Alert.alert("Validasi Gagal", "Judul transaksi tidak boleh kosong.");
      return;
    }

    const cleanAmount = (editAmount || "").toString().replace(/[^0-9.]/g, "");
    const numericAmount = Number(cleanAmount);
    if (!cleanAmount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert(
        "Validasi Gagal",
        "Nominal harus berupa angka lebih besar dari 0.",
      );
      return;
    }

    editTransaction(transaction.id, {
      title: editTitle.trim(),
      amount: numericAmount,
      type: editType,
      category: editCategory,
      date: editDate || transaction.date,
      note: editNote.trim() || "-",
    });

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(transaction.title);
    setEditAmount(String(transaction.amount));
    setEditType(transaction.type);
    setEditCategory(transaction.category);
    setEditDate(transaction.date);
    setEditNote(transaction.note);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (isEditing ? handleCancelEdit() : navigation.goBack())}
          style={styles.headerIcon}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isEditing ? "close" : "arrow-back"}
            size={24}
            color={colors.peachCream}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {isEditing ? "Edit Transaksi" : "Detail Transaksi"}
        </Text>

        <View style={styles.headerActions}>
          {!isEditing ? (
            <>
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={styles.headerActionBtn}
                activeOpacity={0.7}
              >
                <Feather name="edit-3" size={20} color={colors.peachCream} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.headerActionBtn}
                activeOpacity={0.7}
              >
                <Feather name="trash-2" size={20} color={colors.softPink} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={styles.headerActionBtn}
              activeOpacity={0.7}
            >
              <Feather name="check" size={22} color={colors.peachCream} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {!isEditing ? (
          <>
            <View style={styles.mainCard}>
              <View
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor: isIncome
                      ? colors.incomeBg
                      : colors.expenseBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.typeBadgeText,
                    { color: isIncome ? colors.income : colors.expense },
                  ]}
                >
                  {isIncome ? "Pemasukan" : "Pengeluaran"}
                </Text>
              </View>

              <Text style={styles.title}>{transaction.title}</Text>
              <Text
                style={[
                  styles.amount,
                  { color: isIncome ? colors.income : colors.expense },
                ]}
              >
                {isIncome ? "+ " : "- "}
                {formatCurrency(transaction.amount)}
              </Text>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.detailLabelRow}>
                  {iconInfo.family === "feather" ? (
                    <Feather
                      name={iconInfo.name}
                      size={18}
                      color={colors.magentaRose}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={iconInfo.name}
                      size={18}
                      color={colors.magentaRose}
                    />
                  )}
                  <Text style={styles.detailLabel}>Kategori</Text>
                </View>
                <Text style={styles.detailValue}>{transaction.category}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLabelRow}>
                  <Feather
                    name="calendar"
                    size={18}
                    color={colors.magentaRose}
                  />
                  <Text style={styles.detailLabel}>Tanggal</Text>
                </View>
                <Text style={styles.detailValue}>{transaction.date}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLabelRow}>
                  <Feather
                    name="file-text"
                    size={18}
                    color={colors.magentaRose}
                  />
                  <Text style={styles.detailLabel}>Catatan</Text>
                </View>
                <Text style={styles.detailValue}>
                  {transaction.note || "-"}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailLabelRow}>
                  <Feather name="hash" size={18} color={colors.magentaRose} />
                  <Text style={styles.detailLabel}>ID Transaksi</Text>
                </View>
                <Text style={[styles.detailValue, styles.monoText]}>
                  {transaction.id}
                </Text>
              </View>
            </View>

            <View style={styles.actionButtonGroup}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
                activeOpacity={0.85}
              >
                <Feather name="edit-3" size={18} color={colors.white} />
                <Text style={styles.editButtonText}>Edit Transaksi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Feather name="trash-2" size={18} color={colors.expense} />
                <Text style={styles.deleteButtonText}>Hapus Transaksi</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.editForm}>
            {/* Toggle Jenis: Pengeluaran / Pemasukan */}
            <View style={styles.editTypeRow}>
              <TouchableOpacity
                style={[
                  styles.editTypeBtn,
                  editType === "expense" && styles.editTypeBtnExpense,
                ]}
                onPress={() => setEditType("expense")}
              >
                <Text
                  style={[
                    styles.editTypeBtnText,
                    editType === "expense" && styles.editTypeBtnTextActive,
                  ]}
                >
                  Pengeluaran
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.editTypeBtn,
                  editType === "income" && styles.editTypeBtnIncome,
                ]}
                onPress={() => setEditType("income")}
              >
                <Text
                  style={[
                    styles.editTypeBtnText,
                    editType === "income" && styles.editTypeBtnTextActive,
                  ]}
                >
                  Pemasukan
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputFieldLabel}>
                Nominal Transaksi (IDR)
              </Text>
              <TextInput
                style={styles.amountInput}
                value={editAmount}
                onChangeText={setEditAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#A88B7D"
              />
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputFieldLabel}>Judul Transaksi</Text>
              <TextInput
                style={styles.textInputField}
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Judul transaksi"
                placeholderTextColor="#A88B7D"
              />
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputFieldLabel}>
                Kategori ({TRANSACTION_CATEGORIES.length} Pilihan)
              </Text>
              <View style={styles.chipsWrap}>
                {TRANSACTION_CATEGORIES.map((cat) => {
                  const isSelected = editCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.chipItem,
                        isSelected && styles.chipItemSelected,
                      ]}
                      onPress={() => setEditCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.chipItemText,
                          isSelected && styles.chipItemTextSelected,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputFieldLabel}>Tanggal (YYYY-MM-DD)</Text>
              <TextInput
                style={styles.textInputField}
                value={editDate}
                onChangeText={setEditDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#A88B7D"
              />
            </View>

            <View style={styles.inputCard}>
              <Text style={styles.inputFieldLabel}>Catatan</Text>
              <TextInput
                style={[styles.textInputField, styles.textArea]}
                value={editNote}
                onChangeText={setEditNote}
                placeholder="Catatan..."
                placeholderTextColor="#A88B7D"
                multiline
              />
            </View>

            <TouchableOpacity
              style={styles.saveChangeBtn}
              onPress={handleSaveEdit}
              activeOpacity={0.85}
            >
              <Feather name="check" size={18} color={colors.white} />
              <Text style={styles.saveChangeBtnText}>Simpan Perubahan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelChangeBtn}
              onPress={handleCancelEdit}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelChangeBtnText}>Batal Edit</Text>
            </TouchableOpacity>
          </View>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.headerBg,
  },
  headerIcon: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.white,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerActionBtn: {
    padding: 6,
    marginLeft: 6,
  },
  container: {
    flex: 1,
    backgroundColor: colors.contentBg,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ECD1B8",
    marginBottom: 18,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.deepPlum,
    textAlign: "center",
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F3E2D2",
    marginVertical: 14,
  },
  detailRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  detailLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 13,
    color: colors.magentaRose,
    marginLeft: 8,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.deepPlum,
    maxWidth: "55%",
    textAlign: "right",
  },
  monoText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  actionButtonGroup: {
    marginTop: 4,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blushCoral,
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: colors.blushCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.white,
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBg,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.expense,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.expense,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.contentBg,
  },
  errorText: {
    fontSize: 16,
    color: colors.deepPlum,
    fontWeight: "700",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.blushCoral,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.white,
    fontWeight: "700",
  },
  editForm: {
    paddingBottom: 20,
  },
  editTypeRow: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  editTypeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 12,
  },
  editTypeBtnExpense: {
    backgroundColor: colors.blushCoral,
  },
  editTypeBtnIncome: {
    backgroundColor: colors.income,
  },
  editTypeBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.deepPlum,
  },
  editTypeBtnTextActive: {
    color: colors.white,
  },
  inputCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECD1B8",
    elevation: 2,
  },
  inputFieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.magentaRose,
    marginBottom: 6,
  },
  amountInput: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.deepPlum,
    paddingVertical: 4,
  },
  textInputField: {
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: "600",
    paddingVertical: 4,
  },
  textArea: {
    minHeight: 50,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -3,
  },
  chipItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#E2BFA2",
    margin: 3,
  },
  chipItemSelected: {
    backgroundColor: colors.deepPlum,
    borderColor: colors.deepPlum,
  },
  chipItemText: {
    fontSize: 11,
    color: colors.deepPlum,
    fontWeight: "600",
  },
  chipItemTextSelected: {
    color: colors.peachCream,
    fontWeight: "800",
  },
  saveChangeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blushCoral,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 6,
    elevation: 4,
  },
  saveChangeBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.white,
    marginLeft: 8,
  },
  cancelChangeBtn: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 6,
  },
  cancelChangeBtnText: {
    fontSize: 13,
    color: colors.deepPlum,
    fontWeight: "700",
  },
});

export default TransactionDetailScreen;
