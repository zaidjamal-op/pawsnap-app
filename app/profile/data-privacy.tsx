import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function DataPrivacyScreen() {
  const router = useRouter();

  const handleExport = () => {
    Alert.alert(
      'Export Requested',
      'Your data export is being prepared. You\'ll receive a notification when it\'s ready to download.',
      [{ text: 'OK' }],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account?',
      'This action cannot be undone. All health history and logs will be permanently removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Data & Privacy" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Intro ─── */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)}>
          <Text style={styles.introText}>
            Manage your data footprint and exercise your privacy rights. You are in control of what you share with Pawsnap.
          </Text>
        </Animated.View>

        {/* ─── Export Data Card ─── */}
        <Animated.View entering={FadeInDown.delay(180).duration(500)} style={styles.exportCard}>
          {/* Decorative watermark */}
          <View style={styles.exportWatermark}>
            <MaterialIcons name="cloud-download" size={100} color={BrandColors.primary} />
          </View>

          <View style={styles.exportContent}>
            <View style={styles.exportIconWrap}>
              <MaterialIcons name="download" size={24} color={BrandColors.primary} />
            </View>

            <Text style={styles.exportTitle}>Export Your Data</Text>
            <Text style={styles.exportDesc}>
              Request a complete copy of all your pet's check-ins, itch logs, protocol history, and uploaded photos in a portable format.
            </Text>

            <TouchableOpacity style={styles.exportBtn} activeOpacity={0.85} onPress={handleExport}>
              <MaterialIcons name="description" size={18} color={BrandColors.primary} />
              <Text style={styles.exportBtnText}>Generate Data File</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Account Management ─── */}
        <Animated.View entering={FadeInDown.delay(320).duration(500)}>
          <Text style={styles.sectionTitle}>ACCOUNT MANAGEMENT</Text>
          <View style={styles.mgmtCard}>
            {/* Privacy Policy */}
            <TouchableOpacity style={[styles.mgmtRow, styles.mgmtRowBorder]} activeOpacity={0.7}>
              <View style={styles.mgmtLeft}>
                <MaterialIcons name="policy" size={20} color="#6B7280" />
                <Text style={styles.mgmtLabel}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.3)" />
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity style={styles.mgmtRow} activeOpacity={0.7} onPress={handleDelete}>
              <View style={styles.mgmtLeft}>
                <MaterialIcons name="delete-forever" size={20} color="#EF4444" />
                <View>
                  <Text style={styles.mgmtLabel}>Delete Account</Text>
                  <Text style={styles.mgmtSub}>Perpetual deletion of all data</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.3)" />
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16, paddingBottom: 12,
  },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  /* ─── Intro ─── */
  introText: {
    fontSize: 14, color: '#6B7280', lineHeight: 22,
    marginBottom: 24,
  },

  /* ─── Export Card ─── */
  exportCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, overflow: 'hidden',
    marginBottom: 28, position: 'relative',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  exportWatermark: {
    position: 'absolute', top: -10, right: -10,
    opacity: 0.06, transform: [{ rotate: '12deg' }],
  },
  exportContent: { padding: 24, position: 'relative', zIndex: 1 },
  exportIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(45,212,191,0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
  },
  exportTitle: {
    fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 8,
  },
  exportDesc: {
    fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 20,
  },
  exportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: BrandColors.primary,
    paddingVertical: 14, borderRadius: 14,
  },
  exportBtnText: { fontSize: 14, fontWeight: '600', color: BrandColors.primary },

  /* ─── Account Management ─── */
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 10, paddingLeft: 4,
  },
  mgmtCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  mgmtRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16,
  },
  mgmtRowBorder: {
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  mgmtLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mgmtLabel: { fontSize: 14, fontWeight: '500', color: '#D1D5DB' },
  mgmtSub: { fontSize: 11, color: '#6B7280', marginTop: 2 },
});
