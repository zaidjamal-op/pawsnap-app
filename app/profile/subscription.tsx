import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock subscription data
const PLAN = {
  name: 'Pawsnap Premium',
  price: '$9.99',
  billing: 'Billed monthly',
  nextRenewal: 'Nov 24, 2023',
};

interface Benefit {
  title: string;
  subtitle: string;
}

const BENEFITS: Benefit[] = [
  { title: 'Ranked triggers', subtitle: 'Identify what makes them itch most' },
  { title: 'Vet-ready PDF reports', subtitle: 'Export history for your vet visits' },
  { title: '14-day protocols', subtitle: 'Unlimited guided health plans' },
];

export default function SubscriptionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Current Plan Card ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.planCard}>
          {/* Decorative glow */}
          <View style={styles.planGlow} />

          {/* Premium badge */}
          <View style={styles.premiumBadge}>
            <MaterialIcons name="verified" size={14} color={BrandColors.primary} />
            <Text style={styles.premiumBadgeText}>PAWSNAP PREMIUM</Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>{PLAN.price}</Text>
          <Text style={styles.billing}>{PLAN.billing}</Text>

          {/* Divider */}
          <View style={styles.planDivider} />

          {/* Renewal info */}
          <View style={styles.renewalRow}>
            <MaterialIcons name="event-repeat" size={16} color="#6B7280" />
            <Text style={styles.renewalText}>
              Next renewal: <Text style={styles.renewalDate}>{PLAN.nextRenewal}</Text>
            </Text>
          </View>
        </Animated.View>

        {/* ─── Benefits Section ─── */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>YOUR PREMIUM BENEFITS</Text>

          {BENEFITS.map((benefit, i) => (
            <Animated.View
              key={benefit.title}
              entering={FadeInDown.delay(200 + i * 80).duration(400)}
              style={styles.benefitCard}
            >
              <View style={styles.benefitCheck}>
                <MaterialIcons name="check" size={18} color={BrandColors.primary} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitSub}>{benefit.subtitle}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* ─── Actions ─── */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.actions}>
          <TouchableOpacity
            style={styles.manageBtn}
            activeOpacity={0.85}
            onPress={() => {
              // Opens App Store / Play Store subscription management
              if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/account/subscriptions');
              } else {
                Linking.openURL('https://play.google.com/store/account/subscriptions');
              }
            }}
          >
            <Text style={styles.manageBtnText}>Manage Subscription</Text>
            <MaterialIcons name="open-in-new" size={14} color={BrandColors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.restoreBtn} activeOpacity={0.7}>
            <Text style={styles.restoreBtnText}>Restore Purchases</Text>
          </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  /* ─── Plan Card ─── */
  planCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden', position: 'relative',
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
  },
  planGlow: {
    position: 'absolute', top: -40, right: -40,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: BrandColors.primary, opacity: 0.06,
  },
  premiumBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 6,
    backgroundColor: 'rgba(45,212,191,0.08)',
    borderRadius: 999, marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
  },
  premiumBadgeText: {
    fontSize: 11, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 1,
  },
  price: {
    fontSize: 42, fontWeight: '800', color: '#FFFFFF', marginBottom: 4,
  },
  billing: {
    fontSize: 14, color: '#6B7280', fontWeight: '500',
  },
  planDivider: {
    width: '100%', height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 20,
  },
  renewalRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  renewalText: { fontSize: 13, color: '#6B7280' },
  renewalDate: { color: '#D1D5DB', fontWeight: '600' },

  /* ─── Benefits ─── */
  benefitsSection: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 14, paddingLeft: 4,
  },
  benefitCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16, padding: 16,
    marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  benefitCheck: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(45,212,191,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  benefitContent: { flex: 1 },
  benefitTitle: { fontSize: 15, fontWeight: '600', color: '#F3F4F6' },
  benefitSub: { fontSize: 11, color: '#6B7280', marginTop: 3 },

  /* ─── Actions ─── */
  actions: { gap: 4 },
  manageBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: BrandColors.primary,
    backgroundColor: 'rgba(15,23,42,0.6)',
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12,
  },
  manageBtnText: { fontSize: 16, fontWeight: '700', color: BrandColors.primary },
  restoreBtn: {
    alignItems: 'center', paddingVertical: 14,
  },
  restoreBtnText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
});
