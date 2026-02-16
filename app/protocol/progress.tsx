import { BrandColors } from '@/constants/theme';
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

// ─── Realistic Mock Data (14 days) ───
// Story: Compliance starts low (user getting used to protocol), ramps up.
//        Itch score starts high, decreases as compliance improves — with realistic fluctuations.
interface DayData {
  day: number;
  label: string;
  compliance: number; // 0-100
  itch: number;       // 0-10
  date: string;
  tasks: number;      // tasks completed out of 3
}

const PROTOCOL_DATA: DayData[] = [
  { day: 1,  label: 'D1',  compliance: 33,  itch: 7,  date: 'Mon, Feb 3',  tasks: 1 },
  { day: 2,  label: 'D2',  compliance: 67,  itch: 7,  date: 'Tue, Feb 4',  tasks: 2 },
  { day: 3,  label: 'D3',  compliance: 67,  itch: 6,  date: 'Wed, Feb 5',  tasks: 2 },
  { day: 4,  label: 'D4',  compliance: 100, itch: 6,  date: 'Thu, Feb 6',  tasks: 3 },
  { day: 5,  label: 'D5',  compliance: 100, itch: 5,  date: 'Fri, Feb 7',  tasks: 3 },
  { day: 6,  label: 'D6',  compliance: 67,  itch: 6,  date: 'Sat, Feb 8',  tasks: 2 },
  { day: 7,  label: 'D7',  compliance: 100, itch: 4,  date: 'Sun, Feb 9',  tasks: 3 },
  { day: 8,  label: 'D8',  compliance: 100, itch: 4,  date: 'Mon, Feb 10', tasks: 3 },
  { day: 9,  label: 'D9',  compliance: 100, itch: 3,  date: 'Tue, Feb 11', tasks: 3 },
  { day: 10, label: 'D10', compliance: 100, itch: 4,  date: 'Wed, Feb 12', tasks: 3 },
  { day: 11, label: 'D11', compliance: 100, itch: 3,  date: 'Thu, Feb 13', tasks: 3 },
  { day: 12, label: 'D12', compliance: 100, itch: 2,  date: 'Fri, Feb 14', tasks: 3 },
  { day: 13, label: 'D13', compliance: 100, itch: 3,  date: 'Sat, Feb 15', tasks: 3 },
  { day: 14, label: 'D14', compliance: 100, itch: 2,  date: 'Sun, Feb 16', tasks: 3 },
];

// Derived stats
const avgCompliance = Math.round(
  PROTOCOL_DATA.reduce((s, d) => s + d.compliance, 0) / PROTOCOL_DATA.length
);
const currentStreak = (() => {
  let streak = 0;
  for (let i = PROTOCOL_DATA.length - 1; i >= 0; i--) {
    if (PROTOCOL_DATA[i].compliance === 100) streak++;
    else break;
  }
  return streak;
})();
const firstWeekAvgItch = PROTOCOL_DATA.slice(0, 7).reduce((s, d) => s + d.itch, 0) / 7;
const secondWeekAvgItch = PROTOCOL_DATA.slice(7).reduce((s, d) => s + d.itch, 0) / 7;
const itchReduction = Math.round(((firstWeekAvgItch - secondWeekAvgItch) / firstWeekAvgItch) * 100);

// Daily log (last 3 entries, derived)
const DAILY_LOG = PROTOCOL_DATA.slice(-3).reverse().map((d, i) => {
  const itchLabel = d.itch <= 3 ? 'Low Itch' : d.itch <= 5 ? 'Mild Itch' : 'Moderate Itch';
  const timeLabel = i === 0 ? 'Today, 8:00 AM' : i === 1 ? 'Yesterday, 8:15 AM' : '2 days ago, 9:00 AM';
  return { med: 'Apoquel (16mg)', time: timeLabel, itch: itchLabel, score: `${d.itch}/10` };
});

