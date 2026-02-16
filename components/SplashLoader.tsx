import { BrandColors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedView = Animated.View;

interface SplashLoaderProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashLoader({ onFinish, duration = 3200 }: SplashLoaderProps) {
  // Logo
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);

  // Brand text
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(16);

  // Loading bar
  const barOpacity = useSharedValue(0);
  const loadProgress = useSharedValue(0);
  const shimmerX = useSharedValue(-1);

  // Version
  const versionOpacity = useSharedValue(0);

  // Exit
  const exitOpacity = useSharedValue(1);
  const exitScale = useSharedValue(1);

  useEffect(() => {
    // ── Logo ── smooth scale + fade
    logoOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    logoScale.value = withSpring(1, { damping: 16, stiffness: 80, mass: 0.8 });

    // ── Brand text ── slide up + fade
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }));
    textTranslateY.value = withDelay(400, withSpring(0, { damping: 16, stiffness: 90 }));

    // ── Loading bar ──
    barOpacity.value = withDelay(700, withTiming(1, { duration: 400 }));
    loadProgress.value = withDelay(
      800,
      withTiming(1, {
        duration: duration - 1500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }),
    );

    // ── Shimmer ──
    shimmerX.value = withDelay(
      900,
      withRepeat(
        withSequence(
          withTiming(2, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          withTiming(-1, { duration: 0 }),
        ),
        -1,
      ),
    );

    // ── Version ──
    versionOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));

    // ── Exit ── fade + slight zoom
    exitOpacity.value = withDelay(
      duration - 350,
      withTiming(0, { duration: 350, easing: Easing.in(Easing.ease) }, (finished) => {
        if (finished) runOnJS(onFinish)();
      }),
    );
    exitScale.value = withDelay(
      duration - 350,
      withTiming(1.04, { duration: 350, easing: Easing.in(Easing.ease) }),
    );
  }, []);

  // ── Animated styles ──
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const barContainerStyle = useAnimatedStyle(() => ({
    opacity: barOpacity.value,
  }));

  const barFillStyle = useAnimatedStyle(() => ({
    width: `${loadProgress.value * 100}%` as any,
  }));

  const shimmerStyle = useAnimatedStyle(() => {
    const barWidth = SCREEN_WIDTH * 0.32;
    const x = interpolate(shimmerX.value, [-1, 2], [-50, barWidth + 50]);
    return {
      transform: [{ translateX: x }],
      opacity: interpolate(shimmerX.value, [-1, 0, 1, 2], [0, 0.5, 0.5, 0]),
    };
  });

  const versionStyle = useAnimatedStyle(() => ({
    opacity: versionOpacity.value,
  }));

  const exitStyle = useAnimatedStyle(() => ({
    opacity: exitOpacity.value,
    transform: [{ scale: exitScale.value }],
  }));

  return (
    <AnimatedView style={[styles.container, exitStyle]}>
      {/* Background */}
      <LinearGradient
        colors={['#0D1117', '#0B0F14', '#080C10']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Center content */}
      <View style={styles.centerContent}>
        {/* Logo */}
        <AnimatedView style={[styles.logoContainer, logoStyle]}>
          <Image
            source={require('@/assets/images/pawsnap-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </AnimatedView>

        {/* Brand name */}
        <AnimatedView style={[styles.brandContainer, textStyle]}>
          <Animated.Text style={styles.brandName}>PawSnap</Animated.Text>
          <Animated.Text style={styles.brandTagline}>Capture Every Moment</Animated.Text>
        </AnimatedView>

        {/* Loading bar */}
        <AnimatedView style={[styles.barWrapper, barContainerStyle]}>
          <View style={styles.barTrack}>
            <AnimatedView style={[styles.barFill, barFillStyle]}>
              <LinearGradient
                colors={[BrandColors.primaryDark, BrandColors.primary, '#5EEAD4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            </AnimatedView>

            {/* Shimmer */}
            <AnimatedView style={[styles.shimmer, shimmerStyle]}>
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            </AnimatedView>
          </View>
        </AnimatedView>
      </View>

      {/* Version */}
      <AnimatedView style={[styles.versionContainer, versionStyle]}>
        <Animated.Text style={styles.versionText}>v1.0.4</Animated.Text>
      </AnimatedView>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Logo ──
  logoContainer: {
    marginBottom: 24,
  },
  logoImage: {
    width: 110,
    height: 110,
  },

  // ── Brand text ──
  brandContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  brandName: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  brandTagline: {
    fontSize: 13,
    fontWeight: '400',
    color: BrandColors.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // ── Loading bar ──
  barWrapper: {
    width: SCREEN_WIDTH * 0.32,
    alignItems: 'center',
  },
  barTrack: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    width: 36,
    height: '100%',
    overflow: 'hidden',
  },

  // ── Version ──
  versionContainer: {
    position: 'absolute',
    bottom: 44,
    alignSelf: 'center',
  },
  versionText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 0.5)',
    letterSpacing: 1.5,
  },
});
