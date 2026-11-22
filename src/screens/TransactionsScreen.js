import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { formatCurrency } from "../context/TransactionContext";
import { getCategoryIconInfo } from "../constants/categories";

export const TransactionItem = ({ transaction, onPress }) => {
  const isIncome = transaction.type === "income";
  const iconInfo = getCategoryIconInfo(transaction.category);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: isIncome ? colors.incomeBg : colors.surface },
        ]}
      >
        {iconInfo.family === "feather" ? (
          <Feather
            name={iconInfo.name}
            size={20}
            color={isIncome ? colors.income : colors.primary}
          />
        ) : (
          <MaterialCommunityIcons
            name={iconInfo.name}
            size={22}
            color={isIncome ? colors.income : colors.primary}
          />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <View style={styles.subRow}>
          <Text style={styles.category}>{transaction.category}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? colors.income : colors.expense },
          ]}
        >
          {isIncome ? "+ " : "- "}
          {formatCurrency(transaction.amount)}
        </Text>
        <Feather name="chevron-right" size={16} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBg, // Kartu putih #FFFFFF
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.deepPlum, // #450920: teks utama di permukaan terang
    marginBottom: 4,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontSize: 12,
    color: colors.magentaRose, // #A53860: elemen sekunder
    fontWeight: "600",
  },
  dot: {
    marginHorizontal: 5,
    color: colors.textMuted,
    fontSize: 10,
  },
  date: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  amount: {
    fontSize: 13,
    fontWeight: "800",
    marginRight: 4,
  },
});

export default TransactionItem;
