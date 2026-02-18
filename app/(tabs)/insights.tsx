import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Circle,
  Defs,
  Path,
  Stop,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';

const PET_NAME = 'Luna';

/* ─────────── Association mock data ─────────── */
const ASSOCIATIONS = [
  {
    label: 'Grass Pollen',
    icon: 'leaf' as const,
    iconColor: '#4ADE80',
    iconBg: 'rgba(74,222,128,0.12)',
    borderColor: 'rgba(74,222,128,0.2)',
    tagText: 'High Count',
    reactionText: '+24h reaction',
    reactionColor: BrandColors.primary,
    reactionBg: `${BrandColors.primary}18`,
    detectedText: 'Detected Tuesday',
  },
  {
    label: 'High Humidity',
    icon: 'water' as const,
    iconColor: '#60A5FA',
    iconBg: 'rgba(96,165,250,0.12)',
    borderColor: 'rgba(96,165,250,0.2)',
    tagText: '> 80%',
    reactionText: 'Immediate',
    reactionColor: '#FB923C',
    reactionBg: 'rgba(251,146,60,0.12)',
    detectedText: 'Detected Friday',
  },
];

/* ─────────── Chart data points ─────────── */
const CHART_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const CHART_POINTS = [
  { day: 'M', value: 3 },
  { day: 'T', value: 4.5 },
  { day: 'W', value: 2.5 },
  { day: 'T', value: 5.5 },
  { day: 'F', value: 8 }, // Peak
  { day: 'S', value: 4 },
  { day: 'S', value: 6 },
];

/**
 * Generates a smooth SVG path (cubic bezier) from data points.
 * @param data Array of { day, value }
 * @param width View width
 * @param height View height
 * @param maxValue Max value for Y scaling
 */
function generateSmoothPath(data: typeof CHART_POINTS, width: number, height: number, maxValue: number) {
  if (data.length < 2) return '';

  // Scale points to chart dimensions
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (d.value / maxValue) * height; // Invert Y for SVG
    return { x, y };
  });

  // Start path
  let path = `M ${points[0].x},${points[0].y}`;

  // Calculate control points for smooth curve
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];

    // Simple smoothing: use X-midpoint for control points
    const cp1x = p0.x + (p1.x - p0.x) / 3;
    const cp1y = p0.y;
    const cp2x = p0.x + (2 * (p1.x - p0.x)) / 3;
    const cp2y = p1.y;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }

  return path;
}

