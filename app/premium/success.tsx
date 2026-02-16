import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated as RNAnimated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceIn,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

const SUCCESS_GREEN = '#22C55E';

/* ── Sparkle particle component ── */
function Sparkle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
}) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 600 })
        ),
        -1,
        false
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withSpring(1.2, { damping: 4, stiffness: 120 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        false
      )
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: BrandColors.primary,
        },
        animStyle,
      ]}
    />
  );
}

/* ── Pulsing glow ring ── */
function PulseRing() {
  const pulseAnim = useRef(new RNAnimated.Value(0.8)).current;

  useEffect(() => {
    RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        RNAnimated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <RNAnimated.View
      style={[
        styles.pulseRing,
        { transform: [{ scale: pulseAnim }] },
      ]}
    />
  );
}

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Radial BG glow */}
      <View style={styles.bgRadial} />

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.dismissAll()}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={28} color="#94A3B8" />
      </TouchableOpacity>

      {/* ── Main Content ── */}
      <View style={styles.content}>
        {/* ── Success Hero ── */}
        <View style={styles.heroSection}>
          {/* Sparkles around the circle */}
          <Sparkle delay={200} x={-20} y={20} size={5} />
          <Sparkle delay={600} x={140} y={10} size={4} />
          <Sparkle delay={400} x={150} y={90} size={6} />
          <Sparkle delay={800} x={-15} y={100} size={4} />
          <Sparkle delay={1000} x={60} y={-15} size={5} />
          <Sparkle delay={300} x={100} y={135} size={3} />
          <Sparkle delay={700} x={30} y={140} size={4} />
          <Sparkle delay={500} x={-10} y={60} size={3} />

          {/* Pulsing glow */}
          <PulseRing />

          {/* Icon circle */}
          <Animated.View
            entering={BounceIn.delay(200).duration(800)}
            style={styles.iconCircle}
          >
            <Ionicons name="checkmark-circle" size={64} color={SUCCESS_GREEN} />
          </Animated.View>
        </View>

        {/* ── Typography ── */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(500)}
          style={styles.textSection}
        >
          <Text style={styles.title}>
            Welcome to{'\n'}
            <Text style={styles.titleHighlight}>Premium!</Text>
          </Text>
          <Animated.Text
            entering={FadeInUp.delay(700).duration(450)}
            style={styles.subtitle}
          >
            You now have full access to all Pawsnap features. Your pet's health
            history is ready for analysis.
          </Animated.Text>
        </Animated.View>

        {/* ── Feature Preview Card ── */}
        <Animated.View
          entering={FadeInDown.delay(900).duration(450)}
          style={styles.featureCard}
        >
          <View style={styles.featureIcon}>
            <Ionicons name="analytics" size={22} color={BrandColors.primary} />
          </View>
          <View style={styles.featureTextWrap}>
            <Text style={styles.featureTitle}>Analysis Ready</Text>
            <Text style={styles.featureSub}>AI-powered insights are active</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#475569" />
        </Animated.View>

        {/* ── Action Buttons ── */}
        <Animated.View
          entering={FadeInDown.delay(1100).duration(450)}
          style={styles.actionWrap}
        >
          <TouchableOpacity
            style={styles.dashboardBtn}
            activeOpacity={0.85}
            onPress={() => router.dismissAll()}
          >
            <Text style={styles.dashboardBtnText}>Continue to Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.receiptBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.receiptBtnText}>View Receipt</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ── Footer Decorative ── */}
      <Animated.View
        entering={FadeIn.delay(1400).duration(600)}
        style={styles.footerDecor}
      >
        <View style={styles.footerLine} />
        <Ionicons name="paw" size={14} color="#475569" />
        <View style={styles.footerLine} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  /* BG */
  bgRadial: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -250 }, { translateY: -250 }],
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(43,212,189,0.04)',
  },

  /* Close */
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 36,
    right: 24,
    zIndex: 20,
  },

  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },

  /* ── Hero ── */
  heroSection: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(34,197,94,0.08)',
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderWidth: 2,
    borderColor: 'rgba(34,197,94,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SUCCESS_GREEN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },

  /* ── Text ── */
  textSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  titleHighlight: {
    color: BrandColors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    marginTop: 16,
  },

  /* ── Feature Card ── */
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    padding: 20,
    borderRadius: 14,
    backgroundColor: 'rgba(17,24,39,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    marginBottom: 40,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTextWrap: { flex: 1 },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featureSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  /* ── Actions ── */
  actionWrap: {
    width: '100%',
    gap: 4,
  },
  dashboardBtn: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  dashboardBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
    letterSpacing: 0.3,
  },
  receiptBtn: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#94A3B8',
  },

  /* ── Footer ── */
  footerDecor: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 48 : 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.3,
  },
  footerLine: {
    height: 1,
    width: 32,
    backgroundColor: '#475569',
  },
});
