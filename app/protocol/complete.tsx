import { BrandColors } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';

// ─── Data ───
const ITCH_DROP = 25;
const PAW_WIPE_PCT = 94;

// Mini bar chart data (7 bars showing declining itch)
const MINI_BARS = [80, 70, 75, 60, 50, 35, 25];
const SCREEN_W = Dimensions.get('window').width;

// Build a smooth trend line over the bars
function trendPath(bars: number[], w: number, h: number): string {
  const barW = w / bars.length;
  const pts = bars.map((v, i) => ({
    x: barW * i + barW / 2,
    y: h * (1 - v / 100),
  }));
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cx1 = p.x + (c.x - p.x) * 0.4;
    const cx2 = p.x + (c.x - p.x) * 0.6;
    d += ` C${cx1.toFixed(1)} ${p.y.toFixed(1)}, ${cx2.toFixed(1)} ${c.y.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}

export default function ProtocolCompleteScreen() {
  const router = useRouter();
  const miniW = SCREEN_W - 120;
  const miniH = 64;

  const handleContinue = async () => {
    await AsyncStorage.removeItem('protocol_active');
    router.replace('/(tabs)/protocol');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Success Hero ─── */}
        <View style={styles.heroSection}>
          {/* Checkmark */}
          <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.checkOuter}>
            <View style={styles.checkGlow} />
            <View style={styles.checkRing}>
              <View style={styles.checkCircle}>
                <MaterialIcons name="check" size={52} color={BrandColors.background} />
              </View>
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View entering={FadeInDown.delay(500).duration(500)}>
            <Text style={styles.heroTitle}>Protocol</Text>
            <Text style={styles.heroTitleGreen}>Completed!</Text>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(650).duration(500)}>
            <Text style={styles.heroDesc}>
              Over the last 14 days, your pet's itch frequency dropped by{' '}
              <Text style={styles.heroHighlight}>{ITCH_DROP}%</Text>.{'\n'}
              Consistency with paw wipes was high{' '}
              (<Text style={styles.heroHighlight}>{PAW_WIPE_PCT}%</Text>).
            </Text>
          </Animated.View>
        </View>

        {/* ─── Top Finding Card ─── */}
        <Animated.View entering={FadeInDown.delay(850).duration(500)} style={styles.findingCard}>
          <View style={styles.findingGlow} />

          {/* Badge + icon */}
          <View style={styles.findingTopRow}>
            <View style={styles.findingBadge}>
              <Text style={styles.findingBadgeText}>TOP FINDING</Text>
            </View>
            <MaterialIcons name="insights" size={22} color="rgba(45,212,191,0.4)" />
          </View>

          <Text style={styles.findingTitle}>
            Paw wipes correlate with lower next-day itch.
          </Text>

          {/* Mini Bar Chart */}
          <View style={[styles.miniChartWrap, { width: miniW, height: miniH }]}>
            <Svg width={miniW} height={miniH}>
              {MINI_BARS.map((val, i) => {
                const barW = miniW / MINI_BARS.length;
                const barH = miniH * (val / 100);
                const isLast2 = i >= MINI_BARS.length - 2;
                return (
                  <Rect
                    key={i}
                    x={barW * i + 3}
                    y={miniH - barH}
                    width={barW - 6}
                    height={barH}
                    rx={3}
                    fill={isLast2 ? BrandColors.primary : '#4B5563'}
                    opacity={isLast2 ? 1 : 0.4 + (i * 0.08)}
                  />
                );
              })}
              {/* Trend line */}
              <Path
                d={trendPath(MINI_BARS, miniW, miniH)}
                stroke={BrandColors.primary}
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            </Svg>
          </View>
        </Animated.View>

        {/* ─── Action Buttons ─── */}
        <Animated.View entering={FadeInUp.delay(1050).duration(500)} style={styles.actionsWrap}>
          <TouchableOpacity
            style={styles.exportBtn}
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <MaterialIcons name="file-upload" size={22} color={BrandColors.background} />
            <Text style={styles.exportBtnText}>Export Vet Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.7}
            onPress={handleContinue}
          >
            <Text style={styles.continueBtnText}>Continue Tracking</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  /* ─── Hero ─── */
  heroSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 36,
  },
  checkOuter: {
    width: 130, height: 130,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
    position: 'relative',
  },
  checkGlow: {
    position: 'absolute',
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: BrandColors.primary,
    opacity: 0.15,
  },
  checkRing: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: BrandColors.surface,
    borderWidth: 3,
    borderColor: 'rgba(45,212,191,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  checkCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOpacity: 0.4, shadowRadius: 20,
    elevation: 12,
  },
  heroTitle: {
    fontSize: 32, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', lineHeight: 38,
  },
  heroTitleGreen: {
    fontSize: 32, fontWeight: '800', color: BrandColors.primary,
    textAlign: 'center', lineHeight: 38, marginBottom: 16,
  },
  heroDesc: {
    fontSize: 16, color: '#9CA3AF', lineHeight: 26,
    textAlign: 'center', maxWidth: 300,
  },
  heroHighlight: {
    color: BrandColors.primary, fontWeight: '800',
  },

  /* ─── Finding Card ─── */
  findingCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
    position: 'relative',
  },
  findingGlow: {
    position: 'absolute', top: -20, right: -20,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: BrandColors.primary, opacity: 0.04,
  },
  findingTopRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  findingBadge: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 999,
  },
  findingBadgeText: {
    fontSize: 10, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 1.2,
  },
  findingTitle: {
    fontSize: 19, fontWeight: '700', color: '#FFFFFF',
    lineHeight: 27, marginBottom: 18,
  },
  miniChartWrap: {
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden',
    padding: 8,
  },

  /* ─── Actions ─── */
  actionsWrap: { gap: 12 },
  exportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 16,
    elevation: 8,
  },
  exportBtnText: {
    fontSize: 17, fontWeight: '800', color: BrandColors.background,
  },
  continueBtn: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, borderRadius: 999,
  },
  continueBtnText: {
    fontSize: 15, fontWeight: '600', color: '#6B7280',
  },
});
