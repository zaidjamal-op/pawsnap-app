import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgGradient,
  Path,
  Stop,
} from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');
const CHART_W = SCREEN_W - 64; // px-4 padding + p-5 card padding
const CHART_H = 140;

/* ─── Chart data (4-week itch trend) ─── */
const CHART_DATA = [
  { label: 'Week 1', value: 3.5 },
  { label: 'Week 2', value: 6.8 },
  { label: 'Week 3', value: 4.2 },
  { label: 'Week 4', value: 7.5 },
];

const MAX_VALUE = 10;

function generateSmoothPath(
  data: typeof CHART_DATA,
  width: number,
  height: number,
  maxVal: number
) {
  if (data.length < 2) return '';
  const pad = 12;
  const usableW = width - pad * 2;
  const usableH = height - 8;

  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * usableW,
    y: usableH - (d.value / maxVal) * usableH + 4,
  }));

  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 3;
    const cp1y = p0.y;
    const cp2x = p0.x + (2 * (p1.x - p0.x)) / 3;
    const cp2y = p1.y;
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }
  return path;
}

/* ─── Clinical findings ─── */
const FINDINGS = [
  'Physical examination shows normal heart rate and respiratory rhythm.',
  'Slight sensitivity in the lower abdominal region noted during palpation.',
  'Dental health is excellent; no signs of plaque or gingivitis.',
];

/* ─── Photo URLs (mock) ─── */
const PHOTOS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDda_D_zDdFFjtyh7MWJ0wQ40wWUere2Kh3_j1RHdmvSLcmlSY-kKUhLmCSD1Dz1Mr4hXe_hnDBnlMV_puwdwjyjDYvD_GJCzSFVf6F8NWbmCATDSNscIEXpcjtLZbZc0jOf2I-1TXciTV1AmMdiLv4cFl0Yfg_ftrUy4BsRLuzJCQGyUXbpGc6mUCeehee768hxGIiYQ9fKggRvAJRhRHjzNqhZsuKoFzROV6_SdkHWZUEG_hJ0r6K3pRNsqMwKvUywTb8kTIWFUgs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfGnzYsF8jk3uvsQ0fml5P7Ow1Y-xcqFWLna1Y7h4Ln38yo0r67BcTe1_anUo2BDDyPNcgTnwSgfXfxzd6eFuWENLmWgZbtopTd_XDZdgltYwctOvbPrLtNgKdnWmRg6PUm0dBV8kRJ3GxFW5BqfOezl9nM2dSeJbjAXAl8fxS3xQi5YKAxux7CveqOeadZmBLUIv1D_-0iQaSqwWYMZmhGLGJwOPmgRixpKbblNIWadTmYa-iOaGOjhZ3RQXR4Ar7wTCVqbgZTIL0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAL1ApXBRSlrRwuTaS9YcNQzIjP6VIUiTTFU-hSPzoosKbof7JVGP4qAWznZ5Z3xjhhbzLqND3cvlzypV8kyq-Gfg7Yg2frrk52kJcvUozBOUKhgGdrsBHAKSJSRJP_GgfYN2hyYS0jmcW8ziBAxR50X90wKBSurtVDLF2N3AprTT42nWrp3GRwFZU_vxPHBhg9E_smjtuhffMW5FsNTDOlMy-MsKMHNEq1Tx_4zWJtm1DJRp9COjHfXHhVxaGJcbwCMk_3Sf0C5wDU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD16Wq1HJ_eZdQ_CkQVJAlIzVMcIwWLN55KRY6_lpTLjsRBB0THixDZMYyRfE3Z6XO-VIx8TGF4g9Y0VTFQgx_w6QseRruZR4osX55FxETf3mD58UfbrvdiyBaWWroSHEXOwv_Zso-4_o5HoZjQv5QmmUwRw31ygBRmanXdyK8kd3F-n7KIcZHPdNnA_OR1HzNAT-aLSoxcHdP6eHovcpCxOhuxT9pf8V-bOlTSNd60i5nQCUFwR0QLyaVaZtYWrWH0m5VLlTDtiM5f',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBHPbKNWwB23kyM63vu_zH6lKKkl0XT9d6aQzzMupu96y0JLcg-qOrKPU6jCo9YWMvQNvrQpGnzwfmgSomcWT33J6N2e7XSwda6sCc5fI6ACB2MBThDJGPc5PArpEmX5q5fvEjaoiZFFXIDlzVTH2wY8h3YMFKnH0IDfg4ifi57K5-C75e-YFOuV6miwTo72j_XlcE-0AeoQPhHW8cgpCDrpjd0L0E2VYCLTZXUkztzddw3yCDsnLpstjnH0e1lxB6qA7lYWftml6eW',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDL-vPyqKvufXU6k-aPEFUJXLeNvHNvaE_sy51RL_YmKWZB7royYFSM1pQjh4v0UYQjL8fmagU-u2E9aYw4CKW47g75gYK8iWD_w7jadsoZJ95GxoohFHOyuTFQq1bFENhEp_JBi7eM3G8wmxnNFLUQ9mJ19du2pmtZUnyMGiyLV__3KSByhnGhK8umK5HNj237EhshK2JD1lm6D5C9KkSWnksqgNbYmTv2bg_Rjw8tGNwKWrh1ull6_kvCX1W5uZPIzLvzODS7IC2I',
];

