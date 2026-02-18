import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';
import { CheckIn } from '@/context/PetContext';
import CheckinListItem from './CheckinListItem';
import { Ionicons } from '@expo/vector-icons';

interface CheckinsListProps {
  checkIns: CheckIn[];
  isPremium: boolean;
}

export default function CheckinsList({ checkIns, isPremium }: CheckinsListProps) {
  const router = useRouter();

  // Sort by date desc
  const sorted = [...checkIns].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Free retention logic: Show only last 30 days? Or show all but gate older ones?
  // Let's implement gating: Render all, but blur/lock older ones if !isPremium
  // For now, based on requirements: "Free: Full list but limited retention" -> Let's show last 7 items fully, then a lock card? 
  // Requirement says "older history is locked".

  const FREE_LIMIT_DAYS = 30;
  
  const visibleCheckIns = React.useMemo(() => {
    if (isPremium) return sorted;
    
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - FREE_LIMIT_DAYS);
    return sorted.filter(c => new Date(c.date) >= cutoff);
  }, [sorted, isPremium]);

  const hasLockedHistory = !isPremium && sorted.length > visibleCheckIns.length;
  const lockedCount = sorted.length - visibleCheckIns.length;

  if (sorted.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="clipboard-outline" size={48} color="rgba(148,163,184,0.3)" />
        <Text style={styles.emptyTitle}>No check-ins yet</Text>
        <Text style={styles.emptyText}>Log your pet's first symptom check-in to start tracking.</Text>
        <TouchableOpacity 
          style={styles.logBtn}
          onPress={() => router.push('/checkin/daily')}
        >
          <Text style={styles.logBtnText}>Log Check-in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {visibleCheckIns.map(item => (
        <CheckinListItem key={item.id} checkIn={item} />
      ))}

      {hasLockedHistory && (
        <TouchableOpacity 
          style={styles.lockedCard}
          onPress={() => router.push('/premium/unlock')}
        >
           <View style={styles.lockIconCircle}>
             <Ionicons name="lock-closed" size={20} color="#FBBF24" />
           </View>
           <View style={styles.lockContent}>
             <Text style={styles.lockTitle}>{lockedCount} Older Check-ins Locked</Text>
             <Text style={styles.lockDesc}>Upgrade to Premium to view full history and export reports.</Text>
           </View>
           <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 24,
  },
  logBtn: {
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logBtnText: {
    color: BrandColors.background,
    fontWeight: '700',
  },
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderStyle: 'dashed',
  },
  lockIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lockContent: {
    flex: 1,
  },
  lockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FBBF24',
    marginBottom: 2,
  },
  lockDesc: {
    fontSize: 12,
    color: '#94A3B8',
  },
});
