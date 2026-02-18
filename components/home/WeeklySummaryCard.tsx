import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function WeeklySummaryCard() {
  const router = useRouter();
  const { isPremium } = usePets();

  if (isPremium) {
      return (
        <View style={styles.cardPremium}>
          <View style={styles.content}>
            <View style={styles.iconWrap}>
               <Ionicons name="stats-chart" size={24} color={BrandColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Weekly Summary Ready</Text>
              <Text style={styles.sub}>Your pet's health report for Feb 10 - Feb 16 is available.</Text>
            </View>
          </View>
          
          <View style={styles.actions}>
             <TouchableOpacity 
                style={styles.btnPrimary}
                onPress={() => router.push('/protocol/weekly-summary')}
             >
                <Text style={styles.btnPrimaryText}>View Full Summary</Text>
             </TouchableOpacity>
             <TouchableOpacity 
                style={styles.btnSecondary}
                onPress={() => router.push('/report/range')}
             >
                <Ionicons name="share-outline" size={16} color={BrandColors.primary} />
                <Text style={styles.btnSecondaryText}>Export</Text>
             </TouchableOpacity>
          </View>
        </View>
      );
  }

  // Free State
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconWrapLocked}>
            <Ionicons name="lock-closed" size={20} color="#94A3B8" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleLocked}>Weekly Summary Ready</Text>
          <Text style={styles.sub}>Get a complete breakdown of triggers and symptoms.</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.btnLocked}
        onPress={() => router.push('/premium/plans')}
      >
        <Text style={styles.btnLockedText}>Unlock Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardPremium: {
    backgroundColor: '#1E293B', // Could use a gradient background for premium
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapLocked: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  titleLocked: {
      fontSize: 16,
      fontWeight: '700',
      color: '#94A3B8',
      marginBottom: 2,
  },
  sub: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  actions: {
      flexDirection: 'row',
      gap: 12,
  },
  btnPrimary: {
      flex: 2,
      backgroundColor: BrandColors.primary,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
  },
  btnPrimaryText: {
      fontSize: 13,
      fontWeight: '700',
      color: BrandColors.background,
  },
  btnSecondary: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: 'rgba(45,212,191,0.1)',
      borderRadius: 10,
      paddingVertical: 10,
  },
  btnSecondaryText: {
      fontSize: 13,
      fontWeight: '600',
      color: BrandColors.primary,
  },
  btnLocked: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 4,
  },
  btnLockedText: {
      fontSize: 14,
      fontWeight: '600',
      color: BrandColors.primary,
  },
});
