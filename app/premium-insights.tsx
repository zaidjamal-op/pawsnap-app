import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

/* ─── Bar chart data ─── */
/* ─── Bar chart data ─── */
// Raw values instead of pre-calculated percentages
const BARS = [
  { day: 'M', value: 4, isFlare: false },
  { day: 'T', value: 6.5, isFlare: false },
  { day: 'W', value: 3, isFlare: false },
  { day: 'T', value: 8.5, isFlare: true }, // Peak flare
  { day: 'F', value: 5, isFlare: false },
  { day: 'S', value: 7.5, isFlare: true },
  { day: 'S', value: 4.5, isFlare: false },
];

const MAX_H = Math.max(...BARS.map((b) => b.value));

/* ─── Premium feature tags ─── */
const PREMIUM_TAGS = [
  { emoji: '🥑', label: 'Diet Analysis' },
  { emoji: '🌿', label: 'Environmental' },
  { emoji: '📋', label: 'Vet Reports' },
];

export default function PremiumInsightsScreen() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(3); // Default to peak flare (index 3)

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtnWrapper} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Weekly Summary</Text>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={14} color={BrandColors.primary} />
                <Text style={styles.headerDate}>Oct 10 – Oct 17</Text>
                <Ionicons name="chevron-down" size={14} color="rgba(148,163,184,0.6)" />
              </View>
            </View>
          </View>
          <View style={styles.avatarCircle}>
            <Image
              source={require('@/assets/images/pawsnap-logo.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
        </Animated.View>

        {/* ─── Stats Row ─── */}
        <Animated.View entering={FadeInDown.delay(100).duration(450)} style={styles.statsRow}>
          {/* Flare Days */}
          <View style={styles.statCard}>
            <View style={styles.statTopRow}>
              <Text style={styles.statLabel}>FLARE DAYS</Text>
              <Ionicons name="flame" size={16} color="#FB923C" />
            </View>
            <View style={styles.statBottomRow}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statUnit}>days this week</Text>
            </View>
          </View>

          {/* Avg Intensity */}
          <View style={[styles.statCard, styles.statCardAccent]}>
            <View style={styles.accentGlow} />
            <View style={styles.statTopRow}>
              <Text style={styles.statLabel}>AVG INTENSITY</Text>
              <Ionicons name="trending-up" size={16} color={BrandColors.primary} />
            </View>
            <View style={styles.statBottomRow}>
              <Text style={[styles.statValue, { color: BrandColors.primary }]}>6.2</Text>
              <Text style={styles.statUnit}>/ 10</Text>
            </View>
          </View>
        </Animated.View>

        {/* ─── Itch Intensity Trend (Bar Chart) ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Itch Intensity Trend</Text>
            <View style={styles.periodBadge}>
              <Text style={styles.periodText}>Last 7 Days</Text>
            </View>
          </View>

          <View style={styles.barChartWrap}>
            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[styles.barGridLine, { top: `${i * 33}%` }]}
              />
            ))}

            {/* Bars */}
            <View style={styles.barRow}>
              {BARS.map((bar, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.barColumn}
                    activeOpacity={0.8}
                    onPress={() => setSelectedIndex(i)}
                  >
                    {/* Track */}
                    <View style={[styles.barTrack, isSelected && styles.barTrackSelected]}>
                      <View style={styles.barContainer}>
                        {/* Bar Fill */}
                        <View 
                          style={[
                            styles.barFillContainer, 
                            { height: `${(bar.value / MAX_H) * 100}%` }
                          ]}
                        >
                          <View
                            style={[
                              styles.barFill,
                              {
                                backgroundColor: bar.isFlare
                                  ? 'rgba(251,146,60,0.3)'
                                  : isSelected ? `${BrandColors.primary}50` : `${BrandColors.primary}30`,
                              },
                            ]}
                          />
                          {/* Stem line */}
                          <View
                            style={[
                              styles.barStem,
                              {
                                backgroundColor: bar.isFlare ? '#FB923C' : BrandColors.primary,
                                width: isSelected ? 3 : 2, // Thicker if selected
                              },
                            ]}
                          />
                          {/* Dot at top */}
                          <View
                            style={[
                              styles.barDot,
                              {
                                backgroundColor: bar.isFlare ? '#F97316' : BrandColors.primary,
                                borderColor: BrandColors.surface, // Always surface border
                                width: bar.isFlare || isSelected ? 12 : 8,
                                height: bar.isFlare || isSelected ? 12 : 8,
                                borderRadius: bar.isFlare || isSelected ? 6 : 4,
                                borderWidth: 2,
                                shadowColor: bar.isFlare ? '#F97316' : BrandColors.primary,
                                shadowOpacity: isSelected ? 0.9 : 0.6,
                                shadowRadius: isSelected ? 10 : 6,
                                shadowOffset: { width: 0, height: 0 },
                                transform: [{ scale: isSelected ? 1.2 : 1 }],
                              },
                            ]}
                          />
                        </View>
                        
                        {/* Tooltip for selected bar */}
                         {isSelected && (
                          <View style={styles.tooltip}>
                            <Text style={styles.tooltipText}>{bar.value}</Text>
                            <View style={styles.tooltipArrow} />
                          </View>
                        )}
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.barDayLabel,
                        bar.isFlare && { color: '#FB923C', fontWeight: '700' },
                        isSelected && !bar.isFlare && { color: BrandColors.primary, fontWeight: '700' }
                      ]}
                    >
                      {bar.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Animated.View>

        {/* ─── Gated Premium Section ─── */}
        <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.gatedWrap}>
          {/* Blurred placeholder content */}
          <View style={styles.blurredContent}>
            <View style={styles.blurHeader}>
              <Ionicons name="bulb" size={18} color={BrandColors.primary} style={{ opacity: 0.3 }} />
              <Text style={[styles.chartTitle, { opacity: 0.3 }]}>Top Suspected Associations</Text>
            </View>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.fakeRow}>
                <View style={styles.fakeCircle} />
                <View style={[styles.fakeLine, { width: i === 2 ? 90 : 120 }]} />
                <View style={[styles.fakeSmall, { backgroundColor: i === 1 ? 'rgba(239,68,68,0.3)' : i === 2 ? 'rgba(234,179,8,0.3)' : 'rgba(74,222,128,0.3)' }]} />
              </View>
            ))}
          </View>

          {/* Lock overlay */}
          <LinearGradient
            colors={[
              'rgba(22,27,34,0.5)',
              'rgba(22,27,34,0.88)',
              BrandColors.surface,
            ]}
            style={styles.lockOverlay}
          >
            <View style={styles.lockIcon}>
              <Ionicons name="lock-closed" size={28} color={BrandColors.primary} />
            </View>
            <Text style={styles.lockTitle}>Detailed Trigger Analysis</Text>
            <Text style={styles.lockDesc}>
              Unlock specific trigger patterns, ranked associations, and vet-ready reports.
            </Text>

            {/* Tags */}
            <View style={styles.tagsRow}>
              {PREMIUM_TAGS.map((tag) => (
                <View key={tag.label} style={styles.premiumTag}>
                  <Text style={styles.premiumTagText}>
                    {tag.emoji} {tag.label}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.trialBtn} activeOpacity={0.85}>
              <Text style={styles.trialBtnText}>Start 7-day Free Trial</Text>
            </TouchableOpacity>
            <Text style={styles.trialCaption}>Then $4.99/mo. Cancel anytime.</Text>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(55,65,81,0.4)',
  },
  headerLeftContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backBtnWrapper: { padding: 4, marginRight: 4 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  headerDate: { fontSize: 13, fontWeight: '500', color: 'rgba(148,163,184,0.7)' },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },

  /* Stats */
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.4)',
    overflow: 'hidden',
    position: 'relative',
  },
  statCardAccent: {},
  accentGlow: {
    position: 'absolute',
    right: -16,
    top: -16,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${BrandColors.primary}12`,
  },
  statTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(148,163,184,0.6)', letterSpacing: 1 },
  statBottomRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  statValue: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  statUnit: { fontSize: 11, fontWeight: '500', color: 'rgba(148,163,184,0.5)' },

  /* Chart card */
  chartCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.4)',
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  chartTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  periodBadge: {
    backgroundColor: `${BrandColors.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  periodText: { fontSize: 11, fontWeight: '600', color: BrandColors.primary },

  /* Bar chart */
  barChartWrap: { height: 180, position: 'relative', marginTop: 10 },
  barGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(55,65,81,0.3)',
    borderStyle: 'dashed',
  },
  barRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
    paddingTop: 4,
  },
  barColumn: { flex: 1, alignItems: 'center', gap: 8 },
  barTrack: {
    width: '100%',
    height: 140, // Fixed height for track
    backgroundColor: 'rgba(31,41,55,0.4)', // Dark track
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'visible', // Visible for tooltip
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  barTrackSelected: {
    backgroundColor: 'rgba(31,41,55,0.7)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  barContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barFillContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'visible', // Visible for dot
    alignItems: 'center',
  },
  barFill: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barStem: {
    width: 2,
    height: '100%',
    position: 'absolute',
    borderRadius: 1,
  },
  barDot: {
    position: 'absolute',
    top: -6, // Adjusted for dot size
    elevation: 4,
  },
  barDayLabel: { fontSize: 10, fontWeight: '500', color: 'rgba(148,163,184,0.5)' },
  tooltip: {
    position: 'absolute',
    top: -36,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: { fontSize: 10, fontWeight: '700', color: '#000000' },
  tooltipArrow: {
    position: 'absolute',
    bottom: -4,
    width: 8,
    height: 8,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },

  /* Gated section */
  gatedWrap: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 280,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.4)',
  },
  blurredContent: {
    backgroundColor: BrandColors.surface,
    padding: 22,
    opacity: 0.25,
  },
  blurHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  fakeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(31,41,55,0.5)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  fakeCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(107,114,128,0.3)' },
  fakeLine: { height: 14, borderRadius: 4, backgroundColor: 'rgba(107,114,128,0.25)' },
  fakeSmall: { width: 28, height: 14, borderRadius: 4, marginLeft: 'auto' },

  /* Lock overlay */
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  lockIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  lockTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  lockDesc: {
    fontSize: 13,
    color: 'rgba(148,163,184,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
    marginBottom: 18,
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 },
  premiumTag: {
    backgroundColor: 'rgba(31,41,55,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
  },
  premiumTagText: { fontSize: 10, fontWeight: '600', color: 'rgba(209,213,219,0.8)' },
  trialBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    width: '100%',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20, // Increased glow
    elevation: 10,
  },
  trialBtnText: { fontSize: 15, fontWeight: '700', color: BrandColors.background },
  trialCaption: { fontSize: 10, color: 'rgba(107,114,128,0.5)', marginTop: 10 },
});