export default function ReportPreviewScreen() {
  const router = useRouter();

  /* Chart paths */
  const linePath = generateSmoothPath(CHART_DATA, CHART_W, CHART_H, MAX_VALUE);
  const fillPath = linePath
    ? `${linePath} L ${CHART_W - 12 + (12)},${CHART_H} L 12,${CHART_H} Z`
    : '';

  /* Chart data points for circles */
  const pad = 12;
  const usableW = CHART_W - pad * 2;
  const usableH = CHART_H - 8;
  const chartPoints = CHART_DATA.map((d, i) => ({
    x: pad + (i / (CHART_DATA.length - 1)) * usableW,
    y: usableH - (d.value / MAX_VALUE) * usableH + 4,
  }));

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <ScreenHeader
        title="Report Preview"
        rightElement={
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>PREMIUM</Text>
          </View>
        }
      />

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Itch Trend Section ── */}
        <Section title="ITCH TREND" delay={0}>
          <View style={styles.chartCard}>
            {/* Chart header */}
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartLabel}>Average Intensity</Text>
                <Text style={styles.chartValue}>High</Text>
              </View>
              <View style={styles.chartTrendWrap}>
                <View style={styles.trendBadge}>
                  <Ionicons name="trending-up" size={14} color="#34D399" />
                  <Text style={styles.trendText}>+12%</Text>
                </View>
                <Text style={styles.trendSub}>VS LAST 30 DAYS</Text>
              </View>
            </View>

            {/* SVG Chart */}
            <View style={styles.chartWrap}>
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[styles.gridLine, { top: (i / 3) * CHART_H }]}
                />
              ))}

              <Svg
                width={CHART_W}
                height={CHART_H}
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              >
                <Defs>
                  <SvgGradient id="itchFill" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={BrandColors.primary} stopOpacity={0.3} />
                    <Stop offset="100%" stopColor={BrandColors.primary} stopOpacity={0} />
                  </SvgGradient>
                </Defs>
                {fillPath ? <Path d={fillPath} fill="url(#itchFill)" /> : null}
                {linePath ? (
                  <Path
                    d={linePath}
                    fill="none"
                    stroke={BrandColors.primary}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : null}
                {chartPoints.map((pt, i) => (
                  <Circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={4}
                    fill={BrandColors.primary}
                  />
                ))}
              </Svg>
            </View>

            {/* Week labels */}
            <View style={styles.weekLabels}>
              {CHART_DATA.map((d) => (
                <Text key={d.label} style={styles.weekLabel}>
                  {d.label.toUpperCase()}
                </Text>
              ))}
            </View>
          </View>
        </Section>

        {/* ── Observation Summary ── */}
        <Section title="OBSERVATION SUMMARY" delay={100}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryIcon}>
                <Ionicons name="document-text-outline" size={20} color={BrandColors.primary} />
              </View>
              <View>
                <Text style={styles.summaryTitle}>Clinical Summary</Text>
                <Text style={styles.summaryDate}>Updated: Oct 24, 2023</Text>
              </View>
            </View>
            <Text style={styles.summaryText}>
              Patient "Luna" has shown a significant increase in pruritic behavior localized primarily to the dorsal pelvic region and ear margins. Observations indicate peaks during evening hours. Skin exhibits mild erythema with localized alopecia. No secondary infections noted during current tracking window. Recommended immediate veterinary consultation for possible allergic dermatitis.
            </Text>
          </View>
        </Section>

        {/* ── Captured Evidence ── */}
        <Section title="CAPTURED EVIDENCE" delay={200} badge="6 Photos">
          <View style={styles.photoGrid}>
            {PHOTOS.map((uri, i) => (
              <View key={i} style={styles.photoCell}>
                <Image
                  source={{ uri }}
                  style={styles.photoImg}
                  resizeMode="cover"
                />
                {i === PHOTOS.length - 1 && (
                  <View style={styles.photoOverlay}>
                    <Text style={styles.photoOverlayText}>+2 More</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* ── Bottom Actions (sticky) ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.exportBtn} activeOpacity={0.85}>
          <MaterialIcons name="picture-as-pdf" size={20} color={BrandColors.background} />
          <Text style={styles.exportBtnText}>Export PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.85} onPress={() => router.push('/report/shared')}>
          <Ionicons name="share-outline" size={20} color={BrandColors.primary} />
          <Text style={styles.shareBtnText}>Share Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Reusable section wrapper ── */
function Section({
  title,
  delay,
  badge,
  children,
}: {
  title: string;
  delay: number;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400)}
      style={styles.section}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {badge && (
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {children}
    </Animated.View>
  );
}

/* ─────────── STYLES ─────────── */
const GRAPHITE = '#1C2127';
const BORDER_SUBTLE = '#1f2937';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_SUBTLE,
    backgroundColor: BrandColors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GRAPHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  premiumBadge: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primary,
    letterSpacing: 0.5,
  },

  /* ── Section ── */
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1.5,
  },
  sectionBadge: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  sectionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primary,
  },

  /* ── Chart Card ── */
  chartCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  chartLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 28,
    fontWeight: '800',
    color: BrandColors.primary,
  },
  chartTrendWrap: { alignItems: 'flex-end' },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#34D399',
  },
  trendSub: {
    fontSize: 8,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1,
    marginTop: 2,
  },
  chartWrap: {
    width: '100%',
    height: CHART_H,
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  weekLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  weekLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 1.2,
  },

  /* ── Observation Summary Card ── */
  summaryCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  summaryDate: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  summaryText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },

  /* ── Photo Grid ── */
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  photoCell: {
    width: (SCREEN_W - 32 - 12) / 3, // px-4 padding, 2 gaps of 6
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoOverlayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* ── Bottom Bar ── */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    backgroundColor: BrandColors.background,
    borderTopWidth: 1,
    borderTopColor: BORDER_SUBTLE,
    gap: 10,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 999,
    backgroundColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  exportBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: BrandColors.background,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(45,212,191,0.5)',
    backgroundColor: 'transparent',
  },
  shareBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: BrandColors.primary,
  },
});
