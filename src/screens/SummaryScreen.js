import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../constants/colors";
import Header from "../components/Header";
import CategoryChart from "../components/CategoryChart";
import { useTransactions } from "../context/TransactionContext";
import { getCategoryIconInfo } from "../constants/categories";

export const SummaryScreen = ({ navigation }) => {
  const {
    totalIncome,
    totalExpense,
    balance,
    categoryStats,
    incomeCategoryStats,
    formatCurrency,
  } = useTransactions();

  const [activeTab, setActiveTab] = useState("expense");

  const currentStats =
    activeTab === "expense" ? categoryStats : incomeCategoryStats;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          subtitle="Info Analisis"
          title="Analisis Keuangan"
          onMenuPress={() => {}}
          onNotificationPress={() => navigation.navigate("Notification")}
        />

        <View style={styles.periodBanner}>
          <Feather name="calendar" size={14} color={colors.softPink} />
          <Text style={styles.periodText}>
            Periode Aktif: September - November 2026
          </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.recapContainer}>
            <View style={styles.recapCard}>
              <View style={styles.recapHeader}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.incomeBg },
                  ]}
                >
                  <Feather
                    name="arrow-down-left"
                    size={18}
                    color={colors.income}
                  />
                </View>
                <Text style={styles.recapLabel}>Pemasukan</Text>
              </View>
              <Text style={[styles.recapValue, { color: colors.income }]}>
                {formatCurrency(totalIncome)}
              </Text>
            </View>

            <View style={styles.recapCard}>
              <View style={styles.recapHeader}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.expenseBg },
                  ]}
                >
                  <Feather
                    name="arrow-up-right"
                    size={18}
                    color={colors.expense}
                  />
                </View>
                <Text style={styles.recapLabel}>Pengeluaran</Text>
              </View>
              <Text style={[styles.recapValue, { color: colors.expense }]}>
                {formatCurrency(totalExpense)}
              </Text>
            </View>
          </View>

          <View style={styles.netCashCard}>
            <View>
              <Text style={styles.netCashLabel}>
                Sisa Saldo Bersih (Net Balance)
              </Text>
              <Text style={styles.netCashValue}>{formatCurrency(balance)}</Text>
            </View>
            <View
              style={[
                styles.netCashBadge,
                {
                  backgroundColor:
                    balance >= 0 ? colors.incomeBg : colors.expenseBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.netCashBadgeText,
                  { color: balance >= 0 ? colors.income : colors.expense },
                ]}
              >
                {balance >= 0 ? "Surplus" : "Defisit"}
              </Text>
            </View>
          </View>

          <CategoryChart stats={categoryStats} />

          <View style={styles.tabToggleWrapper}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "expense" && styles.toggleButtonActive,
              ]}
              onPress={() => setActiveTab("expense")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === "expense" && styles.toggleTextActive,
                ]}
              >
                Alokasi Pengeluaran
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "income" && styles.toggleButtonActive,
              ]}
              onPress={() => setActiveTab("income")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === "income" && styles.toggleTextActive,
                ]}
              >
                Sumber Pemasukan
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>
              Rincian Kategori (
              {activeTab === "expense" ? "Pengeluaran" : "Pemasukan"})
            </Text>

            {currentStats.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  Belum ada data untuk kategori ini.
                </Text>
              </View>
            ) : (
              currentStats.map((item, index) => {
                const iconInfo = getCategoryIconInfo(item.category);
                const isHighlight = index === 0;

                return (
                  <View
                    key={item.category}
                    style={[
                      styles.categoryItemCard,
                      isHighlight
                        ? styles.highlightedItemCard
                        : styles.regularItemCard,
                    ]}
                  >
                    <View
                      style={[
                        styles.categoryIconWrap,
                        isHighlight
                          ? styles.highlightedIconWrap
                          : styles.regularIconWrap,
                      ]}
                    >
                      {iconInfo.family === "feather" ? (
                        <Feather
                          name={iconInfo.name}
                          size={20}
                          color={
                            isHighlight ? colors.peachCream : colors.deepPlum
                          }
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={iconInfo.name}
                          size={22}
                          color={
                            isHighlight ? colors.peachCream : colors.deepPlum
                          }
                        />
                      )}
                    </View>

                    <View style={styles.categoryInfo}>
                      <Text
                        style={[
                          styles.categoryName,
                          isHighlight ? styles.textWhite : styles.textDark,
                        ]}
                      >
                        {item.category}
                      </Text>
                      <Text
                        style={[
                          styles.categoryCount,
                          isHighlight
                            ? styles.textSoftPink
                            : styles.textSecondary,
                        ]}
                      >
                        {item.count} transaksi • {item.percentage}% dari total
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.categoryAmount,
                        isHighlight ? styles.textPeach : styles.textMagenta,
                      ]}
                    >
                      {formatCurrency(item.total)}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
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
    paddingBottom: 100,
  },
  periodBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.headerBg,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  periodText: {
    color: colors.softPink,
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "600",
  },
  body: {
    backgroundColor: colors.contentBg,
    paddingTop: 16,
  },
  recapContainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  recapCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    padding: 14,
    borderRadius: 18,
    marginHorizontal: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ECD1B8",
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  recapHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  recapLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.deepPlum,
  },
  recapValue: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 2,
  },
  netCashCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.cardBg,
    marginHorizontal: 18,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ECD1B8",
    elevation: 2,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  netCashLabel: {
    fontSize: 12,
    color: colors.magentaRose,
    fontWeight: "600",
  },
  netCashValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.deepPlum,
    marginTop: 2,
  },
  netCashBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  netCashBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  tabToggleWrapper: {
    flexDirection: "row",
    backgroundColor: colors.cardBg,
    marginHorizontal: 18,
    marginBottom: 16,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: colors.deepPlum,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.deepPlum,
  },
  toggleTextActive: {
    color: colors.white,
    fontWeight: "700",
  },
  categorySection: {
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.deepPlum,
    marginBottom: 12,
  },
  categoryItemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 3,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  highlightedItemCard: {
    backgroundColor: colors.deepPlum,
  },
  regularItemCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  highlightedIconWrap: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  regularIconWrap: {
    backgroundColor: colors.surface,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: "500",
  },
  categoryAmount: {
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },
  textWhite: {
    color: colors.white,
  },
  textDark: {
    color: colors.deepPlum,
  },
  textPeach: {
    color: colors.peachCream,
  },
  textMagenta: {
    color: colors.magentaRose,
  },
  textSoftPink: {
    color: colors.softPink,
  },
  textSecondary: {
    color: colors.magentaRose,
  },
  emptyCard: {
    padding: 24,
    alignItems: "center",
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "500",
  },
});

export default SummaryScreen;
