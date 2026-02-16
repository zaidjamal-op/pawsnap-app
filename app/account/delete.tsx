import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const DESTRUCTIVE = '#EF4444';

const LOSS_ITEMS = [
  'Pet Profiles & Photos',
  'Health History & Records',
  'AI Insights & Trends',
  'Active Subscriptions',
];

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <View style={styles.container}>
      {/* BG glow elements */}
      <View style={styles.glowTeal} />
      <View style={styles.glowRed} />

      {/* ── Header ── */}
      <ScreenHeader title="ACCOUNT SETTINGS" style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Warning Icon & Heading */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.heroSection}>
          <View style={styles.warningCircle}>
            <Ionicons name="warning" size={36} color={DESTRUCTIVE} />
          </View>
          <Text style={styles.title}>Delete Account?</Text>
          <Text style={styles.subtitle}>
            This action is irreversible and will remove all your data from our
            servers.
          </Text>
        </Animated.View>

        {/* What you will lose card */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={styles.lossCard}
        >
          <View style={styles.lossHeader}>
            <View style={styles.infoCircle}>
              <Ionicons name="information-circle" size={24} color={BrandColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.lossTitle}>What you will lose</Text>
              <Text style={styles.lossSub}>
                Deleting your account means you will lose access to all the
                following items forever:
              </Text>
            </View>
          </View>

          <View style={styles.lossList}>
            {LOSS_ITEMS.map((item, i) => (
              <View key={i} style={styles.lossItem}>
                <View style={styles.lossDot} />
                <Text style={styles.lossText}>{item}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Confirmation checkbox */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(400)}
        >
          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, confirmed && styles.checkboxChecked]}>
              {confirmed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkLabel}>
              I understand that my account data will be permanently deleted.
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(400)}
          style={styles.actions}
        >
          <TouchableOpacity
            style={[styles.deleteBtn, !confirmed && styles.deleteBtnDisabled]}
            activeOpacity={0.85}
            disabled={!confirmed}
            onPress={() => router.push('/account/confirm-delete')}
          >
            <Text style={styles.deleteBtnText}>Continue to Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keepBtn}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Text style={styles.keepBtnText}>Keep my account</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>Step 1 of 2</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* BG glows */
  glowTeal: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(45,212,191,0.04)',
  },
  glowRed: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(239,68,68,0.04)',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1.5,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  /* Hero */
  heroSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  warningCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },

  /* Loss card */
  lossCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    marginBottom: 32,
  },
  lossHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  infoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  lossTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lossSub: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  lossList: { gap: 16 },
  lossItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lossDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  lossText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#CBD5E1',
  },

  /* Checkbox */
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  checkLabel: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  /* Actions */
  actions: { gap: 16 },
  deleteBtn: {
    height: 60,
    borderRadius: 999,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  deleteBtnDisabled: {
    opacity: 0.4,
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  keepBtn: {
    height: 60,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  stepText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
});
