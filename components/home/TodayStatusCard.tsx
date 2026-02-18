import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function TodayStatusCard() {
  const router = useRouter();
  const { checkIns, activePetId } = usePets();

  // Check if check-in done today for active pet
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysCheckIn = checkIns.find(c => 
    c.petId === activePetId && c.date.startsWith(todayStr)
  );

  if (todaysCheckIn) {
    // Check-in LOGGED state
    return (
      <View style={styles.cardLogged}>
        <View style={styles.contentLogged}>
          <View>
            <View style={styles.loggedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.loggedBadgeText}>Check-in Complete</Text>
            </View>
            <Text style={styles.loggedTitle}>Great job!</Text>
            <Text style={styles.loggedSub}>Itch level recorded as {todaysCheckIn.itchLevel}/10.</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewBtn} 
            activeOpacity={0.8}
            onPress={() => router.push(`/checkin/daily?id=${todaysCheckIn.id}`)}
          >
            <Text style={styles.viewBtnText}>View</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Check-in NOT LOGGED state
  return (
    <View style={styles.statusCard}>
      <View style={styles.statusContent}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark-circle-outline" size={40} color="rgba(71,85,105,0.4)" />
        </View>
        <Text style={styles.statusTitle}>No check-in logged today</Text>
        <Text style={styles.statusDesc}>
          Track daily symptoms to build a comprehensive health profile.
        </Text>
        <TouchableOpacity 
          style={styles.logButton} 
          activeOpacity={0.85} 
          onPress={() => router.push('/checkin/daily')}
        >
          <Ionicons name="add" size={22} color={BrandColors.background} />
          <Text style={styles.logButtonText}>Log today's check-in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Empty State Styles
  statusCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 28,
    padding: 32,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${BrandColors.primary}12`,
  },
  statusContent: {
    alignItems: 'center',
    position: 'relative',
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,
    marginBottom: 24,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    width: '100%',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: BrandColors.background,
  },

  // Logged State Styles
  cardLogged: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // Green tint
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  contentLogged: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loggedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  loggedBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
    textTransform: 'uppercase',
  },
  loggedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  loggedSub: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  viewBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnText: {
    display: 'none', // Hide text, icon only for compact
  },
});
