import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function InsightsRecapScreen() {
  const router = useRouter();
  const [selectedDayIndex, setSelectedDayIndex] = React.useState<number | null>(null);

  // ─── Data Logic ───
  // Mock data matching Insights screen + previous week data
  const CURRENT_WEEK_DATA = [3, 4.5, 2.5, 5.5, 8, 4, 9]; 
  const LAST_WEEK_DATA = [4, 5.5, 5, 6.5, 8.5, 6, 7.5]; 
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Calculate averages
  const avgCurrent = CURRENT_WEEK_DATA.reduce((a, b) => a + b, 0) / CURRENT_WEEK_DATA.length;
  const avgLast = LAST_WEEK_DATA.reduce((a, b) => a + b, 0) / LAST_WEEK_DATA.length;
  
  // Calculate improvement (Lower itch is better)
  const improvement = avgLast - avgCurrent;
  const percentChange = Math.round((Math.abs(improvement) / avgLast) * 100);
  const isBetter = improvement > 0;
  
  // Chart scaling
  const MAX_VAL = 10; // Max itch level (10 = 100%)

  // Handle bar press
  const handleBarPress = (index: number) => {
    // Toggle: if clicking same bar, deselect. Else select new.
    if (selectedDayIndex === index) {
        setSelectedDayIndex(null);
    } else {
        setSelectedDayIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <ScreenHeader title="Insights Recap" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Section: Itch Levels ─── */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.heroCard}>
           {/* Decorative Blur (Simulated with absolute view + heavy opacity/color) */}
           <View style={styles.heroDecorBlob} />

           <View style={styles.heroHeader}>
              <Text style={styles.heroLabel}>ITCH LEVELS VS LAST WEEK</Text>
              <View style={styles.heroIconBox}>
                 <MaterialIcons name="analytics" size={20} color={BrandColors.primary} />
              </View>
           </View>
           
           <View style={styles.heroStatRow}>
              <Text style={styles.heroBigStat}>{percentChange}%</Text>
              <View style={[styles.betterBadge, !isBetter && { backgroundColor: 'rgba(248,113,113,0.1)' }]}>
                 <MaterialIcons 
                    name={isBetter ? "arrow-downward" : "arrow-upward"} 
                    size={16} 
                    color={isBetter ? BrandColors.primary : '#F87171'} 
                 />
                 <Text style={[styles.betterText, !isBetter && { color: '#F87171' }]}>
                    {isBetter ? 'Better' : 'Worse'}
                 </Text>
              </View>
           </View>

           <Text style={styles.heroDesc}>
              {isBetter 
                ? "Great news! Your pet's scratching frequency has dropped significantly compared to the previous 7 days."
                : "Heads up! Your pet's scratching frequency has increased compared to the previous 7 days."
              }
           </Text>

           {/* Mini Bar Chart */}
           <View style={styles.miniChartContainer}>
              {CURRENT_WEEK_DATA.map((val, i) => {
                 const isToday = i === CURRENT_WEEK_DATA.length - 1;
                 const isSelected = selectedDayIndex === i;
                 // Calculate percentage (0-10 scale -> 0-100%)
                 const percentageValue = Math.round((val / MAX_VAL) * 100);
                 const heightPercent = `${percentageValue}%` as any;
                 
                 // Opacity logic: 
                 // If a bar is selected, dim others. 
                 // If none selected, keep original gradient opacity.
                 let opacity = 0.3 + (i * 0.1); 
                 if (selectedDayIndex !== null) {
                    opacity = isSelected ? 1 : 0.2;
                 } else if (isToday) {
                    opacity = 1;
                 }

                 return (
                    <View key={i} style={styles.barColumn}>
                        {/* Tooltip (Conditional) */}
                        {isSelected && (
                            <Animated.View entering={FadeInDown.duration(200)} style={styles.tooltipParams}>
                                <View style={styles.tooltipBubble}>
                                    <Text style={styles.tooltipText}>{percentageValue}%</Text>
                                </View>
                                <View style={styles.tooltipTriangle} />
                            </Animated.View>
                        )}

                        <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={() => handleBarPress(i)}
                            style={[
                                styles.miniBarWrapper, 
                                isToday && styles.currentDayWrapper,
                                isSelected && styles.selectedDayWrapper
                            ]}
                        >
                           <View 
                              style={[
                                 styles.miniBar, 
                                 { height: heightPercent, opacity: opacity }
                              ]} 
                           />
                        </TouchableOpacity>
                    </View>
                 );
              })}
           </View>
           
           <View style={styles.chartLabels}>
              {DAYS.map((d, i) => (
                  <Text key={i} style={[
                      styles.chartLabelText,
                      i === DAYS.length - 1 && { color: BrandColors.primary }
                  ]}>{d}</Text>
              ))}
           </View>
        </Animated.View>

        {/* ─── Top Triggers ─── */}
        <Text style={styles.sectionTitle}>Top Triggers this Week</Text>
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.triggersList}>
           {/* Grass */}
           <View style={styles.triggerCard}>
              <View style={styles.triggerLeft}>
                 <View style={[styles.triggerIconBox, { backgroundColor: 'rgba(74,222,128,0.1)' }]}>
                    <MaterialIcons name="grass" size={24} color="#4ADE80" />
                 </View>
                 <View>
                    <Text style={styles.triggerName}>Grass</Text>
                    <Text style={styles.triggerSub}>High pollen count detected</Text>
                 </View>
              </View>
              <View style={[styles.impactBadge, { backgroundColor: 'rgba(248,113,113,0.1)' }]}>
                 <Text style={[styles.impactText, { color: '#F87171' }]}>High Impact</Text>
              </View>
           </View>

           {/* Humidity */}
           <View style={styles.triggerCard}>
              <View style={styles.triggerLeft}>
                 <View style={[styles.triggerIconBox, { backgroundColor: 'rgba(96,165,250,0.1)' }]}>
                    <Ionicons name="water" size={24} color="#60A5FA" />
                 </View>
                 <View>
                    <Text style={styles.triggerName}>High Humidity</Text>
                    <Text style={styles.triggerSub}>Avg. 85% this week</Text>
                 </View>
              </View>
              <View style={[styles.impactBadge, { backgroundColor: 'rgba(251,146,60,0.1)' }]}>
                 <Text style={[styles.impactText, { color: '#FB923C' }]}>Medium Impact</Text>
              </View>
           </View>
        </Animated.View>

        {/* ─── Suggested Next Step ─── */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Suggested Next Step</Text>
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
           <LinearGradient
              colors={['rgba(55, 65, 81, 1)', 'rgba(17, 24, 39, 1)']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.protocolCardGradient}
           >
              {/* Inner content */}
              <View style={styles.protocolContent}>
                 <View style={styles.protocolHeader}>
                    <View style={styles.protocolIconCircle}>
                       <MaterialIcons name="medical-services" size={24} color={BrandColors.background} />
                    </View>
                    <View style={{ flex: 1 }}>
                       <Text style={styles.protocolTitle}>Paws-Wipe Protocol</Text>
                       <Text style={styles.protocolDesc}>
                          Start a 14-day routine to confirm if wiping paws reduces grass allergy symptoms.
                       </Text>
                    </View>
                 </View>

                 <TouchableOpacity style={styles.startProtocolBtn} activeOpacity={0.8}>
                    <Text style={styles.startProtocolText}>Start Protocol</Text>
                    <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
                 </TouchableOpacity>
              </View>
           </LinearGradient>
        </Animated.View>

        {/* ─── View Full Insights Button ─── */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={{ marginTop: 40 }}>
           <TouchableOpacity
              style={styles.fullInsightsBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/likely-associations/gated')}
           >
              <Text style={styles.fullInsightsText}>View Full Insights</Text>
           </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    zIndex: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  headerBtn: {
     width: 40, height: 40,
     borderRadius: 20,
     justifyContent: 'center', alignItems: 'center',
     backgroundColor: 'rgba(255,255,255,0.05)',
  },

  scroll: { flex: 1 },
  scrollContent: { padding: 24 },

  /* Hero Section */
  heroCard: {
     backgroundColor: BrandColors.surface,
     borderRadius: 24,
     padding: 24,
     marginBottom: 32,
     position: 'relative',
     overflow: 'hidden',
     borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  heroDecorBlob: {
     position: 'absolute', top: -40, right: -40,
     width: 128, height: 128, borderRadius: 64,
     backgroundColor: BrandColors.primary,
     opacity: 0.05,
  },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  heroLabel: { fontSize: 12, fontWeight: '600', color: '#9CA3AF', letterSpacing: 0.5 },
  heroIconBox: {
     padding: 8, borderRadius: 999,
     backgroundColor: 'rgba(45,212,191,0.1)',
  },
  heroStatRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, marginBottom: 16 },
  heroBigStat: { fontSize: 48, fontWeight: '800', color: '#FFFFFF' },
  betterBadge: {
     flexDirection: 'row', alignItems: 'center', gap: 4,
     backgroundColor: 'rgba(45,212,191,0.1)',
     paddingHorizontal: 12, paddingVertical: 6,
     borderRadius: 999,
  },
  betterText: { fontSize: 14, fontWeight: '700', color: BrandColors.primary },
  
  heroDesc: { fontSize: 14, color: '#9CA3AF', lineHeight: 22, marginBottom: 24 },

  /* Mini Chart */
  miniChartContainer: {
     flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
     height: 64, gap: 8,
     marginBottom: 8,
  },
  miniBarWrapper: {
     width: '100%', 
     height: '100%',
     backgroundColor: '#1F2937', // dark track
     borderTopLeftRadius: 8, borderTopRightRadius: 8,
     overflow: 'hidden',
     justifyContent: 'flex-end',
  },
  miniBar: {
     width: '100%',
     backgroundColor: BrandColors.primary,
     // height set inline
  },
  currentDayWrapper: {
     borderWidth: 2, borderColor: 'rgba(45,212,191,0.5)',
     backgroundColor: 'transparent',
  },
  
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  chartLabelText: { fontSize: 10, fontWeight: '600', color: '#6B7280' },

  barColumn: { 
    flex: 1, 
    height: '100%', 
    position: 'relative', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    marginHorizontal: 2, // Space between bars
  },
  selectedDayWrapper: {
     borderColor: BrandColors.primary,
     borderWidth: 2,
     backgroundColor: 'rgba(45,212,191,0.05)',
  },
  tooltipParams: {
    position: 'absolute',
    top: -34, // Above the bar
    alignItems: 'center',
    zIndex: 20,
    width: 60,
  },
  tooltipBubble: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipText: {
    color: '#1F2937', 
    fontSize: 10, 
    fontWeight: '800'
  },
  tooltipTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -1, 
  },

  /* Triggers */
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  triggersList: { gap: 12 },
  triggerCard: {
     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
     backgroundColor: BrandColors.surface,
     padding: 16, borderRadius: 20,
     borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  triggerLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  triggerIconBox: {
     width: 48, height: 48, borderRadius: 16,
     justifyContent: 'center', alignItems: 'center',
  },
  triggerName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  triggerSub: { fontSize: 12, color: '#9CA3AF' },
  impactBadge: {
     paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  impactText: { fontSize: 10, fontWeight: '700' },

  /* Protocol */
  protocolCardGradient: {
     borderRadius: 24,
     padding: 1, // for border effect if needed, otherwise just bg
     borderColor: '#374151', borderWidth: 1,
  },
  protocolContent: {
     backgroundColor: 'rgba(255,255,255,0.03)', // subtle overlay
     borderRadius: 23,
     padding: 20,
  },
  protocolHeader: { flexDirection: 'row', gap: 16, alignItems: 'flex-start', marginBottom: 20 },
  protocolIconCircle: {
     width: 48, height: 48, borderRadius: 24,
     backgroundColor: BrandColors.primary,
     justifyContent: 'center', alignItems: 'center',
     shadowColor: BrandColors.primary, shadowOpacity: 0.3, shadowRadius: 10,
  },
  protocolTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  protocolDesc: { fontSize: 13, color: '#D1D5DB', lineHeight: 20 },
  
  startProtocolBtn: {
     flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
     backgroundColor: 'rgba(255,255,255,0.1)',
     paddingVertical: 14, borderRadius: 12,
     borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  startProtocolText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },

  /* Footer Btn */
  fullInsightsBtn: {
     backgroundColor: BrandColors.primary,
     paddingVertical: 18, borderRadius: 999,
     alignItems: 'center',
     shadowColor: BrandColors.primary, shadowOpacity: 0.25, shadowRadius: 10,
     elevation: 6,
  },
  fullInsightsText: { fontSize: 18, fontWeight: '800', color: BrandColors.background },
});
