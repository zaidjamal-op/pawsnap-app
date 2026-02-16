import { BrandColors } from '@/constants/theme';
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
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function TriggerDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trigger Analysis</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Section ─── */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.heroSection}>
          <View style={styles.lagBadge}>
            <MaterialIcons name="schedule" size={14} color={BrandColors.primary} />
            <Text style={styles.lagText}>+48h lag detected</Text>
          </View>
          
          <View>
             <Text style={styles.heroTitleMain}>High</Text>
             <Text style={[styles.heroTitleSub, { color: BrandColors.primary }]}>Humidity</Text>
          </View>
        </Animated.View>

        {/* ─── Context Summary ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.contextCard}>
          <View style={styles.contextIconBox}>
             <MaterialIcons name="insights" size={20} color="#60A5FA" />
          </View>
          <View style={{ flex: 1 }}>
             <Text style={styles.contextTitle}>Why this appears</Text>
             <Text style={styles.contextDesc}>
               We've detected a <Text style={{ color: BrandColors.primary, fontWeight: '700' }}>78% correlation</Text> between local humidity levels rising above 60% and itch spikes appearing two days later.
             </Text>
          </View>
        </Animated.View>

        {/* ─── Chart Placeholder ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.chartContainer}>
           <LinearGradient
             colors={['rgba(31, 41, 55, 0.6)', 'rgba(17, 24, 39, 0.9)']}
             style={styles.chartGradient}
           >
              {/* Chart Content Overlay */}
              <View style={styles.chartOverlay}>
                 <View>
                    <Text style={styles.chartLabel}>Avg Severity</Text>
                    <Text style={styles.chartValue}>Moderate</Text>
                 </View>
                 
                 {/* Visual Bars */}
                 <View style={styles.chartBars}>
                    <View style={[styles.chartBar, { height: 16, backgroundColor: 'rgba(45,212,191,0.3)' }]} />
                    <View style={[styles.chartBar, { height: 24, backgroundColor: 'rgba(45,212,191,0.5)' }]} />
                    <View style={[styles.chartBar, { height: 32, backgroundColor: BrandColors.primary }]} />
                    <View style={[styles.chartBar, { height: 20, backgroundColor: 'rgba(45,212,191,0.5)' }]} />
                    <View style={[styles.chartBar, { height: 12, backgroundColor: 'rgba(45,212,191,0.2)' }]} />
                 </View>
              </View>
           </LinearGradient>
        </Animated.View>

        {/* ─── Evidence Section ─── */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Examples from last 30 days</Text>
           <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.evidenceList}>
           {/* Item 1 */}
           <TouchableOpacity style={styles.evidenceItem} activeOpacity={0.7}>
              <View style={styles.evidenceLeft}>
                 <View style={styles.evidenceIconWrapper}>
                    <View style={styles.evidenceIconBox}>
                       <Ionicons name="water" size={16} color="#93C5FD" />
                    </View>
                    <View style={styles.evidenceSubIcon}>
                       <Ionicons name="paw" size={10} color="#F87171" />
                    </View>
                 </View>
                 <View>
                    <Text style={styles.evidenceDate}>Oct 12 (Rainy)</Text>
                    <View style={styles.spikeRow}>
                       <Ionicons name="arrow-forward" size={12} color="#9CA3AF" />
                       <Text style={styles.spikeText}>Spike on Oct 14</Text>
                    </View>
                 </View>
              </View>
              <View style={styles.evidenceRight}>
                 <Text style={[styles.evidenceSeverity, { color: '#F87171' }]}>High Itch</Text>
                 <Text style={styles.evidenceScore}>Severity 8/10</Text>
              </View>
           </TouchableOpacity>

           {/* Item 2 */}
           <TouchableOpacity style={styles.evidenceItem} activeOpacity={0.7}>
              <View style={styles.evidenceLeft}>
                 <View style={styles.evidenceIconWrapper}>
                    <View style={[styles.evidenceIconBox, { borderColor: '#4B5563' }]}>
                       <Ionicons name="thunderstorm" size={16} color="#9CA3AF" />
                    </View>
                    <View style={styles.evidenceSubIcon}>
                       <Ionicons name="paw" size={10} color="#FB923C" />
                    </View>
                 </View>
                 <View>
                    <Text style={styles.evidenceDate}>Sep 28 (Storm)</Text>
                    <View style={styles.spikeRow}>
                       <Ionicons name="arrow-forward" size={12} color="#9CA3AF" />
                       <Text style={styles.spikeText}>Spike on Sep 30</Text>
                    </View>
                 </View>
              </View>
              <View style={styles.evidenceRight}>
                 <Text style={[styles.evidenceSeverity, { color: '#FB923C' }]}>Med Itch</Text>
                 <Text style={styles.evidenceScore}>Severity 5/10</Text>
              </View>
           </TouchableOpacity>
        </Animated.View>

        {/* ─── Recommendations ─── */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.recCard}>
           <LinearGradient
              colors={['rgba(17,24,39,1)', 'rgba(31,41,55,0.8)']}
              style={styles.recGradient}
           >
              <View style={styles.recHeader}>
                 <MaterialIcons name="tips-and-updates" size={20} color={BrandColors.primary} />
                 <Text style={styles.recTitle}>What to do next</Text>
              </View>

              <View style={styles.recList}>
                 {/* Rec 1 */}
                 <View style={styles.recItem}>
                    <View style={styles.bullet} />
                    <View style={{ flex: 1 }}>
                       <Text style={styles.recItemTitle}>Consider a dehumidifier</Text>
                       <Text style={styles.recItemDesc}>
                          Placing a dehumidifier in sleeping areas can significantly reduce environmental triggers during rainy seasons.
                       </Text>
                    </View>
                 </View>

                 <View style={styles.divider} />

                 {/* Rec 2 */}
                 <View style={styles.recItem}>
                    <View style={styles.bullet} />
                    <View style={{ flex: 1 }}>
                       <Text style={styles.recItemTitle}>Wipe coat after walks</Text>
                       <Text style={styles.recItemDesc}>
                          Damp fur can trap allergens. A thorough towel dry or blow dry after outdoor activity helps minimize exposure.
                       </Text>
                    </View>
                 </View>
              </View>

              <TouchableOpacity style={styles.addProtocolBtn} activeOpacity={0.8}>
                 <Text style={styles.addProtocolText}>Add to Protocol</Text>
                 <MaterialIcons name="add-circle" size={18} color="#0B0F14" />
              </TouchableOpacity>
           </LinearGradient>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(11,15,20,0.95)',
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

  /* Hero */
  heroSection: { marginBottom: 24 },
  lagBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(45,212,191,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
    marginBottom: 16,
  },
  lagText: { fontSize: 11, fontWeight: '800', color: BrandColors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  heroTitleMain: { fontSize: 42, fontWeight: '800', color: '#FFFFFF', lineHeight: 46 },
  heroTitleSub: { fontSize: 42, fontWeight: '800', lineHeight: 46 },

  /* Context */
  contextCard: {
     flexDirection: 'row', alignItems: 'flex-start', gap: 16,
     backgroundColor: BrandColors.surface,
     borderRadius: 24,
     padding: 20,
     marginBottom: 32,
     borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  contextIconBox: {
     width: 40, height: 40, borderRadius: 20,
     backgroundColor: 'rgba(59,130,246,0.1)',
     justifyContent: 'center', alignItems: 'center',
  },
  contextTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  contextDesc: { fontSize: 14, color: '#9CA3AF', lineHeight: 22 },

  /* Chart */
  chartContainer: {
     height: 160,
     borderRadius: 24,
     overflow: 'hidden', // Clip the gradient/bg
     marginBottom: 32,
     borderWidth: 1, borderColor: '#1F2937',
     backgroundColor: '#111827',
  },
  chartGradient: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  chartOverlay: {
     flexDirection: 'row',
     alignItems: 'flex-end',
     justifyContent: 'space-between',
  },
  chartLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  chartValue: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  chartBar: { width: 8, borderRadius: 2 },

  /* Evidence */
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: BrandColors.primary },
  
  evidenceList: { gap: 12, marginBottom: 32 },
  evidenceItem: {
     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
     backgroundColor: BrandColors.surface,
     borderRadius: 24,
     padding: 16,
     borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  evidenceLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  evidenceIconWrapper: { position: 'relative' },
  evidenceIconBox: {
     width: 40, height: 40, borderRadius: 20,
     backgroundColor: '#1F2937',
     justifyContent: 'center', alignItems: 'center',
     borderWidth: 1, borderColor: '#374151',
  },
  evidenceSubIcon: {
     position: 'absolute', bottom: -2, right: -2,
     width: 16, height: 16, borderRadius: 8,
     backgroundColor: BrandColors.background,
     justifyContent: 'center', alignItems: 'center',
  },
  evidenceDate: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginBottom: 2 },
  spikeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  spikeText: { fontSize: 12, color: '#9CA3AF' },
  
  evidenceRight: { alignItems: 'flex-end' },
  evidenceSeverity: { fontSize: 12, fontWeight: '700', marginBottom: 2 },
  evidenceScore: { fontSize: 10, color: '#6B7280' },

  /* Recommendations */
  recCard: {
     borderRadius: 24,
     overflow: 'hidden',
     borderWidth: 1, borderColor: '#1F2937',
  },
  recGradient: { padding: 20 },
  recHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  recTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  recList: { gap: 0, marginBottom: 24 },
  recItem: { flexDirection: 'row', gap: 12 },
  bullet: { width: 8, height: 8, borderRadius: 4, backgroundColor: BrandColors.primary, marginTop: 6 },
  recItemTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  recItemDesc: { fontSize: 12, color: '#9CA3AF', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#374151', marginVertical: 16, marginLeft: 20 },
  
  addProtocolBtn: {
     flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
     backgroundColor: BrandColors.primary,
     height: 48, borderRadius: 16,
  },
  addProtocolText: { fontSize: 14, fontWeight: '700', color: '#0B0F14' },
});
