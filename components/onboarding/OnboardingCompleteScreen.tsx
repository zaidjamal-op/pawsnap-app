import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
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

interface OnboardingCompleteScreenProps {
  petName?: string;
  onGoHome: () => void;
}

export default function OnboardingCompleteScreen({
  petName = 'your pet',
  onGoHome,
}: OnboardingCompleteScreenProps) {
  return (
    <View style={styles.container}>
      {/* Decorative glows */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* Spacer */}
      <View style={{ flex: 0.15 }} />

      {/* Main content */}
      <View style={styles.content}>
        {/* Success icon */}
        <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.iconArea}>
          {/* Outer glow ring */}
          <View style={styles.glowRing} />
          {/* Icon container */}
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <ExpoImage
                                source={require('@/assets/images/pawsnap-logo.svg')}
                                style={{ width: 50, height: 50 }}
                                contentFit="contain"
                                tintColor={BrandColors.background}
                              />
            </View>
          </View>
          {/* Confetti dots */}
          <View style={styles.confetti1} />
          <View style={styles.confetti2} />
        </Animated.View>

        {/* Text */}
        <Animated.View
          entering={FadeInUp.delay(500).duration(500).springify()}
          style={styles.textBlock}
        >
          <Text style={styles.title}>All set!</Text>
          <Text style={styles.description}>
            You're ready to start tracking.{'\n'}Your first log will help establish{' '}
            <Text style={styles.petName}>{petName}'s</Text> baseline.
          </Text>
        </Animated.View>

        {/* Up Next card */}
        <Animated.View
          entering={FadeInDown.delay(700).duration(500)}
          style={styles.nextCard}
        >
          <View style={styles.nextIconBg}>
            <ExpoImage
                                source={require('@/assets/images/pawsnap-logo.svg')}
                                style={{ width: 50, height: 50 }}
                                contentFit="contain"
                              />
          </View>
          <View style={styles.nextTextWrap}>
            <Text style={styles.nextLabel}>UP NEXT</Text>
            <Text style={styles.nextTitle}>Log first itch pattern</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(148,163,184,0.5)" />
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(900).duration(500)}
        style={styles.footer}
      >
        <TouchableOpacity style={styles.homeButton} onPress={onGoHome} activeOpacity={0.85}>
          <Text style={styles.homeButtonText}>Go to Home</Text>
          <Ionicons name="arrow-forward" size={20} color={BrandColors.background} />
        </TouchableOpacity>
        <Text style={styles.helperText}>
          Need to change settings? You can edit later in Profile.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  glowTop: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: `${BrandColors.primary}10`,
  },
  glowBottom: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${BrandColors.primary}08`,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Icon
  iconArea: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${BrandColors.primary}20`,
  },
  iconOuter: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: `${BrandColors.primary}18`,
    borderWidth: 1,
    borderColor: `${BrandColors.primary}40`,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 10,
  },
  iconInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  confetti1: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BrandColors.primary,
    opacity: 0.6,
  },
  confetti2: {
    position: 'absolute',
    bottom: 12,
    left: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    opacity: 0.4,
  },

  // Text
  textBlock: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  description: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.8)',
    textAlign: 'center',
    lineHeight: 26,
  },
  petName: {
    color: BrandColors.primary,
    fontWeight: '700',
  },

  // Next card
  nextCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
  },
  nextIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextTextWrap: {
    flex: 1,
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primary,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  nextTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    alignItems: 'center',
  },
  homeButton: {
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
  homeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
  },
  helperText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(71,85,105,0.6)',
    textAlign: 'center',
    marginTop: 20,
  },
});
