import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { usePets } from '@/context/PetContext';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

// SVG Circle constants
const CIRCLE_SIZE = 240;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProtocolScreen() {
  const router = useRouter();
  const { activeProtocol } = usePets();
  
  // Derived state
  const isProtocolActive = !!activeProtocol;
  const currentDay = activeProtocol?.day || 1;
  const protocolDays = activeProtocol?.totalDays || 14;
  const progress = currentDay / protocolDays;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  // ────────────────────────────────────────────────
  // EMPTY STATE
  // ────────────────────────────────────────────────
  if (!isProtocolActive) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>14-Day Protocol</Text>
          <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7}>
            <MaterialIcons name="help-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Main Content — vertically centered */}
        <View style={styles.emptyContent}>
          {/* Hero Card */}
          <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.emptyHeroWrapper}>
            {/* Outer Glow Layers */}
            <View style={styles.emptyGlowOuter} />
            <View style={styles.emptyGlowInner} />

            <View style={styles.emptyHeroCard}>
              {/* Icon */}
              <View style={styles.emptyIconCircle}>
                <MaterialIcons name="medical-services" size={34} color={BrandColors.primary} />
              </View>

              <Text style={styles.emptyHeading}>
                Reduce variables.{'\n'}Learn faster.
              </Text>

              <Text style={styles.emptyDesc}>
                A structured 14-day routine helps isolate triggers and identify what truly works for your pet's comfort.
              </Text>

              {/* Steps Visualization */}
              <View style={styles.stepsRow}>
                {/* Start */}
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: BrandColors.primary }]} />
                  <Text style={styles.stepLabel}>START</Text>
                </View>

                <View style={styles.stepLine} />

                {/* Day 7 */}
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: '#4B5563' }]} />
                  <Text style={styles.stepLabel}>DAY 7</Text>
                </View>

                <View style={styles.stepLine} />

                {/* End */}
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: '#4B5563' }]} />
                  <Text style={styles.stepLabel}>END</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* CTA */}
          <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.emptyCTAWrapper}>
            <TouchableOpacity
              style={styles.startBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/protocol/choose')}
            >
              <MaterialIcons name="play-arrow" size={24} color={BrandColors.background} />
              <Text style={styles.startBtnText}>Start a protocol</Text>
            </TouchableOpacity>
            <Text style={styles.ctaSubtext}>Takes less than 2 minutes to set up</Text>
          </Animated.View>
        </View>
      </View>
    );
  }

  // ────────────────────────────────────────────────
  // ACTIVE STATE
  // ────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>14-Day Protocol</Text>
          <Text style={styles.headerSub}>Keep track of your pet's health</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
          <Ionicons name="notifications" size={22} color="#FFFFFF" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero: Progress Ring */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.activeHeroCard}>
          {/* Decorative glows */}
          {/* <View style={styles.activeGlowTop} />
          <View style={styles.activeGlowCenter} /> */}

          {/* Protocol Tag */}
          <View style={styles.protocolTag}>
            <MaterialIcons name="healing" size={14} color={BrandColors.primary} />
            <Text style={styles.protocolTagText}>{activeProtocol?.name?.toUpperCase() || 'PROTOCOL'}</Text>
          </View>

          {/* Circular Progress */}
          <View style={styles.ringContainer}>
            <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
              <Defs>
                <SvgGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor={BrandColors.primary} stopOpacity="1" />
                  <Stop offset="1" stopColor="#6EE7B7" stopOpacity="1" />
                </SvgGradient>
              </Defs>
              {/* Track */}
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="rgba(31,41,55,0.8)"
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
              />
              {/* Progress */}
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="url(#progressGrad)"
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
              />
            </Svg>
            {/* Inner Content */}
            <View style={styles.ringInner}>
              <Text style={styles.ringLabel}>Current Progress</Text>
              <Text style={styles.ringDay}>Day {currentDay}</Text>
              <Text style={styles.ringOf}>of {protocolDays}</Text>
            </View>
          </View>

          {/* Compliance */}
          <View style={styles.complianceRow}>
            <Text style={styles.complianceValue}>100% Compliance</Text>
            <Text style={styles.complianceDesc}>
              Great job! You're on track to{'\n'}complete the routine.
            </Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(250).duration(500)} style={styles.actionGroup}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => router.push('/protocol/checklist')}>
            <Text style={styles.primaryBtnText}>View Today's Checklist</Text>
            <MaterialIcons name="arrow-forward" size={20} color={BrandColors.background} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7} onPress={() => router.push('/protocol/weekly-summary')}>
            <MaterialIcons name="assessment" size={20} color="#9CA3AF" />
            <Text style={styles.secondaryBtnText}>Weekly Summary</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Tip Card */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.tipCard}>
          <View style={styles.tipIconCircle}>
            <MaterialIcons name="tips-and-updates" size={22} color={BrandColors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Dr. Smith's Tip</Text>
            <Text style={styles.tipDesc}>
              Remember to apply the ointment directly after the evening walk for maximum absorption.
            </Text>
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ────────────────────────────────────────────────
// STYLES
// ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* ─── Header ─── */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },

  helpBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  notifBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: BrandColors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  notifDot: {
    position: 'absolute', top: 11, right: 11,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: BrandColors.primary,
    borderWidth: 2, borderColor: BrandColors.border,
  },

  /* ─── Scroll ─── */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },

  /* ══════════════════════════════════════════════════
     EMPTY STATE
     ══════════════════════════════════════════════════ */
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 100,
  },
  emptyHeroWrapper: {
    width: '100%',
    maxWidth: 380,
    position: 'relative',
  },
  /* Two-layer glow for depth */
  emptyGlowOuter: {
    position: 'absolute',
    top: -8, left: -8, right: -8, bottom: -8,
    borderRadius: 32,
    backgroundColor: BrandColors.primary,
    opacity: 0.04,
  },
  emptyGlowInner: {
    position: 'absolute',
    top: -3, left: -3, right: -3, bottom: -3,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.12)',
    backgroundColor: 'transparent',
  },
  emptyHeroCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 24,
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  emptyIconCircle: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 28,
    // Subtle outer ring
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.08)',
  },
  emptyHeading: {
    fontSize: 24, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', lineHeight: 34, marginBottom: 14,
    letterSpacing: -0.3,
  },
  emptyDesc: {
    fontSize: 15, color: '#9CA3AF',
    textAlign: 'center', lineHeight: 23,
    marginBottom: 28, paddingHorizontal: 4,
  },

  /* Steps */
  stepsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    paddingVertical: 18, paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  stepItem: { alignItems: 'center', gap: 8 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  stepLabel: {
    fontSize: 9, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5,
  },
  stepLine: {
    flex: 1, height: 1,
    backgroundColor: 'rgba(75,85,99,0.4)',
    marginHorizontal: 10,
  },

  /* CTA */
  emptyCTAWrapper: { width: '100%', maxWidth: 380, marginTop: 52, alignItems: 'center' },
  startBtn: {
    width: '100%',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 16,
    elevation: 8,
  },
  startBtnText: { fontSize: 18, fontWeight: '800', color: BrandColors.background },
  ctaSubtext: { fontSize: 12, color: '#6B7280', marginTop: 18, letterSpacing: 0.2 },

  /* ══════════════════════════════════════════════════
     ACTIVE STATE
     ══════════════════════════════════════════════════ */
  activeHeroCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 28,
    elevation: 12,
  },
  activeGlowTop: {
    position: 'absolute',
    top: -60, left: '30%',
    width: 200, height: 200,
    borderRadius: 100,
    backgroundColor: BrandColors.primary,
    opacity: 0.06,
  },
  activeGlowCenter: {
    position: 'absolute',
    top: 40, left: '50%',
    marginLeft: -120,
    width: 240, height: 240,
    borderRadius: 120,
    backgroundColor: BrandColors.primary,
    opacity: 0.03,
  },

  /* Tag */
  protocolTag: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(31,41,55,0.6)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
  },
  protocolTagText: {
    fontSize: 11, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 1,
  },

  /* Ring */
  ringContainer: {
    width: CIRCLE_SIZE, height: CIRCLE_SIZE,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  ringInner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: { fontSize: 14, color: '#9CA3AF', fontWeight: '500', marginBottom: 2 },
  ringDay: { fontSize: 48, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  ringOf: { fontSize: 17, color: '#9CA3AF', fontWeight: '500', marginTop: -2 },

  /* Compliance */
  complianceRow: { alignItems: 'center', marginTop: 8 },
  complianceValue: {
    fontSize: 24, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: -0.3,
  },
  complianceDesc: {
    fontSize: 12, color: '#9CA3AF', textAlign: 'center',
    lineHeight: 18, marginTop: 6, maxWidth: 220,
  },

  /* Action Buttons */
  actionGroup: { gap: 12, marginTop: 20 },
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 14,
    elevation: 8,
  },
  primaryBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
  secondaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(31,41,55,0.5)',
    paddingVertical: 16, borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },

  /* Tip Card */
  tipCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  tipIconCircle: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  tipDesc: { fontSize: 13, color: '#9CA3AF', lineHeight: 20 },
});
