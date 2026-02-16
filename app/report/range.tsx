import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface RangeOption {
  icon: string;
  title: string;
  subtitle: string;
}

const RANGES: RangeOption[] = [
  { icon: 'view-week', title: 'Last 14 Days', subtitle: 'Quick 2-week health summary' },
  { icon: 'calendar-month', title: 'Last 30 Days', subtitle: 'Monthly comprehensive overview' },
  { icon: 'date-range', title: 'Custom Range', subtitle: 'Pick specific start and end dates' },
];

export default function ReportRangeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('Last 14 Days');

  const handleContinue = () => {
    router.push({
      pathname: '/report/details',
      params: { range: selected },
    });
  };

  return (
    <View style={styles.container}>
      {/* Decorative glow */}
      <View style={styles.bgGlow} />

      {/* Header */}
      <ScreenHeader title="REPORT WIZARD" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.heroSection}>
          <Text style={styles.heroTitle}>Select Report Range</Text>
          <Text style={styles.heroDesc}>
            Choose the timeframe for your pet's health report. We'll compile all vitals and activity logs.
          </Text>
        </Animated.View>

        {/* Radio Cards */}
        <View style={styles.cardsWrap}>
          {RANGES.map((range, i) => {
            const active = selected === range.title;
            return (
              <Animated.View
                key={range.title}
                entering={FadeInDown.delay(140 + i * 80).duration(400)}
              >
                <TouchableOpacity
                  style={[styles.card, active && styles.cardActive]}
                  onPress={() => setSelected(range.title)}
                  activeOpacity={0.7}
                >
                  {active && <View style={styles.cardActiveFill} />}
                  <View style={styles.cardIconCircle}>
                    <MaterialIcons name={range.icon as any} size={28} color={BrandColors.primary} />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text style={styles.cardTitle}>{range.title}</Text>
                    <Text style={styles.cardSub}>{range.subtitle}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Info box */}
        <Animated.View entering={FadeInDown.delay(420).duration(400)} style={styles.infoBox}>
          <Ionicons name="information-circle" size={18} color={BrandColors.primary} />
          <Text style={styles.infoText}>
            The report will include activity levels, heart rate data, and dietary notes for the selected period.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  bgGlow: {
    position: 'absolute', top: -60, right: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: `${BrandColors.primary}0A`,
  },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16, paddingBottom: 16,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: BrandColors.surface,
    borderWidth: 1, borderColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerLabel: {
    fontSize: 12, fontWeight: '700', color: `${BrandColors.primary}CC`,
    letterSpacing: 2,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16 },

  /* Hero */
  heroSection: { marginBottom: 28 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 10, letterSpacing: -0.3 },
  heroDesc: { fontSize: 15, color: '#94A3B8', lineHeight: 22 },

  /* Cards */
  cardsWrap: { gap: 14 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    padding: 18, borderRadius: 18,
    backgroundColor: BrandColors.surface,
    borderWidth: 2, borderColor: 'transparent',
    position: 'relative', overflow: 'hidden',
  },
  cardActive: {
    borderColor: BrandColors.primary,
  },
  cardActiveFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,212,191,0.04)',
  },
  cardIconCircle: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  cardTextWrap: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  cardSub: { fontSize: 13, color: '#6B7280' },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#4B5563',
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 12,
  },
  radioActive: { borderColor: BrandColors.primary, backgroundColor: BrandColors.primary },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' },

  /* Info */
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    marginTop: 32, padding: 16, borderRadius: 16,
    backgroundColor: 'rgba(45,212,191,0.04)',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.1)',
  },
  infoText: { fontSize: 13, color: '#CBD5E1', lineHeight: 19, flex: 1 },

  /* Footer */
  footer: {
    paddingHorizontal: 24, paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  continueBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    alignItems: 'center',
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  continueBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
});
