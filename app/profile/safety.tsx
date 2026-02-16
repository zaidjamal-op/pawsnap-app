import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface RedFlag {
  icon: string;
  title: string;
  description: string;
}

const EMERGENCY_FLAGS: RedFlag[] = [
  { icon: 'air', title: 'Trouble Breathing', description: 'Panting heavily, gasping, or blue gums.' },
  { icon: 'bloodtype', title: 'Severe Bleeding', description: "Bleeding that doesn't stop after 5 mins of pressure." },
  { icon: 'bolt', title: 'Seizures', description: 'Uncontrolled shaking or loss of consciousness.' },
  { icon: 'healing', title: 'Sudden Swelling', description: 'Especially around the face, eyes, or throat.' },
];

export default function SafetyGuidanceScreen() {
  const router = useRouter();

  const handleFindVet = () => {
    // Try to open maps with a vet search
    const query = encodeURIComponent('veterinary clinic near me');
    const url = Platform.OS === 'ios'
      ? `maps:?q=${query}`
      : `geo:0,0?q=${query}`;
    Linking.openURL(url).catch(() => {
      // Fallback to Google Maps web
      Linking.openURL(`https://www.google.com/maps/search/${query}`);
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Guidance</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Emergency Alert Card ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.emergencyCard}>
          {/* Red glow */}
          <View style={styles.dangerGlow} />

          {/* Header */}
          <View style={styles.emergencyHeader}>
            <View style={styles.dangerPulse}>
              <MaterialIcons name="gpp-maybe" size={24} color="#EF4444" />
            </View>
            <View>
              <Text style={styles.emergencyTitle}>Seek Emergency Care If...</Text>
              <Text style={styles.emergencyLabel}>IMMEDIATE ACTION REQUIRED</Text>
            </View>
          </View>

          {/* Red Flags List */}
          <View style={styles.flagsList}>
            {EMERGENCY_FLAGS.map((flag, i) => (
              <View key={flag.title} style={styles.flagRow}>
                <MaterialIcons name={flag.icon as any} size={22} color="#EF4444" />
                <View style={styles.flagContent}>
                  <Text style={styles.flagTitle}>{flag.title}</Text>
                  <Text style={styles.flagDesc}>{flag.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom strip */}
          <View style={styles.emergencyStrip}>
            <Text style={styles.emergencyStripText}>Do not wait. Go to the nearest clinic.</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#EF4444" />
          </View>
        </Animated.View>

        {/* ─── Vet Contact Card ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.vetCard}>
          <View style={styles.vetRow}>
            <View style={styles.vetIconWrap}>
              <MaterialIcons name="medical-services" size={22} color={BrandColors.primary} />
            </View>
            <View style={styles.vetContent}>
              <Text style={styles.vetTitle}>Contact Your Veterinarian</Text>
              <Text style={styles.vetDesc}>
                For persistent itching, hair loss, or redness that isn't life-threatening, schedule a standard appointment. It's important, but not an emergency.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ─── Find Nearest Vet CTA ─── */}
        <Animated.View entering={FadeInDown.delay(320).duration(400)}>
          <TouchableOpacity style={styles.ctaOuter} activeOpacity={0.85} onPress={handleFindVet}>
            <View style={styles.ctaInner}>
              <MaterialIcons name="near-me" size={22} color={BrandColors.primary} />
              <Text style={styles.ctaText}>Find Nearest Vet</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Disclaimer */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <Text style={styles.disclaimer}>
            Pawsnap provides guidance only. Always trust your instincts if you feel your pet is in danger.
          </Text>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16, paddingBottom: 12,
  },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },

  /* ─── Emergency Card ─── */
  emergencyCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 18, overflow: 'hidden',
    marginBottom: 16, position: 'relative',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 6,
  },
  dangerGlow: {
    position: 'absolute', top: -30, right: -30,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#EF4444', opacity: 0.06,
  },
  emergencyHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 20, paddingBottom: 16,
  },
  dangerPulse: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(239,68,68,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  emergencyTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  emergencyLabel: {
    fontSize: 10, fontWeight: '700', color: '#EF4444',
    letterSpacing: 1, marginTop: 2,
  },

  /* Flags */
  flagsList: { paddingHorizontal: 16, gap: 8, paddingBottom: 12 },
  flagRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: 'rgba(11,15,20,0.5)',
    borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  flagContent: { flex: 1 },
  flagTitle: { fontSize: 14, fontWeight: '600', color: '#D1D5DB' },
  flagDesc: { fontSize: 11, color: '#6B7280', marginTop: 3, lineHeight: 16 },

  /* Emergency strip */
  emergencyStrip: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(239,68,68,0.06)',
    paddingHorizontal: 20, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: 'rgba(239,68,68,0.12)',
  },
  emergencyStripText: { fontSize: 12, fontWeight: '500', color: '#EF4444' },

  /* ─── Vet Card ─── */
  vetCard: {
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderRadius: 18, padding: 20,
    marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  vetRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  vetIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  vetContent: { flex: 1 },
  vetTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  vetDesc: { fontSize: 13, color: '#6B7280', lineHeight: 20 },

  /* ─── CTA ─── */
  ctaOuter: {
    borderRadius: 14, padding: 1.5,
    marginBottom: 16, overflow: 'hidden',
    borderWidth: 1.5, borderColor: BrandColors.primary,
  },
  ctaInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderRadius: 12, paddingVertical: 16,
  },
  ctaText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },

  /* Disclaimer */
  disclaimer: {
    fontSize: 12, color: '#6B7280', textAlign: 'center',
    lineHeight: 18, paddingHorizontal: 20,
  },
});