export default function InsightsScreen() {
  const router = useRouter();
  const pulseAnim = useSharedValue(1);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(4); // Default to peak (index 4)

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
    opacity: withTiming(pulseAnim.value > 1.1 ? 0.7 : 1),
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Weekly Summary</Text>
            <Text style={styles.headerDate}>Oct 12 – Oct 18, 2023</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
             <TouchableOpacity 
                style={styles.recapBtn} 
                activeOpacity={0.7}
                onPress={() => router.push('/likely-associations/recap')}
             >
                <Ionicons name="newspaper-outline" size={20} color={BrandColors.primary} />
             </TouchableOpacity>
             <TouchableOpacity style={styles.calendarBtn} activeOpacity={0.7}>
                <Ionicons name="calendar-outline" size={20} color={BrandColors.primary} />
             </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Itch Intensity Chart Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(450)} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Itch Intensity</Text>
              <Text style={styles.chartSub}>
                Avg. Level: <Text style={styles.chartAvg}>4.2</Text>
              </Text>
            </View>
            <View style={styles.liveBadge}>
              <Animated.View style={[styles.liveDot, pulseStyle]} />
              <Text style={styles.liveText}>Live Update</Text>
            </View>
          </View>

          {/* SVG Chart */}
          <View style={styles.chartWrap}>
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[styles.gridLine, { top: `${i * 25}%` }]}
              />
            ))}

            <Svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              style={StyleSheet.absoluteFillObject}
            >
              <Defs>
                <SvgLinearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={BrandColors.primary} stopOpacity={0.25} />
                  <Stop offset="100%" stopColor={BrandColors.primary} stopOpacity={0} />
                </SvgLinearGradient>
              </Defs>
              
              {/* Dynamic Path Generation */}
              {(() => {
                const maxValue = 10; // Fixed max scale for now, can be dynamic
                const linePath = generateSmoothPath(CHART_POINTS, 100, 50, maxValue);
                const fillPath = `${linePath} V 50 H 0 Z`;

                return (
                  <>
                    <Path d={fillPath} fill="url(#chartFill)" />
                    <Path
                      d={linePath}
                      fill="none"
                      stroke={BrandColors.primary}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data points */}
                    {CHART_POINTS.map((pt, i) => {
                      const x = (i / (CHART_POINTS.length - 1)) * 100;
                      const y = 50 - (pt.value / maxValue) * 50;
                      const isSelected = selectedIndex === i;

                      return (
                        <React.Fragment key={i}>
                          <Circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 5 : 3} // Larger if selected
                            fill={isSelected ? BrandColors.primary : BrandColors.background}
                            stroke={isSelected ? '#FFFFFF' : BrandColors.primary}
                            strokeWidth={isSelected ? 2 : 1.5}
                            onPress={() => setSelectedIndex(i)}
                          />
                          {/* Invisible larger hit area */}
                          <Circle
                            cx={x}
                            cy={y}
                            r={15}
                            fill="transparent"
                            onPress={() => setSelectedIndex(i)}
                          />
                        </React.Fragment>
                      );
                    })}
                  </>
                );
              })()}
            </Svg>

            {/* Tooltip for selected point */}
            {selectedIndex !== null && (() => {
               const pt = CHART_POINTS[selectedIndex];
               const xPercent = (selectedIndex / (CHART_POINTS.length - 1)) * 100;
               // Adjust left position to center tooltip
               // Clamp to keep inside bounds (approx)
               const leftPos = Math.max(10, Math.min(90, xPercent));
               
               return (
                <View style={[styles.tooltip, { left: `${leftPos}%`, transform: [{ translateX: -18 }, { translateY: -40 }] }]}>
                  <Text style={styles.tooltipText}>Lvl {pt.value}</Text>
                  <View style={styles.tooltipArrow} />
                </View>
               );
            })()}
          </View>

          {/* X-Axis */}
          <View style={styles.xAxis}>
            {CHART_DAYS.map((day, i) => (
              <Text
                key={i}
                style={[
                  styles.xLabel,
                  i === 4 && { color: BrandColors.primary, fontWeight: '700' },
                ]}
              >
                {day}
              </Text>
            ))}
          </View>
        </Animated.View>

        {/* ─── Key Stats Row ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.statsRow}>
          {/* Flare Days */}
          <View style={[styles.statCard, { borderColor: 'rgba(239,68,68,0.2)' }]}>
            <View style={styles.statDecor}>
              <View style={[styles.decorBlob, { backgroundColor: 'rgba(239,68,68,0.1)' }]} />
            </View>
            <View style={styles.statBadgeRow}>
              <Ionicons name="warning" size={16} color="#F87171" />
              <Text style={[styles.statBadgeLabel, { color: '#FCA5A5' }]}>ALERT</Text>
            </View>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statUnit}>Days</Text>
            </View>
            <Text style={styles.statCaption}>Flare-ups detected</Text>
          </View>

          {/* Compliance */}
          <View style={[styles.statCard, { borderColor: `${BrandColors.primary}30` }]}>
            <View style={styles.statDecor}>
              <View style={[styles.decorBlob, { backgroundColor: `${BrandColors.primary}15` }]} />
            </View>
            <View style={styles.statBadgeRow}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.primary} />
              <Text style={[styles.statBadgeLabel, { color: BrandColors.primary }]}>GOOD</Text>
            </View>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>85%</Text>
            </View>
            <Text style={styles.statCaption}>Protocol compliance</Text>
          </View>
        </Animated.View>

        {/* ─── Suspected Associations ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(450)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Suspected Associations</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/likely-associations')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {ASSOCIATIONS.map((item) => (
            <View key={item.label} style={styles.assocCard}>
              <View style={styles.assocLeft}>
                <View
                  style={[
                    styles.assocIcon,
                    { backgroundColor: item.iconBg, borderColor: item.borderColor },
                  ]}
                >
                  <Ionicons name={item.icon} size={22} color={item.iconColor} />
                </View>
                <View>
                  <Text style={styles.assocLabel}>{item.label}</Text>
                  <View style={styles.assocTag}>
                    <Text style={styles.assocTagText}>{item.tagText}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.assocRight}>
                <View style={[styles.reactionPill, { backgroundColor: item.reactionBg }]}>
                  <Text style={[styles.reactionText, { color: item.reactionColor }]}>
                    {item.reactionText}
                  </Text>
                </View>
                <Text style={styles.detectedText}>{item.detectedText}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ─── Action Buttons ─── */}
        <Animated.View entering={FadeInDown.delay(400).duration(450)} style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() => router.push('/likely-associations/gated')}
          >
            <Ionicons name="analytics" size={20} color={BrandColors.background} />
            <Text style={styles.primaryBtnText}>View Full Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.secondaryBtnText}>Export PDF Report</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 32,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 },
  headerDate: { fontSize: 13, fontWeight: '500', color: 'rgba(148,163,184,0.7)', marginTop: 4 },
  calendarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BrandColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  recapBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,189,0.1)', // Tinted bg for prominence
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(45,212,189,0.3)',
  },

  /* Chart card */
  chartCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  chartSub: { fontSize: 12, color: 'rgba(148,163,184,0.7)', marginTop: 2 },
  chartAvg: { fontWeight: '700', color: '#FFFFFF' },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },
  liveText: { fontSize: 10, fontWeight: '700', color: BrandColors.primary },

  chartWrap: { height: 160, width: '100%', position: 'relative' },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tooltip: {
    position: 'absolute',
    top: '30%', // Positioned relative to graph area generally
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: { fontSize: 9, fontWeight: '700', color: '#000000' },
  tooltipArrow: {
    position: 'absolute',
    bottom: -4,
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  xLabel: { fontSize: 12, fontWeight: '500', color: 'rgba(148,163,184,0.6)' },

  /* Stats */
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: BrandColors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  statDecor: { position: 'absolute', right: -8, top: -8 },
  decorBlob: { width: 56, height: 56, borderRadius: 28 },
  statBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  statBadgeLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  statValue: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  statUnit: { fontSize: 13, fontWeight: '500', color: 'rgba(148,163,184,0.6)' },
  statCaption: { fontSize: 11, color: 'rgba(107,114,128,0.7)', marginTop: 4 },

  /* Associations */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  seeAll: { fontSize: 12, fontWeight: '600', color: BrandColors.primary },
  assocCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  assocLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  assocIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  assocLabel: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  assocTag: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'flex-start',
  },
  assocTagText: { fontSize: 10, color: 'rgba(148,163,184,0.7)' },
  assocRight: { alignItems: 'flex-end' },
  reactionPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 },
  reactionText: { fontSize: 10, fontWeight: '700' },
  detectedText: { fontSize: 9, color: 'rgba(107,114,128,0.6)', marginTop: 4 },

  /* Actions */
  actions: { marginTop: 16, gap: 12, paddingBottom: 8 },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: BrandColors.background },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.surface,
    paddingVertical: 16,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  secondaryBtnText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});
