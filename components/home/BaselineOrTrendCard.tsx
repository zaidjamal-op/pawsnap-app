import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function BaselineOrTrendCard() {
  const { checkIns, activePetId, getPet } = usePets();

  const activePet = activePetId ? getPet(activePetId) : null;
  const petName = activePet?.name || 'your pet';

  // Filter check-ins for active pet
  const petLogs = checkIns.filter(c => c.petId === activePetId);
  const logCount = petLogs.length;
  const BASELINE_TARGET = 7;
  const progress = Math.min(logCount / BASELINE_TARGET, 1);
  const daysRemaining = Math.max(BASELINE_TARGET - logCount, 0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[BrandColors.surface, '#0F1922']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Ionicons name="trending-up" size={20} color={BrandColors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Unlock Insights</Text>
          <Text style={styles.desc}>
            Log 7 days of data to reveal patterns in {petName}'s itch cycle.
          </Text>
          
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          
          <Text style={styles.label}>
            {logCount >= 7 ? 'BASELINE COMPLETE' : `${daysRemaining} DAYS REMAINING`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.6)',
    position: 'relative',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31,41,55,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: 'rgba(148,163,184,0.7)',
    marginBottom: 14,
    lineHeight: 18,
  },
  progressTrack: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(31,41,55,0.8)',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(107,114,128,0.6)',
    letterSpacing: 1.2,
  },
});
