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
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, Path, Stop, LinearGradient as SvgGradient } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// ─── Illustration: Itch Tracker Card ───
function ItchTrackerCard() {
  return (
    <View style={illustrationStyles.cardWrapper}>
      <View style={illustrationStyles.roundedCard}>
        {/* Dog Photo */}
        <Image
          source={require('@/assets/images/onboarding-dog.png')}
          style={illustrationStyles.dogImage}
          resizeMode="cover"
        />
        {/* Itch Level Overlay */}
        <View style={illustrationStyles.itchOverlay}>
          <View style={illustrationStyles.itchHeader}>
            <Text style={illustrationStyles.itchLabel}>ITCH LEVEL</Text>
            <Text style={illustrationStyles.itchValue}>7.5</Text>
          </View>
          <View style={illustrationStyles.sliderTrack}>
            <View style={illustrationStyles.sliderFill} />
            <View style={illustrationStyles.sliderThumb} />
          </View>
          <View style={illustrationStyles.sliderLabels}>
            <Text style={illustrationStyles.sliderLabelText}>0</Text>
            <Text style={illustrationStyles.sliderLabelText}>10</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Illustration: Camera View Card ───
function CameraViewCard() {
  return (
    <View style={illustrationStyles.phoneFrame}>
      {/* Phone notch area */}
      <View style={illustrationStyles.phoneNotch}>
        <View style={illustrationStyles.notchDot} />
        <View style={illustrationStyles.notchDot} />
      </View>
      {/* Camera viewport */}
      <View style={illustrationStyles.cameraViewport}>
        <Image
          source={require('@/assets/images/onboarding-paw.png')}
          style={illustrationStyles.pawImage}
          resizeMode="cover"
        />
        {/* Corner brackets */}
        <View style={[illustrationStyles.cornerBracket, illustrationStyles.cornerTL]} />
        <View style={[illustrationStyles.cornerBracket, illustrationStyles.cornerTR]} />
        <View style={[illustrationStyles.cornerBracket, illustrationStyles.cornerBL]} />
        <View style={[illustrationStyles.cornerBracket, illustrationStyles.cornerBR]} />
        {/* Center crosshair */}
        <View style={illustrationStyles.crosshairContainer}>
          <View style={[illustrationStyles.crosshairLine, { width: 16, height: 1 }]} />
          <View style={[illustrationStyles.crosshairLine, { width: 1, height: 16, position: 'absolute' }]} />
        </View>
      </View>
      {/* Camera controls */}
      <View style={illustrationStyles.cameraControls}>
        <View style={illustrationStyles.cameraSmallBtn}>
          <Ionicons name="images" size={14} color="#fff" />
        </View>
        <View style={illustrationStyles.shutterButton}>
          <View style={illustrationStyles.shutterButtonInner} />
        </View>
        <View style={illustrationStyles.cameraSmallBtn}>
          <Ionicons name="sync" size={14} color="#fff" />
        </View>
      </View>
    </View>
  );
}

// ─── Illustration: Trigger Chart Card ───
const CHART_W = SCREEN_WIDTH * 0.78 - 40; // card width minus padding
const CHART_H = 100;

function TriggerChartCard() {
  // Wave path data
  const waveLine = `M0,${CHART_H * 0.7} Q${CHART_W * 0.12},${CHART_H * 0.15} ${CHART_W * 0.25},${CHART_H * 0.5} T${CHART_W * 0.5},${CHART_H * 0.3} T${CHART_W * 0.75},${CHART_H * 0.75} T${CHART_W},${CHART_H * 0.15}`;
  const waveArea = `${waveLine} V${CHART_H} H0 Z`;

  return (
    <View style={illustrationStyles.chartCard}>
      <View style={illustrationStyles.chartCardInner}>
        {/* Header */}
        <Text style={illustrationStyles.chartLabel}>ITCH INTENSITY CORRELATION</Text>
        <Text style={illustrationStyles.chartTitle}>High Alert</Text>
        <View style={illustrationStyles.chartSubRow}>
          <Text style={illustrationStyles.chartSubText}>Last 7 Days</Text>
          <Text style={illustrationStyles.chartChange}>+12%</Text>
        </View>

        {/* SVG Wave Graph */}
        <View style={illustrationStyles.chartArea}>
          <Svg width={CHART_W} height={CHART_H}>
            <Defs>
              <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={BrandColors.primary} stopOpacity={0.3} />
                <Stop offset="100%" stopColor={BrandColors.primary} stopOpacity={0} />
              </SvgGradient>
            </Defs>
            {/* Gradient fill under the line */}
            <Path d={waveArea} fill="url(#areaGrad)" />
            {/* The line itself */}
            <Path
              d={waveLine}
              fill="none"
              stroke={BrandColors.primary}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Trigger icons with connecting lines */}
        <View style={illustrationStyles.factorRow}>
          {[
            { icon: 'sunny' as const, label: 'Heat' },
            { icon: 'water' as const, label: 'Humidity' },
            { icon: 'leaf' as const, label: 'Pollen' },
          ].map((factor) => (
            <View key={factor.label} style={illustrationStyles.factorItem}>
              {/* Connecting line */}
              <LinearGradient
                colors={['transparent', `${BrandColors.primary}80`, BrandColors.primary]}
                style={illustrationStyles.factorLine}
              />
              {/* Icon circle */}
              <View style={illustrationStyles.factorIconBg}>
                <Ionicons name={factor.icon} size={20} color={BrandColors.primary} />
              </View>
              <Text style={illustrationStyles.factorLabel}>{factor.label}</Text>
            </View>
          ))}
        </View>

        {/* Day labels */}
        <View style={illustrationStyles.dayRow}>
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
            <Text key={day} style={illustrationStyles.dayLabel}>{day}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

// ─── Illustration: Vet Report Card ───
function VetReportCard() {
  return (
    <View style={illustrationStyles.vetCard}>
      <LinearGradient
        colors={['#1A2332', '#151D2B']}
        style={illustrationStyles.vetCardGradient}
      >
        {/* Header row: paw icon + download icon */}
        <View style={illustrationStyles.vetHeaderRow}>
          <View style={illustrationStyles.vetPawBadge}>
            <Image
              source={require('@/assets/images/pawsnap-logo.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <Ionicons name="download-outline" size={18} color={BrandColors.primary} />
        </View>

        {/* Profile section */}
        <View style={illustrationStyles.vetProfileRow}>
          <Image
            source={require('@/assets/images/onboarding-dog.png')}
            style={illustrationStyles.vetDogAvatar}
            resizeMode="cover"
          />
          <View style={illustrationStyles.vetTextBars}>
            <View style={[illustrationStyles.vetBar, { width: '90%', height: 8 }]} />
            <View style={[illustrationStyles.vetBar, { width: '65%', height: 6 }]} />
            <View style={[illustrationStyles.vetBar, { width: '75%', height: 6 }]} />
          </View>
        </View>

        {/* Separator bar with accent */}
        <View style={illustrationStyles.vetSeparatorRow}>
          <View style={[illustrationStyles.vetBar, { flex: 1, height: 6 }]} />
          <View style={[illustrationStyles.vetBarAccent, { width: 40, height: 6 }]} />
        </View>

        {/* Bar chart */}
        <View style={illustrationStyles.vetChartRow}>
          {[
            { h1: 20, h2: 28 },
            { h1: 32, h2: 40 },
            { h1: 38, h2: 26 },
            { h1: 22, h2: 36 },
            { h1: 30, h2: 18 },
          ].map((pair, i) => (
            <View key={i} style={illustrationStyles.vetBarGroup}>
              <View style={[illustrationStyles.vetChartBar, { height: pair.h1, backgroundColor: '#1F3040' }]} />
              <View style={[illustrationStyles.vetChartBar, { height: pair.h2, backgroundColor: BrandColors.primary }]} />
            </View>
          ))}
        </View>

        {/* Long bar */}
        <View style={[illustrationStyles.vetBar, { width: '100%', height: 6, marginTop: 12 }]} />

        {/* Bullet list */}
        <View style={illustrationStyles.vetBulletList}>
          {[0.85, 0.75, 0.9, 0.6].map((w, i) => (
            <View key={i} style={illustrationStyles.vetBulletRow}>
              <View style={illustrationStyles.vetBulletDot} />
              <View style={[illustrationStyles.vetBar, { width: `${w * 100}%` as any, height: 5, flex: 1 }]} />
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

// ─── Slide Data ───
const SLIDES = [
  {
    title: 'Track Itch Patterns',
    description:
      'Use our 0-10 scale to record how itchy your pet is each day. Consistency is key to finding patterns.',
    Illustration: ItchTrackerCard,
  },
  {
    title: 'Visualize Progress',
    description:
      'Take photos of problem areas to create a visual timeline. Our guided camera helps you get the perfect angle every time.',
    Illustration: CameraViewCard,
  },
  {
    title: 'Spot Hidden',
    titleAccent: ' Triggers',
    description:
      'Unlock likely associations like humidity, pollen & grass levels with Premium analysis.',
    Illustration: TriggerChartCard,
  },
  {
    title: 'Share with Your Vet',
    description:
      'Export a comprehensive history of logs, photos, and suspected triggers to help your vet make an informed diagnosis.',
    Illustration: VetReportCard,
  },
];

// ─── Pagination Dot ───
function PaginationDot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 28, 8],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );
    return { width, opacity };
  });

  return <Animated.View style={[paginationStyles.dot, animatedStyle]} />;
}

// ─── Main OnboardingScreen ───
interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const scrollX = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const scrollRef = React.useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      currentIndex.value = Math.round(event.contentOffset.x / SCREEN_WIDTH);
    },
  });

  const handleNext = () => {
    const nextIndex = Math.round(scrollX.value / SCREEN_WIDTH) + 1;
    if (nextIndex < SLIDES.length) {
      scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    } else {
      onComplete();
    }
  };



  // Track current slide for button text
  const [activeSlide, setActiveSlide] = React.useState(0);
  const onMomentumEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveSlide(idx);
  };

  return (
    <View style={screenStyles.container}>
      {/* Skip Button */}
      <Animated.View entering={FadeIn.delay(300).duration(400)} style={screenStyles.skipContainer}>
        <TouchableOpacity onPress={onSkip} style={screenStyles.skipButton} activeOpacity={0.7}>
          <Text style={screenStyles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Slides */}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumEnd}
        scrollEventThrottle={16}
        bounces={false}
        style={screenStyles.scrollView}
      >
        {SLIDES.map((slide, index) => (
          <SlideItem
            key={index}
            slide={slide}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      {/* Bottom Section */}
      <Animated.View entering={FadeInDown.delay(500).duration(500)} style={screenStyles.bottomSection}>
        {/* Pagination */}
        <View style={paginationStyles.container}>
          {SLIDES.map((_, index) => (
            <PaginationDot key={index} index={index} scrollX={scrollX} />
          ))}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity
          style={screenStyles.nextButton}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={screenStyles.nextButtonText}>
            {activeSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Slide Item ───
function SlideItem({
  slide,
  index,
  scrollX,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
  scrollX: SharedValue<number>;
}) {
  const { Illustration } = slide;

  const illustrationAnimStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.75, 1, 0.75],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [60, 0, -60],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }, { translateX }], opacity };
  });

  const textAnimStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [30, 0, 30],
      Extrapolation.CLAMP
    );
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <View style={slideStyles.container}>
      <Animated.View style={[slideStyles.illustrationContainer, illustrationAnimStyle]}>
        <Illustration />
      </Animated.View>
      <Animated.View style={[slideStyles.textContainer, textAnimStyle]}>
        <Text style={slideStyles.title}>
          {slide.title}
          {slide.titleAccent && (
            <Text style={slideStyles.titleAccent}>{slide.titleAccent}</Text>
          )}
        </Text>
        <Text style={slideStyles.description}>{slide.description}</Text>
      </Animated.View>
    </View>
  );
}

