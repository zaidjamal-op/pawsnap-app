import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LikelyAssociationsGatedScreen() {
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
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Likely Associations</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* ─── Blurred/Gated Content Teaser ─── */}
        <View style={styles.blurredContainer}>
          {/* Fake Card 1 */}
          <View style={styles.fakeCard}>
            <View style={styles.fakeHeader}>
               <View>
                 <Text style={styles.fakeLabel}>Top Trigger Identified</Text>
                 <View style={styles.fakeTitleRow}>
                    <Text style={styles.fakeTitle}>Grass Pollen</Text>
                    <View style={styles.fakeBadge}><Text style={styles.fakeBadgeText}>High</Text></View>
                 </View>
               </View>
               <View style={styles.fakeIcon}><Ionicons name="leaf" size={20} color={BrandColors.primary} /></View>
            </View>
            {/* Fake Bars */}
            <View style={styles.fakeBars}>
               <View style={styles.fakeBarRow}><Text style={styles.fakeDay}>Mon</Text><View style={[styles.fakeBar, { width: '80%' }]} /></View>
               <View style={styles.fakeBarRow}><Text style={styles.fakeDay}>Tue</Text><View style={[styles.fakeBar, { width: '40%' }]} /></View>
               <View style={styles.fakeBarRow}><Text style={styles.fakeDay}>Wed</Text><View style={[styles.fakeBar, { width: '90%' }]} /></View>
            </View>
          </View>

          {/* Fake Card 2 */}
          <View style={styles.fakeCard}>
             <View style={styles.fakeHeader}>
                <View>
                   <Text style={styles.fakeLabel}>Reaction Time Lag</Text>
                   <Text style={styles.fakeTitle}>4 - 6 Hours</Text>
                </View>
                <View style={styles.fakeCircle} />
             </View>
          </View>

          {/* Lock Overlay */}
          <View style={styles.lockOverlay}>
             <View style={styles.lockCircle}>
                <MaterialIcons name="lock" size={32} color={BrandColors.primary} />
             </View>
          </View>
        </View>

        {/* ─── Premium Upsell Card ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.upsellCard}>
           {/* Decorative bg elements */}
           <View style={styles.glowBg} />
           
           <View style={styles.upsellBadge}>
              <MaterialIcons name="verified" size={14} color={BrandColors.primary} />
              <Text style={styles.upsellBadgeText}>PAWSNAP PREMIUM</Text>
           </View>

           <Text style={styles.upsellTitle}>Unlock ranked triggers and time-lag patterns</Text>
           <Text style={styles.upsellDesc}>
              Discover what's causing your pet's itch with advanced correlation analysis and historical data trends.
           </Text>

           <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.9}>
              <Text style={styles.ctaText}>Start 7-day Free Trial</Text>
           </TouchableOpacity>

           <Text style={styles.disclaimer}>$4.99/mo after trial. Cancel anytime.</Text>
        </Animated.View>

        {/* ─── Trust Factors ─── */}
        <View style={styles.trustRow}>
           <View style={styles.trustItem}>
              <MaterialIcons name="security" size={18} color="#9CA3AF" />
              <Text style={styles.trustText}>Secure Payment</Text>
           </View>
           <View style={styles.trustItem}>
              <MaterialIcons name="restore" size={18} color="#9CA3AF" />
              <Text style={styles.trustText}>Cancel Anytime</Text>
           </View>
        </View>

      </View>
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
    paddingBottom: 10,
    zIndex: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center', alignItems: 'center',
  },

  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },

  /* Blurred Container (Fallback) */
  blurredContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  
  /* Fake Cards */
  fakeCard: {
    backgroundColor: '#161E26',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 16,
    opacity: 0.3, // "Blurred" effect simulation
  },
  fakeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  fakeLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  fakeTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fakeTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  fakeBadge: { backgroundColor: 'rgba(239,68,68,0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  fakeBadgeText: { color: '#F87171', fontSize: 10, fontWeight: '700' },
  fakeIcon: { padding: 8, backgroundColor: 'rgba(45,212,191,0.2)', borderRadius: 20 },
  
  fakeBars: { gap: 12 },
  fakeBarRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fakeDay: { color: '#6B7280', fontSize: 10, width: 24 },
  fakeBar: { height: 8, backgroundColor: BrandColors.primary, borderRadius: 4, opacity: 0.8 },
  
  fakeCircle: {
     width: 40, height: 40, borderRadius: 20,
     borderWidth: 2, borderColor: 'rgba(45,212,191,0.3)',
     borderTopColor: BrandColors.primary,
  },

  /* Lock Overlay */
  lockOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'center',
    zIndex: 20,
  },
  lockCircle: {
    width: 64, height: 64,
    borderRadius: 32,
    backgroundColor: '#161E26', // Surface color
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#374151',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  /* Upsell Card */
  upsellCard: {
    backgroundColor: '#111827', // Premium card bg
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 5,
  },
  glowBg: {
    position: 'absolute', top: -50, right: -50,
    width: 150, height: 150,
    borderRadius: 75,
    backgroundColor: BrandColors.primary,
    opacity: 0.1,
    transform: [{ scale: 1.5 }],
    blurRadius: 40, // View style blurRadius works on iOS/Android often
  },
  upsellBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
    marginBottom: 16,
  },
  upsellBadgeText: { fontSize: 10, fontWeight: '700', color: BrandColors.primary, letterSpacing: 1 },
  upsellTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 12, lineHeight: 28 },
  upsellDesc: { fontSize: 13, color: '#9CA3AF', textAlign: 'center', lineHeight: 20, marginBottom: 24, maxWidth: 280 },
  ctaBtn: {
    width: '100%',
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: { fontSize: 16, fontWeight: '700', color: '#0B0F14' },
  disclaimer: { fontSize: 11, color: '#6B7280', fontWeight: '500' },

  /* Trust */
  trustRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 24, opacity: 0.6 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trustText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
});
