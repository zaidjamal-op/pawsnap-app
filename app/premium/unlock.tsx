import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const HERO_H = SCREEN_H * 0.42;

interface Benefit {
  title: string;
  subtitle: string;
}

const BENEFITS: Benefit[] = [
  { title: 'Ranked trigger patterns', subtitle: 'Understand behavior with precise time lags' },
  { title: 'Unlimited history + photos', subtitle: 'Never lose a memory or a medical data point' },
  { title: 'Vet-ready PDF reports', subtitle: 'Export logs instantly for your next visit' },
  { title: '14-day health protocols', subtitle: "Custom wellness plans for your pet's needs" },
];

export default function UnlockPremiumScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── Hero Image ── */}
        <View style={styles.heroWrap}>
          <Image
            source={require('@/assets/images/premium-hero.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(11,15,20,0.4)', BrandColors.background]}
            locations={[0.15, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        {/* ── Close button (absolute, over hero) ── */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={22} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        {/* ── Content (overlaps hero bottom) ── */}
        <View style={styles.content}>
          {/* Badge + Title */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.titleSection}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>LIMITED TIME OFFER</Text>
            </View>
            <Text style={styles.title}>
              Unlock Pawsnap{'\n'}Premium
            </Text>
            <Text style={styles.subtitle}>
              The ultimate toolkit for proactive pet health
            </Text>
          </Animated.View>

          {/* Benefits */}
          <View style={styles.benefitsList}>
            {BENEFITS.map((b, i) => (
              <Animated.View
                key={b.title}
                entering={FadeInDown.delay(200 + i * 70).duration(350)}
                style={styles.benefitCard}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={BrandColors.primary}
                  style={{ marginTop: 2 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.benefitTitle}>{b.title}</Text>
                  <Text style={styles.benefitSub}>{b.subtitle}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* CTA Area */}
          <Animated.View entering={FadeInDown.delay(520).duration(400)} style={styles.ctaWrap}>
            <TouchableOpacity
              style={styles.trialBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/premium/plans')}
            >
              <Text style={styles.trialBtnText}>Start 7-day free trial</Text>
            </TouchableOpacity>

            <Text style={styles.priceNote}>
              THEN $9.99/MONTH OR $59.99/YEAR
            </Text>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.restoreLink}>Restore Purchases</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>

      {/* ── Sticky Footer Disclaimer ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Subscription renews automatically unless canceled in settings at least 24 hours before the end of the current period. Payment will be charged to your Account.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },

  /* ── Hero ── */
  heroWrap: {
    width: SCREEN_W,
    height: HERO_H,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.05 }],
  },

  /* ── Close ── */
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 34,
    right: 16,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ── Content ── */
  content: {
    paddingHorizontal: 24,
    marginTop: -48,
  },

  /* Title section */
  titleSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(45,212,191,0.1)',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.primary,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },

  /* Benefits */
  benefitsList: {
    gap: 14,
    marginBottom: 36,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  benefitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  benefitSub: {
    fontSize: 12,
    color: '#94A3B8',
  },

  /* CTA */
  ctaWrap: {
    alignItems: 'center',
  },
  trialBtn: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  trialBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: BrandColors.background,
    letterSpacing: 0.3,
  },
  priceNote: {
    fontSize: 9,
    fontWeight: '500',
    color: '#64748B',
    letterSpacing: 1.8,
    marginTop: 16,
  },
  restoreLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#CBD5E1',
    textDecorationLine: 'underline',
    marginTop: 16,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
    backgroundColor: BrandColors.background,
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 17,
  },
});
