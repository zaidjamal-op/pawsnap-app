import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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

const GRAPHITE = '#1C2127';
const ERROR_RED = '#EF4444';

const PET_PHOTO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEOawGJbw1buQymFi7m9x_mpMJTVfElcdWaljrbK6Vqrd_bLQD1HYlNib_8KDHjvP97pGSug1_p30UBK54XA3EsVc5uhCFHets35uqQuSi6tgAoY8ieW82w3WOx_GovdoL9H56IoMfkNmds9cQxyzzCmXlD6oYTSMLJCQySEtcTyvbJZJYeApbX1qu9E_lWNKRTru_CAG7_0bimwYt92WXiHCRELRt1ww-gau-wSes9sMvYO22DwrYOoScuOooKt7tWuSAhLu5Q3I_';

const FINDINGS = [
  'Physical examination shows normal heart rate and respiratory rhythm.',
  'Slight sensitivity in the lower abdominal region noted during palpation.',
  'Dental health is excellent; no signs of plaque or gingivitis.',
];

export default function ReportSharedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Preview</Text>
        <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color="rgba(255,255,255,0.4)" />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Success Banner ── */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.bannerWrap}>
          <View style={styles.banner}>
            <View style={styles.bannerLeft}>
              <View style={styles.bannerIcon}>
                <Ionicons name="checkmark" size={16} color={BrandColors.background} />
              </View>
              <View>
                <Text style={styles.bannerTitle}>Share link active</Text>
                <Text style={styles.bannerSub}>Accessible via shared URL</Text>
              </View>
            </View>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Pet Info Card ── */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.petCardWrap}>
          <View style={styles.petCard}>
            <View style={styles.petImageWrap}>
              <Image
                source={{ uri: PET_PHOTO }}
                style={styles.petImage}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={styles.petName}>Luna</Text>
              <Text style={styles.petBreed}>Golden Retriever • #123</Text>
              <Text style={styles.petOwner}>Owner: Sarah Johnson</Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Report Details ── */}
        <View style={styles.detailsContainer}>
          {/* Visit Summary */}
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <SectionHeader icon="event-note" title="Visit Summary" />
            <View style={styles.detailCard}>
              <View style={styles.summaryGrid}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>DATE</Text>
                  <Text style={styles.fieldValue}>Oct 24, 2023</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>ATTENDING VET</Text>
                  <Text style={styles.fieldValue}>Dr. Aris Thorne</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Clinical Findings */}
          <Animated.View entering={FadeInDown.delay(300).duration(400)}>
            <SectionHeader icon="stethoscope" title="Clinical Findings" />
            <View style={styles.detailCard}>
              {FINDINGS.map((finding, i) => (
                <View key={i} style={styles.findingRow}>
                  <View style={styles.findingDot} />
                  <Text style={styles.findingText}>{finding}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Recommended Protocol */}
          <Animated.View entering={FadeInDown.delay(400).duration(400)}>
            <SectionHeader icon="medical-services" title="Recommended Protocol" />
            <View style={styles.detailCard}>
              <View style={styles.protocolHeader}>
                <View style={styles.routineBadge}>
                  <Text style={styles.routineText}>DAILY ROUTINE</Text>
                </View>
                <Text style={styles.cycleText}>7-day cycle</Text>
              </View>
              <Text style={styles.protocolTitle}>Dietary Adjustment</Text>
              <Text style={styles.protocolDesc}>
                Switch to low-residue wet food twice daily to alleviate minor sensitivity. Monitor bowel movements for consistency.
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* ── Bottom Actions ── */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.copyBtn} activeOpacity={0.85}>
          <Ionicons name="copy-outline" size={20} color={BrandColors.background} />
          <Text style={styles.copyBtnText}>COPY LINK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.revokeBtn} activeOpacity={0.85}>
          <Ionicons name="unlink" size={18} color={ERROR_RED} />
          <Text style={styles.revokeBtnText}>REVOKE LINK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Section Header Component ── */
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <MaterialIcons name={icon as any} size={16} color={BrandColors.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

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
    borderBottomColor: 'rgba(255,255,255,0.04)',
    backgroundColor: 'rgba(11,15,20,0.8)',
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
  moreBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ── Banner ── */
  bannerWrap: { padding: 16 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BrandColors.primary,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(11,15,20,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.background,
  },
  bannerSub: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(11,15,20,0.7)',
    marginTop: 1,
  },
  liveBadge: {
    backgroundColor: BrandColors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  /* ── Pet Card ── */
  petCardWrap: { paddingHorizontal: 16, paddingVertical: 8 },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: GRAPHITE,
    borderRadius: 24,
    padding: 16,
  },
  petImageWrap: {
    width: 76,
    height: 76,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(45,212,191,0.2)',
    backgroundColor: 'rgba(45,212,191,0.1)',
  },
  petImage: { width: '100%', height: '100%' },
  petName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  petBreed: {
    fontSize: 14,
    fontWeight: '500',
    color: BrandColors.primary,
    marginTop: 2,
  },
  petOwner: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },

  /* ── Details ── */
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  detailCard: {
    backgroundColor: 'rgba(28,33,39,0.4)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },

  /* Visit Summary */
  summaryGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* Clinical Findings */
  findingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  findingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.primary,
    marginTop: 6,
    flexShrink: 0,
  },
  findingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    flex: 1,
  },

  /* Protocol */
  protocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routineBadge: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  routineText: {
    fontSize: 10,
    fontWeight: '700',
    color: BrandColors.primary,
    letterSpacing: 0.5,
  },
  cycleText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontStyle: 'italic',
  },
  protocolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  protocolDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
  },

  /* ── Bottom Actions ── */
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    backgroundColor: BrandColors.background,
    gap: 12,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 999,
    backgroundColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  copyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.background,
    letterSpacing: 0.8,
  },
  revokeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(239,68,68,0.4)',
    backgroundColor: 'transparent',
  },
  revokeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: ERROR_RED,
    letterSpacing: 0.8,
  },
});