// ─── Styles ───
const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  skipContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 24,
    zIndex: 10,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1.5,
  },
  scrollView: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
    marginTop: 28,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
    letterSpacing: 0.2,
  },
});

const slideStyles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
  },
  illustrationContainer: {
    width: SCREEN_WIDTH * 0.82,
    height: SCREEN_HEIGHT * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: BrandColors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 38,
  },
  titleAccent: {
    color: BrandColors.primary,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
});

const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: BrandColors.primary,
  },
});

const illustrationStyles = StyleSheet.create({
  // ── Itch Tracker Card ──
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  roundedCard: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.32,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#C4A882',
  },
  dogImage: {
    width: '100%',
    height: '60%',
  },
  itchOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.92)',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  itchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itchLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.primary,
    letterSpacing: 1.5,
  },
  itchValue: {
    fontSize: 22,
    fontWeight: '800',
    color: BrandColors.textPrimary,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: BrandColors.border,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderFill: {
    width: '75%',
    height: '100%',
    backgroundColor: BrandColors.primary,
    borderRadius: 3,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: BrandColors.primary,
    position: 'absolute',
    left: '72%',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  sliderLabelText: {
    fontSize: 11,
    color: BrandColors.textSecondary,
  },

  // ── Camera View Card ──
  phoneFrame: {
    width: SCREEN_WIDTH * 0.68,
    height: SCREEN_HEIGHT * 0.40,
    borderRadius: 36,
    borderWidth: 6,
    borderColor: '#1F2937',
    backgroundColor: '#111827',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  phoneNotch: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 6,
    backgroundColor: '#1A2030',
  },
  notchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2A3545',
  },
  cameraViewport: {
    flex: 1,
    position: 'relative',
  },
  pawImage: {
    width: '100%',
    height: '100%',
  },
  cornerBracket: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: BrandColors.primary,
    borderWidth: 2.5,
  },
  cornerTL: {
    top: 16,
    left: 16,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 16,
    right: 16,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 16,
    left: 16,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 16,
    right: 16,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  crosshairContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -8,
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
  },
  crosshairLine: {
    backgroundColor: BrandColors.primary,
    opacity: 0.7,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(15, 21, 32, 0.9)',
  },
  cameraSmallBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },

  // ── Trigger Chart Card ──
  chartCard: {
    width: SCREEN_WIDTH * 0.78,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: '#111827',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  chartCardInner: {
    padding: 22,
    paddingBottom: 18,
  },
  chartLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: `${BrandColors.primary}B0`,
    letterSpacing: 2,
    marginBottom: 6,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  chartSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  chartSubText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  chartChange: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  chartArea: {
    marginBottom: 8,
  },
  factorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    marginTop: -4,
  },
  factorItem: {
    alignItems: 'center',
    gap: 6,
  },
  factorLine: {
    width: 1,
    height: 36,
    marginBottom: 6,
  },
  factorIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  factorLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.3)',
    letterSpacing: 0.5,
  },

  // ── Vet Report Card ──
  vetCard: {
    width: SCREEN_WIDTH * 0.78,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  vetCardGradient: {
    padding: 20,
    paddingBottom: 18,
  },
  vetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  vetPawBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: BrandColors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vetProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  vetDogAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: BrandColors.border,
  },
  vetTextBars: {
    flex: 1,
    gap: 6,
  },
  vetBar: {
    backgroundColor: '#2A3545',
    borderRadius: 3,
    height: 6,
  },
  vetBarAccent: {
    backgroundColor: BrandColors.primary,
    borderRadius: 3,
  },
  vetSeparatorRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  vetChartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 50,
    paddingHorizontal: 8,
  },
  vetBarGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  vetChartBar: {
    width: 14,
    borderRadius: 3,
  },
  vetBulletList: {
    marginTop: 12,
    gap: 8,
  },
  vetBulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vetBulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },
});
