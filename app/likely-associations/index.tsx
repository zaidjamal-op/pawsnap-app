import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

export default function LikelyAssociationsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Likely Associations</Text>
        <TouchableOpacity style={styles.premiumBadge} activeOpacity={0.8}>
           <MaterialIcons name="workspace-premium" size={20} color={BrandColors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Based on <Text style={styles.highlightText}>Buddy's</Text> itch logs over the last 30 days.
        </Text>

        {/* ─── Card 1: High Humidity ─── */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
          <View style={styles.glowOverlay} />
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(59,130,246,0.15)', borderColor: 'rgba(59,130,246,0.2)' }]}>
                <Ionicons name="water" size={24} color="#60A5FA" />
              </View>
              <View>
                <Text style={styles.cardTitle}>High Humidity</Text>
                <View style={styles.subTagRow}>
                   <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                   <Text style={styles.subTagText}>+48h lag detected</Text>
                </View>
              </View>
            </View>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>High Confidence</Text>
            </View>
          </View>

          {/* Visualization Bar */}
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '85%', backgroundColor: BrandColors.primary }]} />
          </View>

          <View style={styles.whyBox}>
            <Text style={styles.whyText}>
              <Text style={styles.whyLabel}>Why: </Text>
              Itch scores spiked significantly <Text style={styles.highlightText}>48h</Text> after local humidity levels rose above 70%.
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.footerStat}>Occurred 5 times this month</Text>
            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() => router.push('/likely-associations/trigger-details')}
            >
              <Text style={styles.detailsBtnText}>View Details</Text>
              <Ionicons name="chevron-forward" size={14} color={BrandColors.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Card 2: Grass Exposure ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(74,222,128,0.15)', borderColor: 'rgba(74,222,128,0.2)' }]}>
                <Ionicons name="leaf" size={24} color="#4ADE80" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Grass Exposure</Text>
                <View style={styles.subTagRow}>
                   <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                   <Text style={styles.subTagText}>+24h lag detected</Text>
                </View>
              </View>
            </View>
            <View style={styles.confidenceBadgeMed}>
              <Text style={styles.confidenceTextMed}>Medium Confidence</Text>
            </View>
          </View>

          {/* Visualization Bar */}
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '60%', backgroundColor: 'rgba(45,212,191,0.6)' }]} />
          </View>

          <View style={styles.whyBox}>
            <Text style={styles.whyText}>
              <Text style={styles.whyLabel}>Why: </Text>
              Moderate correlation detected between logged park visits and evening scratching sessions.
            </Text>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.footerStat}>Occurred 3 times this month</Text>
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.detailsBtnTextNeutral}>View Details</Text>
              <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Card 3: New Kibble ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={[styles.card, { opacity: 0.8 }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(251,146,60,0.15)', borderColor: 'rgba(251,146,60,0.2)' }]}>
                <Ionicons name="restaurant" size={24} color="#FB923C" />
              </View>
              <View>
                <Text style={styles.cardTitle}>New Kibble</Text>
                <View style={styles.subTagRow}>
                   <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                   <Text style={styles.subTagText}>+6h lag detected</Text>
                </View>
              </View>
            </View>
            <View style={styles.confidenceBadgeLow}>
              <Text style={styles.confidenceTextLow}>Low Confidence</Text>
            </View>
          </View>
          
          <View style={styles.whyBox}>
            <Text style={styles.whyText}>
              <Text style={styles.whyLabel}>Why: </Text>
               Data is sparse, but minor upticks occurred after switching to "Salmon Feast".
            </Text>
          </View>
        </Animated.View>

        {/* ─── Premium Footer Promo ─── */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.premiumFooter}>
           <View style={styles.premiumIconBox}>
              <MaterialIcons name="auto-graph" size={20} color={BrandColors.primary} />
           </View>
           <View>
              <Text style={styles.premiumTitle}>PREMIUM ANALYSIS</Text>
              <Text style={styles.premiumSub}>We are monitoring 12 other factors for you.</Text>
           </View>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    backgroundColor: 'rgba(11,15,20,0.95)',
    zIndex: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: BrandColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  premiumBadge: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  introText: { color: '#9CA3AF', fontSize: 14, marginBottom: 20 },
  highlightText: { color: BrandColors.primary, fontWeight: '600' },

  /* Card Styles */
  card: {
    backgroundColor: BrandColors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: BrandColors.primary,
    opacity: 0.03,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: { flexDirection: 'row', gap: 12 },
  iconBox: {
    width: 48, height: 48,
    borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  subTagRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subTagText: { fontSize: 12, color: '#9CA3AF' },

  /* Badges */
  confidenceBadge: {
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 9999,
    shadowColor: BrandColors.primary,
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  confidenceText: { fontSize: 11, fontWeight: '700', color: '#000000' },

  confidenceBadgeMed: {
    backgroundColor: BrandColors.surface,
    borderWidth: 1, borderColor: '#374151',
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 9999,
  },
  confidenceTextMed: { fontSize: 11, fontWeight: '600', color: '#D1D5DB' },

  confidenceBadgeLow: {
    backgroundColor: BrandColors.surface,
    borderWidth: 1, borderColor: '#374151',
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 9999,
  },
  confidenceTextLow: { fontSize: 11, fontWeight: '600', color: '#9CA3AF' },


  barContainer: {
    height: 8,
    backgroundColor: '#1F2937', // darker track
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 4 },

  whyBox: {
    backgroundColor: 'rgba(17,24,39,0.5)', // slightly darker inner box
    borderRadius: 12,
    padding: 16,
  },
  whyText: { fontSize: 14, color: '#D1D5DB', lineHeight: 22 },
  whyLabel: { fontWeight: '700', color: '#FFFFFF' },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  footerStat: { fontSize: 12, color: '#9CA3AF' },
  detailsBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailsBtnText: { fontSize: 13, fontWeight: '600', color: BrandColors.primary },
  detailsBtnTextNeutral: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },

  premiumFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
    backgroundColor: 'rgba(45,212,191,0.05)',
  },
  premiumIconBox: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  premiumTitle: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1, marginBottom: 2 },
  premiumSub: { fontSize: 12, color: '#9CA3AF' },
});
