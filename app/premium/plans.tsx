import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  const handleContinue = () => {
    router.push('/premium/processing');
  };

  return (
    <View style={styles.container}>
      {/* BG Glows */}
      <View style={styles.bgGlowBL} />
      <View style={styles.bgGlowTR} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.restoreBtn}>RESTORE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View entering={FadeInUp.delay(60).duration(400)} style={styles.titleWrap}>
          <Text style={styles.mainTitle}>Choose Your Plan</Text>
          <Text style={styles.mainDesc}>
            Unlock all premium features and save your memories in high quality.
          </Text>
        </Animated.View>

        {/* Yearly Card */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardActive]}
            activeOpacity={0.85}
            onPress={() => setSelectedPlan('yearly')}
          >
            {/* Recommended badge */}
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>

            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>Yearly</Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveText}>Save 40%</Text>
                </View>
              </View>
              <View style={styles.planPriceWrap}>
                <Text style={styles.planPrice}>$39.99</Text>
                <Text style={styles.planUnit}>per year</Text>
              </View>
            </View>

            <View style={styles.trialIncluded}>
              <Ionicons name="checkmark-circle" size={18} color={BrandColors.primary} />
              <Text style={styles.trialIncludedText}>7-day free trial included</Text>
            </View>

            <View style={styles.planImageWrap}>
              <Image
                source={require('@/assets/images/plan-puppy.png')}
                style={styles.planImage}
                resizeMode="cover"
              />
              <View style={styles.planImageOverlay} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Monthly Card */}
        <Animated.View entering={FadeInDown.delay(250).duration(400)}>
          <TouchableOpacity
            style={[styles.monthlyCard, selectedPlan === 'monthly' && styles.planCardActive]}
            activeOpacity={0.85}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.monthlyInner}>
              <View>
                <Text style={styles.planName}>Monthly</Text>
                <Text style={styles.monthlyDesc}>Flexible, cancel anytime</Text>
              </View>
              <View style={styles.planPriceWrap}>
                <Text style={styles.planPrice}>$4.99</Text>
                <Text style={styles.planUnit}>per month</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.continueBtnText}>Continue to Trial</Text>
        </TouchableOpacity>
        <Text style={styles.cancelNote}>Cancel anytime in the App Store.</Text>
        <View style={styles.legalRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.legalLink}>TERMS OF SERVICE</Text>
          </TouchableOpacity>
          <Text style={styles.legalDot}>•</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.legalLink}>PRIVACY POLICY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  bgGlowBL: {
    position: 'absolute', bottom: -80, left: -80,
    width: 250, height: 250, borderRadius: 125,
    backgroundColor: 'rgba(45,212,191,0.06)',
  },
  bgGlowTR: {
    position: 'absolute', top: -80, right: -80,
    width: 250, height: 250, borderRadius: 125,
    backgroundColor: 'rgba(45,212,191,0.03)',
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 16, paddingBottom: 8,
  },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  restoreBtn: {
    fontSize: 13, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 1.2,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 },

  /* Title */
  titleWrap: { alignItems: 'center', marginBottom: 28 },
  mainTitle: {
    fontSize: 28, fontWeight: '800', color: '#FFFFFF',
    textAlign: 'center', letterSpacing: -0.4, marginBottom: 8,
  },
  mainDesc: {
    fontSize: 15, color: '#94A3B8', textAlign: 'center',
    lineHeight: 22, maxWidth: 300,
  },

  /* Plan Card */
  planCard: {
    borderRadius: 20, backgroundColor: BrandColors.surface,
    borderWidth: 2, borderColor: 'transparent',
    padding: 20, marginBottom: 14, position: 'relative', overflow: 'hidden',
  },
  planCardActive: {
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12, shadowRadius: 24,
  },
  recommendedBadge: {
    position: 'absolute', top: -1, alignSelf: 'center', left: '50%',
    transform: [{ translateX: -54 }],
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 16, paddingVertical: 5, borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  recommendedText: {
    fontSize: 9, fontWeight: '800', color: BrandColors.background,
    letterSpacing: 1.5,
  },
  planHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginTop: 18, marginBottom: 12,
  },
  planName: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  saveBadge: {
    backgroundColor: 'rgba(45,212,191,0.15)',
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, marginTop: 6,
  },
  saveText: { fontSize: 11, fontWeight: '700', color: BrandColors.primary },
  planPriceWrap: { alignItems: 'flex-end' },
  planPrice: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  planUnit: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  trialIncluded: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14,
  },
  trialIncludedText: { fontSize: 13, fontWeight: '500', color: '#CBD5E1' },

  planImageWrap: {
    width: '100%', height: 120, borderRadius: 14, overflow: 'hidden',
  },
  planImage: { width: '100%', height: '100%' },
  planImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.3)',
  },

  /* Monthly */
  monthlyCard: {
    borderRadius: 20, backgroundColor: BrandColors.surface,
    borderWidth: 1, borderColor: 'rgba(71,85,105,0.4)',
    padding: 20, marginBottom: 14,
  },
  monthlyInner: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  monthlyDesc: { fontSize: 13, color: '#6B7280', marginTop: 4 },

  /* Footer */
  footer: {
    paddingHorizontal: 24, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 14, width: '100%',
    alignItems: 'center',
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 8,
  },
  continueBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
  cancelNote: { fontSize: 13, color: '#64748B', marginTop: 14, textAlign: 'center' },
  legalRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10,
  },
  legalLink: {
    fontSize: 10, fontWeight: '700', color: '#475569', letterSpacing: 1.2,
  },
  legalDot: { fontSize: 10, color: '#1E293B' },
});
