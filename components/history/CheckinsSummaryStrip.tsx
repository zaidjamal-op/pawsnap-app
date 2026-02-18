import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';
import { Ionicons } from '@expo/vector-icons';

export default function CheckinsSummaryStrip() {
  const { isPremium, checkIns, activePetId } = usePets();

  // Filter check-ins for active pet
  const petCheckIns = checkIns.filter(c => c.petId === activePetId);

  // Helper to get stats for last N days
  const getStats = (days: number) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const recent = petCheckIns.filter(c => new Date(c.date) >= cutoff);
    const count = recent.length;
    
    // itch level avg
    const avgItch = count > 0 
      ? (recent.reduce((sum, c) => sum + c.itchLevel, 0) / count).toFixed(1) 
      : '-';

    // flare days (itch >= 7)
    const flares = recent.filter(c => c.itchLevel >= 7).length;

    return { count, avgItch, flares };
  };

  const stats = getStats(isPremium ? 30 : 7);
  const daysLabel = isPremium ? 'Last 30 Days' : 'Last 7 Days';

  return (
    <View style={styles.container}>
      {/* Label Row */}
      <View style={styles.headerRow}>
        <Text style={styles.periodLabel}>{daysLabel}</Text>
        {!isPremium && (
          <View style={styles.premiumTag}>
             <Ionicons name="lock-closed" size={10} color="#FBBF24" />
             <Text style={styles.premiumText}>Premium: 30d</Text>
          </View>
        )}
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.count}</Text>
          <Text style={styles.statLabel}>Logged</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#EF4444' }]}>{stats.flares}</Text>
          <Text style={styles.statLabel}>Flare Days</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: BrandColors.primary }]}>{stats.avgItch}</Text>
          <Text style={styles.statLabel}>Avg Itch</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.6)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  periodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  premiumTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FBBF24',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(71,85,105,0.4)',
  },
});
