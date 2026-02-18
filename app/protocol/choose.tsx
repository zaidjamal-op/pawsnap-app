import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// ─── Protocol Types ───
const PROTOCOLS = [
  {
    id: 'elimination',
    title: 'Elimination diet support',
    subtitle: 'Track food triggers over 8 weeks',
    icon: 'restaurant' as const,
    premium: false,
  },
  {
    id: 'flea',
    title: 'Flea consistency',
    subtitle: 'Monitor treatment effectiveness',
    icon: 'shield' as const,
    premium: false,
  },
  {
    id: 'skin',
    title: 'Skin barrier routine',
    subtitle: 'Daily hydration and bathing logs',
    icon: 'water-drop' as const,
    premium: true,
  },
  {
    id: 'ear',
    title: 'Ear routine',
    subtitle: 'Track cleaning and medication',
    icon: 'healing' as const,
    premium: true,
  },
];

export default function ChooseProtocolScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Choose Protocol" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtitle */}
        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <Text style={styles.subtitle}>
            Select a tracking protocol tailored to your pet's needs. We'll guide you through specific daily observations.
          </Text>
        </Animated.View>

        {/* Protocol Cards */}
        {PROTOCOLS.map((protocol, index) => (
          <Animated.View
            key={protocol.id}
            entering={FadeInDown.delay(100 + index * 80).duration(500)}
          >
            <TouchableOpacity
              style={styles.protocolCard}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/protocol/customize', params: { title: protocol.title } })}
            >
              {/* Icon */}
              <View style={styles.protocolIconCircle}>
                <MaterialIcons name={protocol.icon} size={24} color={BrandColors.primary} />
              </View>

              {/* Text */}
              <View style={styles.protocolTextCol}>
                <View style={styles.protocolTitleRow}>
                  <Text style={styles.protocolTitle}>{protocol.title}</Text>
                  {protocol.premium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.protocolSubtitle}>{protocol.subtitle}</Text>
              </View>

              {/* Chevron */}
              {!protocol.premium && (
                <MaterialIcons name="chevron-right" size={24} color="#4B5563" />
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Marketing Card */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.marketingWrapper}>
          <LinearGradient
            colors={['rgba(55,65,81,1)', 'rgba(17,24,39,1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.marketingCard}
          >
            {/* Decorative glow */}
            <View style={styles.marketingGlow} />

            <Text style={styles.marketingTitle}>Not sure where to start?</Text>
            <Text style={styles.marketingDesc}>
              Take our 2-minute assessment to find the perfect protocol for your pet.
            </Text>
            <TouchableOpacity style={styles.assessmentBtn} activeOpacity={0.7}>
              <Text style={styles.assessmentBtnText}>Start Assessment</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 4 },

  /* Subtitle */
  subtitle: {
    fontSize: 14, color: '#9CA3AF', lineHeight: 22,
    marginBottom: 24,
  },

  /* Protocol Cards */
  protocolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  protocolIconCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 16,
  },
  protocolTextCol: { flex: 1 },
  protocolTitleRow: {
    flexDirection: 'row', alignItems: 'center',
    flexWrap: 'wrap', gap: 8, marginBottom: 4,
  },
  protocolTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  protocolSubtitle: { fontSize: 13, color: '#9CA3AF' },

  /* Premium Badge */
  premiumBadge: {
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOpacity: 0.3, shadowRadius: 6,
  },
  premiumBadgeText: {
    fontSize: 9, fontWeight: '800', color: BrandColors.background,
    letterSpacing: 0.8,
  },

  /* Marketing Card */
  marketingWrapper: { marginTop: 20 },
  marketingCard: {
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  marketingGlow: {
    position: 'absolute', bottom: -40, right: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: BrandColors.primary,
    opacity: 0.08,
  },
  marketingTitle: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  marketingDesc: { fontSize: 13, color: '#9CA3AF', lineHeight: 20, marginBottom: 18 },
  assessmentBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 999,
  },
  assessmentBtnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
});
