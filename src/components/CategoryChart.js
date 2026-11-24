import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const PALETTE_COLORS = [
  colors.deepPlum,
  colors.magentaRose,
  colors.blushCoral,
  colors.softPink,
  colors.peachCream,
];

export const CategoryChart = ({ stats = [] }) => {
  return (
    <View style={styles.card}>
      <View style={styles.chartRow}>
        <View style={styles.donutContainer}>
          <View style={styles.donutOuterRing}>
            <View style={styles.donutInnerRing}>
              <Text style={styles.donutCenterLabel}>Alokasi</Text>
              <Text style={styles.donutCenterSub}>Pengeluaran</Text>
            </View>
          </View>
        </View>

        <View style={styles.legendContainer}>
          {stats.slice(0, 5).map((item, index) => {
            const itemColor = PALETTE_COLORS[index % PALETTE_COLORS.length];
            return (
              <View key={item.category} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: itemColor }]} />
                <Text style={styles.legendText} numberOfLines={1}>
                  {item.category}
                </Text>
                <Text style={styles.legendPercentage}>{item.percentage}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.barsContainer}>
        {stats.slice(0, 4).map((item, index) => {
          const itemColor = PALETTE_COLORS[index % PALETTE_COLORS.length];
          return (
            <View key={`bar-${item.category}`} style={styles.barItem}>
              <View style={styles.barHeader}>
                <Text style={styles.barTitle}>{item.category}</Text>
                <Text style={styles.barValue}>{item.percentage}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${Math.max(item.percentage, 8)}%`,
                      backgroundColor: itemColor,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg, 
    borderRadius: 22,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 18,
    shadowColor: colors.deepPlum,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ECD1B8',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2DFD0',
  },
  donutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  donutOuterRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 14,
    borderColor: colors.blushCoral,
    borderTopColor: colors.deepPlum,
    borderRightColor: colors.magentaRose,
    borderBottomColor: colors.softPink,
    borderLeftColor: colors.peachCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInnerRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.deepPlum,
  },
  donutCenterSub: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 18,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 12,
    color: colors.deepPlum,
    fontWeight: '600',
  },
  legendPercentage: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.magentaRose,
  },
  barsContainer: {
    marginTop: 14,
  },
  barItem: {
    marginBottom: 10,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barTitle: {
    fontSize: 12,
    color: colors.deepPlum,
    fontWeight: '600',
  },
  barValue: {
    fontSize: 12,
    color: colors.magentaRose,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F5EAE1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default CategoryChart;
