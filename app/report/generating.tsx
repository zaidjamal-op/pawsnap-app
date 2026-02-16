import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

export default function GeneratingReportScreen() {
  const router = useRouter();
  const spinAnim = useRef(new RNAnimated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Spin animation
    const spin = RNAnimated.loop(
      RNAnimated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 600);

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
  const photosSynced = progress >= 30;
  const analyzingTrends = progress >= 50;
  const isComplete = progress >= 100;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        router.replace('/report/preview');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <View style={styles.container}>
      {/* BG Glows */}
      <View style={styles.bgGlowTL} />
      <View style={styles.bgGlowBR} />

      <View style={styles.content}>
        {/* Main Card */}
        <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.card}>
          {/* Spinner */}
          <View style={styles.spinnerWrap}>
            <RNAnimated.View style={[styles.spinnerRing, { transform: [{ rotate: spinInterpolation }] }]} />
            <View style={styles.spinnerIcon}>
              <MaterialIcons name="medical-services" size={30} color={BrandColors.primary} />
            </View>
          </View>

          {/* Status text */}
          <Text style={styles.statusTitle}>
            {isComplete ? 'Report ready!' : 'Generating your vet-ready report...'}
          </Text>
          <Text style={styles.statusDesc}>
            {isComplete
              ? 'Your report has been compiled successfully.'
              : 'Compiling photos, trends, and protocol data. This may take a moment.'}
          </Text>

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>PROCESSING DATA</Text>
              <Text style={styles.progressPercent}>{displayProgress}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${displayProgress}%` }]} />
            </View>
          </View>

          {/* Status badges */}
          <View style={styles.badgesRow}>
            <View style={[styles.badge, photosSynced ? styles.badgeActive : styles.badgeInactive]}>
              <Ionicons
                name={photosSynced ? 'checkmark-circle' : 'sync'}
                size={13}
                color={photosSynced ? BrandColors.primary : 'rgba(255,255,255,0.4)'}
              />
              <Text style={[styles.badgeText, photosSynced && styles.badgeTextActive]}>
                PHOTOS SYNCED
              </Text>
            </View>
            <View style={[styles.badge, analyzingTrends ? styles.badgeActive : styles.badgeInactive]}>
              <Ionicons
                name={analyzingTrends ? 'checkmark-circle' : 'sync'}
                size={13}
                color={analyzingTrends ? BrandColors.primary : 'rgba(255,255,255,0.4)'}
              />
              <Text style={[styles.badgeText, analyzingTrends && styles.badgeTextActive]}>
                ANALYZING TRENDS
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Cancel */}
        {!isComplete && (
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.dismissAll()} activeOpacity={0.7}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        )}

        {/* Step dots */}
        <View style={styles.dotsRow}>
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: BrandColors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  bgGlowTL: {
    position: 'absolute', top: '-10%', left: '-10%',
    width: '40%', height: '40%', borderRadius: 999,
    backgroundColor: 'rgba(45,212,191,0.03)',
  },
  bgGlowBR: {
    position: 'absolute', bottom: '-10%', right: '-10%',
    width: '40%', height: '40%', borderRadius: 999,
    backgroundColor: 'rgba(45,212,191,0.03)',
  },

  content: { width: '100%', paddingHorizontal: 24, alignItems: 'center' },

  /* Card */
  card: {
    width: '100%',
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 36,
    alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3, shadowRadius: 24,
  },

  /* Spinner */
  spinnerWrap: {
    width: 80, height: 80,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24, position: 'relative',
  },
  spinnerRing: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 4, borderColor: 'rgba(45,212,191,0.1)',
    borderTopColor: BrandColors.primary,
    position: 'absolute',
  },
  spinnerIcon: {
    justifyContent: 'center', alignItems: 'center',
  },

  /* Status */
  statusTitle: {
    fontSize: 22, fontWeight: '700', color: '#FFFFFF',
    textAlign: 'center', marginBottom: 10,
  },
  statusDesc: {
    fontSize: 14, color: 'rgba(255,255,255,0.6)',
    textAlign: 'center', lineHeight: 20, maxWidth: 260,
    marginBottom: 28,
  },

  /* Progress */
  progressSection: { width: '100%' },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 1.2,
  },
  progressPercent: { fontSize: 12, fontWeight: '700', color: BrandColors.primary },
  progressTrack: {
    width: '100%', height: 5, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden',
  },
  progressFill: {
    height: '100%', borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },

  /* Badges */
  badgesRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 8, marginTop: 24,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
  },
  badgeActive: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
  },
  badgeInactive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  badgeText: {
    fontSize: 10, fontWeight: '700',
    color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5,
  },
  badgeTextActive: { color: BrandColors.primary },

  /* Cancel */
  cancelBtn: { marginTop: 40, paddingVertical: 12, paddingHorizontal: 32 },
  cancelText: {
    fontSize: 13, fontWeight: '700',
    color: 'rgba(255,255,255,0.3)', letterSpacing: 2,
  },

  /* Dots */
  dotsRow: {
    flexDirection: 'row', gap: 8, marginTop: 32,
    position: 'absolute', bottom: -(Platform.OS === 'ios' ? 80 : 60),
  },
  dotInactive: {
    width: 32, height: 4, borderRadius: 2,
    backgroundColor: 'rgba(45,212,191,0.15)',
  },
  dotActive: {
    width: 48, height: 4, borderRadius: 2,
    backgroundColor: BrandColors.primary,
  },
});
