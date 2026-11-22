import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

export const CategoryCard = ({
  title,
  iconName,
  iconFamily = "MaterialCommunityIcons",
  isHighlighted = false,
  amount,
  onPress,
}) => {
  const iconColor = isHighlighted ? colors.peachCream : colors.deepPlum;

  const renderIcon = () => {
    const size = 30;
    if (iconFamily === "Ionicons") {
      return <Ionicons name={iconName} size={size} color={iconColor} />;
    }
    if (iconFamily === "Feather") {
      return <Feather name={iconName} size={size} color={iconColor} />;
    }
    return (
      <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isHighlighted ? styles.highlightedCard : styles.lightCard,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrapper}>{renderIcon()}</View>
      <Text
        style={[
          styles.title,
          isHighlighted ? styles.highlightedTitle : styles.lightTitle,
        ]}
      >
        {title}
      </Text>
      {amount && (
        <Text
          style={[
            styles.amount,
            isHighlighted ? styles.highlightedAmount : styles.lightAmount,
          ]}
        >
          {amount}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 115,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lightCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#ECD1B8",
  },
  highlightedCard: {
    backgroundColor: colors.deepPlum,
  },
  iconWrapper: {
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  lightTitle: {
    color: colors.deepPlum,
  },
  highlightedTitle: {
    color: colors.peachCream,
  },
  amount: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "700",
  },
  lightAmount: {
    color: colors.magentaRose,
  },
  highlightedAmount: {
    color: colors.softPink,
  },
});

export default CategoryCard;
