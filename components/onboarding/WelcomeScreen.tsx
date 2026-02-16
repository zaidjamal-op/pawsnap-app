import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const FEATURES = [
  {
    icon: 'checkmark-circle' as const,
    title: 'Daily check-ins',
    subtitle: 'Quick symptom logging in seconds',
  },
  {
    icon: 'image' as const,
    title: 'Photo timeline',
    subtitle: 'Visual proof of progress',
  },
  {
    icon: 'trending-up' as const,
    title: 'Trigger associations',
    subtitle: 'Identify what causes flare-ups',
  },
];

export default function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* ── Hero Image (top 55%) ── */}
      <View style={styles.heroContainer}>
        <Image
          source={require('@/assets/images/onboarding-hero.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Gradient fade to dark */}
        <LinearGradient
          colors={[
            'transparent',
            'rgba(11, 15, 20, 0.15)',
            'rgba(11, 15, 20, 0.5)',
            'rgba(11, 15, 20, 0.85)',
            BrandColors.background,
          ]}
          locations={[0, 0.25, 0.45, 0.65, 0.88]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Brand Logo — centered top */}
        <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.brandContainer}>
          <Image
            source={require('@/assets/images/pawsnap-logo.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>PawSnap</Text>
        </Animated.View>

        {/* Headline — bottom of hero */}
        <Animated.View
          entering={FadeInUp.delay(350).duration(600).springify()}
          style={styles.headlineContainer}
        >
          <Text style={styles.headlineWhite}>Track itch patterns.</Text>
          <Text style={styles.headlineMint}>
            Share a vet-ready{'\n'}history.
          </Text>
        </Animated.View>
      </View>

      {/* ── Features ── */}
      <View style={styles.featuresContainer}>
        {FEATURES.map((feature, index) => (
          <Animated.View
            key={feature.title}
            entering={FadeInDown.delay(550 + index * 120).duration(450).springify()}
            style={styles.featureRow}
          >
            <View style={styles.featureIconCircle}>
              <Ionicons name={feature.icon} size={18} color={BrandColors.primary} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* ── CTA Section ── */}
      <View style={styles.ctaContainer}>
        <AnimatedTouchable
          entering={FadeInDown.delay(1000).duration(450).springify()}
          style={styles.getStartedButton}
          onPress={onGetStarted}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>Get started</Text>
        </AnimatedTouchable>

        <AnimatedTouchable
          entering={FadeInDown.delay(1120).duration(400)}
          style={styles.loginButton}
          onPress={onLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.loginText}>I already have an account</Text>
        </AnimatedTouchable>

        <Animated.Text
          entering={FadeIn.delay(1250).duration(500)}
          style={styles.termsText}
        >
          By continuing, you agree to{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },

  // ── Hero ──
  heroContainer: {
    height: SCREEN_HEIGHT * 0.50,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },

  // ── Brand ──
  brandContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 88 : 68,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  brandLogo: {
    width: 40,
    height: 40,
  },
  brandText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── Headline ──
  headlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
  },
  headlineWhite: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  headlineMint: {
    fontSize: 34,
    fontWeight: '800',
    color: BrandColors.primary,
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  // ── Features ──
  featuresContainer: {
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  featureIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${BrandColors.primary}15`,
    borderWidth: 1,
    borderColor: `${BrandColors.primary}30`,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: BrandColors.textPrimary,
    letterSpacing: 0.1,
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 13,
    color: BrandColors.textSecondary,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  // ── CTA ──
  ctaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
  },
  getStartedButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
    letterSpacing: 0.2,
  },
  loginButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: BrandColors.textPrimary,
    letterSpacing: 0.1,
  },
  termsText: {
    fontSize: 12,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  termsLink: {
    color: BrandColors.textPrimary,
    textDecorationLine: 'underline',
  },
});
