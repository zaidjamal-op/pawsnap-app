import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgGradient,
  Path,
  Rect,
  Stop,
  Line as SvgLine,
  Text as SvgText,
} from 'react-native-svg';

// ─── Weekly Data ───
const COMPLIANCE_PCT = 88;
const COMPLIANCE_CHANGE = 12;
const ITCH_AVG = 3.2;
const ITCH_CHANGE = -1.5;

// Trend chart data (7 days: Mon-Sun)
interface WeekDay {
  label: string;
  fullLabel: string;
  compliance: number;    // 0-100%
  itch: number;          // 0-10 actual score
  itchNorm: number;      // 0-100 normalized for chart
  tasks: string;
}

const WEEK_DATA: WeekDay[] = [
  { label: 'MON', fullLabel: 'Monday',    compliance: 50,  itch: 6.5, itchNorm: 65, tasks: '1/3' },
  { label: 'TUE', fullLabel: 'Tuesday',   compliance: 60,  itch: 6.0, itchNorm: 60, tasks: '2/3' },
  { label: 'WED', fullLabel: 'Wednesday', compliance: 55,  itch: 5.5, itchNorm: 55, tasks: '2/3' },
  { label: 'THU', fullLabel: 'Thursday',  compliance: 75,  itch: 4.0, itchNorm: 40, tasks: '2/3' },
  { label: 'FRI', fullLabel: 'Friday',    compliance: 90,  itch: 3.0, itchNorm: 30, tasks: '3/3' },
  { label: 'SAT', fullLabel: 'Saturday',  compliance: 92,  itch: 2.5, itchNorm: 25, tasks: '3/3' },
  { label: 'SUN', fullLabel: 'Sunday',    compliance: 88,  itch: 2.2, itchNorm: 22, tasks: '3/3' },
];

const WEEK_COMPLIANCE = WEEK_DATA.map(d => d.compliance);
const WEEK_ITCH = WEEK_DATA.map(d => d.itchNorm);
const DAY_LABELS = WEEK_DATA.map(d => d.label);

// Variable changes
const VARIABLE_CHANGES = [
  {
    icon: 'lunch-dining' as const,
    title: 'Fewer new treats',
    subtitle: 'Dietary adjustment',
    impact: 'High Impact',
    impactColor: '#22C55E',
    iconBg: 'rgba(99,102,241,0.12)',
    iconColor: '#818CF8',
  },
  {
    icon: 'water-drop' as const,
    title: 'Daily paw wipes',
    subtitle: 'Environmental hygiene',
    impact: 'Medium Impact',
    impactColor: BrandColors.primary,
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#60A5FA',
  },
];

