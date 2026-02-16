import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated as RNAnimated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

export default function ProcessingScreen() {
  const router = useRouter();
  const spinAnim = useRef(new RNAnimated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const spin = RNAnimated.loop(
      RNAnimated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 6) + 3;
      });
    }, 500);

    return () => {
      spin.stop();
      clearInterval(interval);
    };
  }, []);

  const spinInterpolation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const displayProgress = Math.min(progress, 100);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        router.replace('/premium/success');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      {/* Center glow */}
      <View style={styles.bgGlow} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Ionicons name="paw" size={22} color={BrandColors.primary} />
          <Text style={styles.brandText}>Pawsnap</Text>
        </View>
        <TouchableOpacity onPress={() => router.dismissAll()} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="rgba(255,255,255,0.4)" />
        </TouchableOpacity>
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* Spinner */}
        <Animated.View entering={FadeIn.duration(600)} style={styles.spinnerWrap}>
          <RNAnimated.View style={[styles.spinnerRing, { transform: [{ rotate: spinInterpolation }] }]} />
          <View style={styles.spinnerTrack} />
          <View style={styles.spinnerIconWrap}>
            <Ionicons name="sync" size={32} color="rgba(45,212,191,0.4)" />
          </View>
        </Animated.View>

        {/* Text */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.textWrap}>
          <Text style={styles.processingTitle}>Processing...</Text>
          <Text style={styles.processingDesc}>
            Securely completing your transaction.
          </Text>
        </Animated.View>

        {/* Receipt card placeholder */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.receiptCard}>
          <View style={styles.receiptIcon}>
            <Ionicons name="receipt-outline" size={20} color={BrandColors.primary} />
          </View>
          <View style={styles.receiptLines}>
            <View style={styles.receiptLine1} />
            <View style={styles.receiptLine2} />
          </View>
          <View style={styles.receiptRight}>
            <View style={styles.receiptLine3} />
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Encryption Active</Text>
            <Text style={styles.progressPercent}>{displayProgress}% Complete</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${displayProgress}%` }]} />
          </View>
        </View>

        {/* Security badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="shield-checkmark" size={16} color="rgba(255,255,255,0.4)" />
          <Text style={styles.securityText}>Encrypted Connection</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  bgGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: [{ translateX: -200 }, { translateY: -200 }],
    width: 400, height: 400, borderRadius: 200,
    backgroundColor: 'rgba(45,212,191,0.03)',
  },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24, paddingBottom: 16,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },

  /* Main */
  main: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 24,
  },

  /* Spinner */
  spinnerWrap: {
    width: 120, height: 120, marginBottom: 40,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  spinnerTrack: {
    position: 'absolute', width: 120, height: 120,
    borderRadius: 60, borderWidth: 8,
    borderColor: 'rgba(45,212,191,0.1)',
  },
  spinnerRing: {
    position: 'absolute', width: 120, height: 120,
    borderRadius: 60, borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: BrandColors.primary,
  },
  spinnerIconWrap: { justifyContent: 'center', alignItems: 'center' },

  /* Text */
  textWrap: { alignItems: 'center', marginBottom: 40 },
  processingTitle: {
    fontSize: 28, fontWeight: '700', color: BrandColors.primary,
    marginBottom: 12,
  },
  processingDesc: {
    fontSize: 17, color: 'rgba(255,255,255,0.6)',
    textAlign: 'center', lineHeight: 24,
  },

  /* Receipt */
  receiptCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    width: '80%', padding: 16, borderRadius: 14,
    backgroundColor: 'rgba(26,36,34,0.4)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  receiptIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  receiptLines: { flex: 1, gap: 6 },
  receiptLine1: {
    height: 8, width: 96, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  receiptLine2: {
    height: 8, width: 64, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  receiptRight: { alignItems: 'flex-end' },
  receiptLine3: {
    height: 8, width: 48, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  /* Footer */
  footer: {
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 48 : 32,
    alignItems: 'center',
  },
  progressSection: { width: '100%', marginBottom: 20 },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.35)',
  },
  progressPercent: {
    fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.35)',
  },
  progressTrack: {
    width: '100%', height: 5, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden',
  },
  progressFill: {
    height: '100%', borderRadius: 3, backgroundColor: BrandColors.primary,
  },

  securityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  securityText: {
    fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.35)',
  },
});