// ─── Chart Setup ───
const SCREEN_W = Dimensions.get('window').width;
const CHART_CARD_PAD = 20;
const CHART_W = SCREEN_W - 40 - CHART_CARD_PAD * 2; // container px - card px
const CHART_H = 180;
const PAD = { top: 12, right: 12, bottom: 4, left: 36 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

// Stat ring constants
const STAT_RING = 56;
const STAT_STROKE = 4;
const STAT_R = (STAT_RING - STAT_STROKE) / 2;
const STAT_C = 2 * Math.PI * STAT_R;
const STAT_OFFSET = STAT_C * (1 - avgCompliance / 100);

// ─── Chart Helpers ───
function getPoint(index: number, value: number, maxVal: number) {
  const x = PAD.left + (index / (PROTOCOL_DATA.length - 1)) * PLOT_W;
  const y = PAD.top + PLOT_H * (1 - value / maxVal);
  return { x, y };
}

function buildSmoothPath(data: number[], maxVal: number): string {
  const points = data.map((v, i) => getPoint(i, v, maxVal));
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    d += ` C${cpx1.toFixed(1)} ${prev.y.toFixed(1)}, ${cpx2.toFixed(1)} ${curr.y.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
  }
  return d;
}

function buildAreaPath(data: number[], maxVal: number): string {
  const linePath = buildSmoothPath(data, maxVal);
  const lastPoint = getPoint(data.length - 1, data[data.length - 1], maxVal);
  const firstPoint = getPoint(0, data[0], maxVal);
  const bottom = PAD.top + PLOT_H;
  return `${linePath} L${lastPoint.x.toFixed(1)} ${bottom} L${firstPoint.x.toFixed(1)} ${bottom} Z`;
}

// X-axis labels (show every other day to avoid crowding)
const X_LABELS = PROTOCOL_DATA.filter((_, i) => i % 2 === 0 || i === PROTOCOL_DATA.length - 1);

export default function ProtocolProgressScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

  const complianceValues = PROTOCOL_DATA.map((d) => d.compliance);
  const itchValues = PROTOCOL_DATA.map((d) => (d.itch / 10) * 100); // normalize to 0-100 for chart

  const selectedData = selectedDay !== null ? PROTOCOL_DATA[selectedDay] : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Protocol Progress</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Key Stats ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.statsRow}>
          {/* Compliance Ring */}
          <View style={styles.statCard}>
            <View style={styles.statRingWrap}>
              <Svg width={STAT_RING} height={STAT_RING}>
                <Circle
                  cx={STAT_RING / 2} cy={STAT_RING / 2} r={STAT_R}
                  stroke="rgba(55,65,81,0.4)" strokeWidth={STAT_STROKE} fill="transparent"
                />
                <Circle
                  cx={STAT_RING / 2} cy={STAT_RING / 2} r={STAT_R}
                  stroke={BrandColors.primary} strokeWidth={STAT_STROKE} fill="transparent"
                  strokeDasharray={STAT_C} strokeDashoffset={STAT_OFFSET}
                  strokeLinecap="round" rotation="-90"
                  origin={`${STAT_RING / 2}, ${STAT_RING / 2}`}
                />
              </Svg>
              <Text style={styles.statRingText}>{avgCompliance}%</Text>
            </View>
            <Text style={styles.statLabel}>Compliance</Text>
          </View>

          {/* Streak */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: 'rgba(249,115,22,0.15)' }]}>
              <MaterialIcons name="local-fire-department" size={26} color="#F97316" />
            </View>
            <Text style={styles.statValue}>{currentStreak} Days</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>

          {/* Itch Reduction */}
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, { backgroundColor: 'rgba(45,212,191,0.12)' }]}>
              <MaterialIcons name="trending-down" size={26} color={BrandColors.primary} />
            </View>
            <Text style={styles.statValue}>↓{itchReduction}%</Text>
            <Text style={styles.statLabel}>Itch Reduced</Text>
          </View>
        </Animated.View>

        {/* ─── Chart Card ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.chartCard}>
          {/* Title row */}
          <View style={styles.chartTitleRow}>
            <View>
              <Text style={styles.chartTitle}>Compliance vs Itch</Text>
              <Text style={styles.chartSub}>Last 14 Days</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: BrandColors.primary }]} />
                <Text style={styles.legendText}>Compliance</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.legendText}>Itch Score</Text>
              </View>
            </View>
          </View>

          {/* Tooltip */}
          {selectedData && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipDate}>{selectedData.date}</Text>
              <View style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: BrandColors.primary }]} />
                <Text style={styles.tooltipVal}>Compliance: {selectedData.compliance}%</Text>
              </View>
              <View style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.tooltipVal}>Itch: {selectedData.itch}/10</Text>
              </View>
              <Text style={styles.tooltipTasks}>{selectedData.tasks}/3 tasks done</Text>
            </View>
          )}

          {/* SVG Chart */}
          <View style={styles.chartContainer}>
            <Svg width={CHART_W} height={CHART_H + 28}>
              <Defs>
                <SvgGradient id="compFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={BrandColors.primary} stopOpacity="0.2" />
                  <Stop offset="1" stopColor={BrandColors.primary} stopOpacity="0.01" />
                </SvgGradient>
                <SvgGradient id="itchFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#EF4444" stopOpacity="0.1" />
                  <Stop offset="1" stopColor="#EF4444" stopOpacity="0" />
                </SvgGradient>
              </Defs>

              {/* Horizontal grid lines */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = PAD.top + PLOT_H * (1 - val / 100);
                return (
                  <React.Fragment key={val}>
                    <SvgLine
                      x1={PAD.left} y1={y} x2={CHART_W - PAD.right} y2={y}
                      stroke="rgba(255,255,255,0.04)" strokeWidth={1}
                    />
                    <SvgText x={0} y={y + 3} fontSize={9} fill="#4B5563" fontWeight="500">
                      {val}%
                    </SvgText>
                  </React.Fragment>
                );
              })}

              {/* Area fills */}
              <Path d={buildAreaPath(complianceValues, 100)} fill="url(#compFill)" />
              <Path d={buildAreaPath(itchValues, 100)} fill="url(#itchFill)" />

              {/* Itch score line */}
              <Path
                d={buildSmoothPath(itchValues, 100)}
                stroke="#EF4444" strokeWidth={2} fill="none"
                strokeDasharray="6,4" opacity={0.5}
                strokeLinecap="round"
              />

              {/* Compliance line */}
              <Path
                d={buildSmoothPath(complianceValues, 100)}
                stroke={BrandColors.primary} strokeWidth={3} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
              />

              {/* Selected day vertical line */}
              {selectedDay !== null && (() => {
                const pt = getPoint(selectedDay, complianceValues[selectedDay], 100);
                return (
                  <SvgLine
                    x1={pt.x} y1={PAD.top} x2={pt.x} y2={PAD.top + PLOT_H}
                    stroke="rgba(255,255,255,0.1)" strokeWidth={1}
                    strokeDasharray="4,3"
                  />
                );
              })()}

              {/* Data point dots for all days */}
              {PROTOCOL_DATA.map((d, i) => {
                const isSelected = selectedDay === i;
                const compPt = getPoint(i, d.compliance, 100);
                const itchPt = getPoint(i, (d.itch / 10) * 100, 100);
                return (
                  <React.Fragment key={i}>
                    {/* Itch dot */}
                    <Circle
                      cx={itchPt.x} cy={itchPt.y}
                      r={isSelected ? 5 : 3}
                      fill={isSelected ? '#EF4444' : BrandColors.background}
                      stroke="#EF4444"
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
                      x={compPt.x - (PLOT_W / PROTOCOL_DATA.length) / 2}
                      y={0}
                      width={PLOT_W / PROTOCOL_DATA.length}
                      height={CHART_H}
                      fill="transparent"
                      onPress={() => setSelectedDay(selectedDay === i ? null : i)}
                    />
                  </React.Fragment>
                );
              })}

              {/* X-axis labels */}
              {X_LABELS.map((d) => {
                const x = PAD.left + ((d.day - 1) / (PROTOCOL_DATA.length - 1)) * PLOT_W;
                const isToday = d.day === PROTOCOL_DATA.length;
                return (
                  <SvgText
                    key={d.day} x={x} y={CHART_H + 18}
                    fontSize={10}
                    fill={isToday ? BrandColors.primary : '#6B7280'}
                    fontWeight={isToday ? '700' : '500'}
                    textAnchor="middle"
                  >
                    {isToday ? 'Today' : d.label}
                  </SvgText>
                );
              })}
            </Svg>
          </View>

          {/* Tap hint */}
          {selectedDay === null && (
            <Text style={styles.chartHint}>Tap any data point for details</Text>
          )}
        </Animated.View>

        {/* ─── Insight Card ─── */}
        <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.insightOuter}>
          <View style={styles.insightBadge}>
            <MaterialIcons name="auto-awesome" size={12} color={BrandColors.primary} />
            <Text style={styles.insightBadgeText}>INSIGHT</Text>
          </View>

          <View style={styles.insightInner}>
            <View style={styles.insightIconCircle}>
              <MaterialIcons name="pets" size={22} color={BrandColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Great Job!</Text>
              <Text style={styles.insightDesc}>
                Since starting this protocol, itch levels dropped{' '}
                <Text style={{ color: BrandColors.primary, fontWeight: '800' }}>{itchReduction}%</Text>{' '}
                in the second week. {currentStreak}-day compliance streak is paying off!
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ─── Daily Log ─── */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <Text style={styles.sectionTitle}>DAILY LOG</Text>
        </Animated.View>

        {DAILY_LOG.map((entry, i) => (
          <Animated.View
            key={i}
            entering={FadeInDown.delay(500 + i * 70).duration(400)}
            style={[styles.logCard, i > 0 && { opacity: 0.8 }]}
          >
            <View style={styles.logLeft}>
              <View style={styles.logCheckCircle}>
                <MaterialIcons name="check" size={18} color="#4ADE80" />
              </View>
              <View>
                <Text style={styles.logMed}>{entry.med}</Text>
                <Text style={styles.logTime}>{entry.time}</Text>
              </View>
            </View>
            <View style={styles.logRight}>
              <Text style={styles.logItch}>{entry.itch}</Text>
              <Text style={styles.logScore}>Score: {entry.score}</Text>
            </View>
          </Animated.View>
        ))}

        {/* Protocol completion CTA */}
        <Animated.View entering={FadeInDown.delay(720).duration(400)} style={{ marginTop: 8 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
              backgroundColor: BrandColors.primary, paddingVertical: 16, borderRadius: 999,
              shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
            }}
            activeOpacity={0.85}
            onPress={() => router.push('/protocol/complete')}
          >
            <Text style={{ fontSize: 16, fontWeight: '800', color: BrandColors.background }}>View Protocol Summary</Text>
            <MaterialIcons name="arrow-forward" size={18} color={BrandColors.background} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
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

  /* ─── Stats ─── */
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  statRingWrap: {
    width: STAT_RING, height: STAT_RING,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative', marginBottom: 8,
  },
  statRingText: {
    position: 'absolute',
    fontSize: 13, fontWeight: '800', color: BrandColors.primary,
  },
  statIconCircle: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  statValue: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },

  /* ─── Chart Card ─── */
  chartCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: CHART_CARD_PAD,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  chartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  chartTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  chartSub: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  legendRow: { flexDirection: 'column', gap: 6, alignItems: 'flex-end' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#D1D5DB', fontWeight: '500' },
  chartContainer: { alignItems: 'center' },
  chartHint: {
    fontSize: 11, color: '#4B5563', textAlign: 'center',
    marginTop: 8, fontStyle: 'italic',
  },

  /* ─── Tooltip ─── */
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tooltipDate: {
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

  /* ─── Insight ─── */
  insightOuter: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
    marginBottom: 28,
    position: 'relative',
    overflow: 'visible',
  },
  insightBadge: {
    position: 'absolute', top: -12, left: 20,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: BrandColors.background,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
    borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 3,
    zIndex: 2,
  },
  insightBadgeText: {
    fontSize: 10, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 0.8,
  },
  insightInner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: 'rgba(17,24,39,0.6)',
    borderRadius: 18,
    padding: 18, paddingTop: 22,
  },
  insightIconCircle: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(45,212,191,0.12)',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  insightTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  insightDesc: { fontSize: 13, color: '#D1D5DB', lineHeight: 20 },

  /* ─── Daily Log ─── */
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 14, paddingLeft: 2,
  },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  logLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logCheckCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(74,222,128,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  logMed: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  logTime: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  logRight: { alignItems: 'flex-end' },
  logItch: { fontSize: 13, fontWeight: '700', color: BrandColors.primary },
  logScore: { fontSize: 11, color: '#6B7280', marginTop: 2 },
});