// Chart layout
const SCREEN_W = Dimensions.get('window').width;
const CARD_PAD = 24;
const CHART_W = SCREEN_W - 40 - CARD_PAD * 2;
const CHART_H = 160;
const PAD = { top: 10, right: 10, bottom: 4, left: 0 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

function getPoint(i: number, val: number, total: number) {
  const x = PAD.left + (i / (total - 1)) * PLOT_W;
  const y = PAD.top + PLOT_H * (1 - val / 100);
  return { x, y };
}

function smoothPath(data: number[]): string {
  const pts = data.map((v, i) => getPoint(i, v, data.length));
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cx1 = p.x + (c.x - p.x) * 0.4;
    const cx2 = p.x + (c.x - p.x) * 0.6;
    d += ` C${cx1.toFixed(1)} ${p.y.toFixed(1)}, ${cx2.toFixed(1)} ${c.y.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}

function areaPath(data: number[]): string {
  const line = smoothPath(data);
  const last = getPoint(data.length - 1, data[data.length - 1], data.length);
  const first = getPoint(0, data[0], data.length);
  const bottom = PAD.top + PLOT_H;
  return `${line} L${last.x.toFixed(1)} ${bottom} L${first.x.toFixed(1)} ${bottom} Z`;
}

export default function WeeklySummaryScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const selected = selectedDay !== null ? WEEK_DATA[selectedDay] : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Protocol Weekly Summary" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Stats Grid ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.statsGrid}>
          {/* Compliance Card */}
          <View style={styles.statBigCard}>
            <View style={styles.statBigGlow} />
            <View style={styles.statBigTop}>
              <Text style={styles.statBigLabel}>COMPLIANCE</Text>
              <MaterialIcons name="check-circle" size={18} color={BrandColors.primary} />
            </View>
            <View style={styles.statBigBottom}>
              <Text style={styles.statBigValue}>
                {COMPLIANCE_PCT}<Text style={styles.statBigUnit}>%</Text>
              </Text>
              <View style={styles.statChangeRow}>
                <MaterialIcons name="trending-up" size={14} color={BrandColors.primary} />
                <Text style={styles.statChangePos}>+{COMPLIANCE_CHANGE}%</Text>
                <Text style={styles.statChangeSub}>vs last week</Text>
              </View>
            </View>
          </View>

          {/* Itch Score Card */}
          <View style={styles.statBigCard}>
            <View style={styles.statBigGlow} />
            <View style={styles.statBigTop}>
              <Text style={styles.statBigLabel}>ITCH SCORE</Text>
              <MaterialIcons name="pets" size={18} color={BrandColors.primary} />
            </View>
            <View style={styles.statBigBottom}>
              <Text style={styles.statBigValue}>
                {ITCH_AVG}<Text style={styles.statBigFraction}> / 10</Text>
              </Text>
              <View style={styles.statChangeRow}>
                <MaterialIcons name="trending-down" size={14} color={BrandColors.primary} />
                <Text style={styles.statChangePos}>{ITCH_CHANGE}</Text>
                <Text style={styles.statChangeSub}>improvement</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ─── Trend Chart ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.chartCard}>
          <View style={styles.chartTitleRow}>
            <View>
              <Text style={styles.chartTitle}>Protocol Week 1 Trend</Text>
              <Text style={styles.chartSub}>Itch Level vs. Compliance</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6}>
              <MaterialIcons name="more-horiz" size={24} color={BrandColors.primary} />
            </TouchableOpacity>
          </View>

          {/* Tooltip */}
          {selected && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipDay}>{selected.fullLabel}</Text>
              <View style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: BrandColors.primary }]} />
                <Text style={styles.tooltipVal}>Compliance: {selected.compliance}%</Text>
              </View>
              <View style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: '#94A3B8' }]} />
                <Text style={styles.tooltipVal}>Itch Score: {selected.itch}/10</Text>
              </View>
              <Text style={styles.tooltipTasks}>{selected.tasks} tasks completed</Text>
            </View>
          )}

          <View style={styles.chartWrap}>
            <Svg width={CHART_W} height={CHART_H + 28}>
              <Defs>
                <SvgGradient id="compArea" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={BrandColors.primary} stopOpacity="0.25" />
                  <Stop offset="1" stopColor={BrandColors.primary} stopOpacity="0" />
                </SvgGradient>
              </Defs>

              {/* Grid lines */}
              {[25, 50, 75].map((v) => {
                const y = PAD.top + PLOT_H * (1 - v / 100);
                return (
                  <SvgLine
                    key={v}
                    x1={0} y1={y} x2={CHART_W} y2={y}
                    stroke="rgba(255,255,255,0.04)" strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}

              {/* Area fill */}
              <Path d={areaPath(WEEK_COMPLIANCE)} fill="url(#compArea)" />

              {/* Itch line (grey, descending) */}
              <Path
                d={smoothPath(WEEK_ITCH)}
                stroke="#94A3B8" strokeWidth={2} fill="none"
                strokeLinecap="round"
              />

              {/* Compliance line (teal, ascending) */}
              <Path
                d={smoothPath(WEEK_COMPLIANCE)}
                stroke={BrandColors.primary} strokeWidth={3} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
              />

              {/* Selected day vertical guide line */}
              {selectedDay !== null && (() => {
                const pt = getPoint(selectedDay, WEEK_COMPLIANCE[selectedDay], WEEK_COMPLIANCE.length);
                return (
                  <SvgLine
                    x1={pt.x} y1={PAD.top} x2={pt.x} y2={PAD.top + PLOT_H}
                    stroke="rgba(255,255,255,0.1)" strokeWidth={1}
                    strokeDasharray="4,3"
                  />
                );
              })()}

              {/* Data point dots for all 7 days */}
              {WEEK_DATA.map((d, i) => {
                const isSelected = selectedDay === i;
                const compPt = getPoint(i, d.compliance, WEEK_DATA.length);
                const itchPt = getPoint(i, d.itchNorm, WEEK_DATA.length);
                return (
                  <React.Fragment key={i}>
                    {/* Itch dot */}
                    <Circle
                      cx={itchPt.x} cy={itchPt.y}
                      r={isSelected ? 5 : 3}
                      fill={isSelected ? '#94A3B8' : BrandColors.background}
                      stroke="#94A3B8"
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      opacity={isSelected ? 1 : 0.5}
                    />
                    {/* Compliance dot */}
                    <Circle
                      cx={compPt.x} cy={compPt.y}
                      r={isSelected ? 6 : 3.5}
                      fill={isSelected ? BrandColors.primary : BrandColors.background}
                      stroke={BrandColors.primary}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    {/* Invisible touch target */}
                    <Rect
                      x={compPt.x - (PLOT_W / WEEK_DATA.length) / 2}
                      y={0}
                      width={PLOT_W / WEEK_DATA.length}
                      height={CHART_H}
                      fill="transparent"
                      onPress={() => setSelectedDay(selectedDay === i ? null : i)}
                    />
                  </React.Fragment>
                );
              })}

              {/* X-axis labels */}
              {DAY_LABELS.map((label, i) => {
                const x = PAD.left + (i / (DAY_LABELS.length - 1)) * PLOT_W;
                const isSelected = selectedDay === i;
                return (
                  <SvgText
                    key={label} x={x} y={CHART_H + 16}
                    fontSize={9}
                    fill={isSelected ? BrandColors.primary : '#6B7280'}
                    fontWeight={isSelected ? '700' : '600'}
                    textAnchor="middle" letterSpacing={0.5}
                  >
                    {label}
                  </SvgText>
                );
              })}
            </Svg>
          </View>

          {/* Tap hint */}
          {selectedDay === null && (
            <Text style={styles.chartHint}>Tap any data point for details</Text>
          )}

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: BrandColors.primary }]} />
              <Text style={styles.legendText}>Compliance</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#94A3B8' }]} />
              <Text style={styles.legendText}>Itch Level</Text>
            </View>
          </View>
        </Animated.View>

        {/* ─── Variable Changes ─── */}
        <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.variableCard}>
          <Text style={styles.variableTitle}>Variable Changes</Text>
          {VARIABLE_CHANGES.map((item, i) => (
            <View key={i} style={styles.variableItem}>
              <View style={[styles.variableIcon, { backgroundColor: item.iconBg }]}>
                <MaterialIcons name={item.icon as any} size={22} color={item.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.variableItemTitle}>{item.title}</Text>
                <Text style={styles.variableItemSub}>{item.subtitle}</Text>
              </View>
              <View style={[
                styles.impactBadge,
                { backgroundColor: `${item.impactColor}15` },
              ]}>
                <Text style={[styles.impactText, { color: item.impactColor }]}>
                  {item.impact}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* ─── View Daily Stats CTA ─── */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)} style={{ marginTop: 4 }}>
          <TouchableOpacity
            style={styles.ctaBtn}
            activeOpacity={0.85}
            onPress={() => router.push('/protocol/progress')}
          >
            <Text style={styles.ctaBtnText}>View Daily Stats</Text>
            <MaterialIcons name="arrow-forward" size={20} color={BrandColors.background} />
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16, paddingBottom: 12,
  },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  /* ─── Stats Grid ─── */
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statBigCard: {
    flex: 1,
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 18,
    height: 140,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
    position: 'relative',
  },
  statBigGlow: {
    position: 'absolute', top: -16, right: -16,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: BrandColors.primary, opacity: 0.08,
  },
  statBigTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  statBigLabel: {
    fontSize: 10, fontWeight: '700', color: '#6B7280',
    letterSpacing: 1.2,
  },
  statBigBottom: {},
  statBigValue: {
    fontSize: 34, fontWeight: '800', color: '#FFFFFF',
  },
  statBigUnit: { fontSize: 18, fontWeight: '700' },
  statBigFraction: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
  statChangeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4,
  },
  statChangePos: { fontSize: 12, fontWeight: '700', color: BrandColors.primary },
  statChangeSub: { fontSize: 10, color: '#6B7280', marginLeft: 2 },

  /* ─── Chart ─── */
  chartCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: CARD_PAD,
    marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  chartTitleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 16,
  },
  chartTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  chartSub: { fontSize: 12, color: '#6B7280', marginTop: 3 },
  chartWrap: { alignItems: 'center' },
  chartHint: {
    fontSize: 11, color: '#4B5563', textAlign: 'center',
    marginTop: 8, fontStyle: 'italic',
  },

  /* Tooltip */
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tooltipDay: {
    fontSize: 12, fontWeight: '700', color: '#FFFFFF', marginBottom: 6,
  },
  tooltipRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3,
  },
  tooltipDot: { width: 6, height: 6, borderRadius: 3 },
  tooltipVal: { fontSize: 12, color: '#D1D5DB' },
  tooltipTasks: {
    fontSize: 11, color: '#9CA3AF', marginTop: 4, fontStyle: 'italic',
  },

  legendRow: {
    flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },

  /* ─── Variable Changes ─── */
  variableCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 20,
    marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  variableTitle: {
    fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 16,
  },
  variableItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 14, padding: 14,
    marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  variableIcon: {
    width: 42, height: 42, borderRadius: 21,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  variableItemTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  variableItemSub: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  impactBadge: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
  },
  impactText: { fontSize: 10, fontWeight: '700' },

  /* ─── CTA ─── */
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 16,
    elevation: 8,
  },
  ctaBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
});
