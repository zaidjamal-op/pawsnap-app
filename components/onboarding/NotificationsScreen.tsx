import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
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
} from 'react-native-reanimated';

interface NotificationsScreenProps {
  onEnable: () => void;
  onSkip: () => void;
}

export default function NotificationsScreen({ onEnable, onSkip }: NotificationsScreenProps) {
  return (
    <View style={styles.container}>
      {/* Ambient glow */}
      <View style={styles.ambientGlow} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Illustration */}
        <Animated.View
          entering={FadeIn.delay(200).duration(600)}
          style={styles.illustrationArea}
        >
          {/* Background circle */}
          <View style={styles.illustrationGlow} />

          {/* Bottom stacked card */}
          <View style={[styles.glassCard, styles.stackBottom]} />
          {/* Middle stacked card */}
          <View style={[styles.glassCard, styles.stackMiddle]} />

          {/* Top notification card */}
          <View style={[styles.glassCard, styles.stackTop]}>
            <View style={styles.notifContent}>
              {/* Icon */}
              <View style={styles.notifIconCircle}>
                <Ionicons name="paw" size={22} color={BrandColors.primary} />
              </View>
              {/* Skeleton lines */}
              <View style={styles.notifLines}>
                <View style={[styles.skeletonLine, { width: '40%', height: 10, backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                <View style={[styles.skeletonLine, { width: '75%' }]} />
                <View style={[styles.skeletonLine, { width: '50%' }]} />
              </View>
              {/* Check circle */}
              <View style={styles.notifCheck}>
                <Ionicons name="checkmark" size={16} color={BrandColors.background} />
              </View>
            </View>

            {/* Daily check-in badge */}
            <View style={styles.dailyBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.dailyText}>Daily check-in</Text>
            </View>
          </View>
        </Animated.View>

        {/* Text */}
        <Animated.View entering={FadeInUp.delay(500).duration(500).springify()} style={styles.textBlock}>
          <Text style={styles.title}>
            Never miss a <Text style={styles.titleAccent}>check-in</Text>
          </Text>
          <Text style={styles.description}>
            Get daily reminders to track itch levels and a summary every Sunday.
          </Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(700).duration(500)}
        style={styles.footer}
      >
        <TouchableOpacity style={styles.enableButton} onPress={onEnable} activeOpacity={0.85}>
          <Ionicons name="notifications" size={20} color={BrandColors.background} />
          <Text style={styles.enableText}>Enable notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Not now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  ambientGlow: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${BrandColors.primary}12`,
    transform: [{ scale: 1.5 }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  // Illustration
  illustrationArea: {
    width: 300,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  illustrationGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: `${BrandColors.primary}08`,
  },

  // Glass cards
  glassCard: {
    position: 'absolute',
    width: '90%',
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  stackBottom: {
    height: 80,
    transform: [{ scale: 0.85 }, { translateY: 20 }],
    opacity: 0.4,
  },
  stackMiddle: {
    height: 80,
    transform: [{ scale: 0.92 }, { translateY: 10 }],
    opacity: 0.6,
  },
  stackTop: {
    width: '100%',
    padding: 18,
    backgroundColor: 'rgba(26,35,41,0.9)',
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 16,
    overflow: 'visible',
  },
  notifContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  notifIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${BrandColors.primary}25`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifLines: {
    flex: 1,
    paddingTop: 4,
    gap: 8,
  },
  skeletonLine: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  notifCheck: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  dailyBadge: {
    position: 'absolute',
    right: -12,
    bottom: -16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: BrandColors.primary,
  },
  dailyText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(209,213,219,0.8)',
  },

  // Text
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  titleAccent: {
    color: BrandColors.primary,
  },
  description: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(156,163,175,0.9)',
    textAlign: 'center',
    lineHeight: 26,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    alignItems: 'center',
    gap: 16,
  },
  enableButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  enableText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(107,114,128,0.8)',
    letterSpacing: 0.3,
  },
});
