import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppConfig } from '@/constants/config';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface HelpAction {
  icon: string;
  label: string;
  iconColor: string;
  iconBg: string;
  onPress?: () => void;
}

export default function HelpCenterScreen() {
  const router = useRouter();

  const actions: HelpAction[] = [
    {
      icon: 'bug-report',
      label: 'Report a bug',
      iconColor: '#EF4444',
      iconBg: 'rgba(239,68,68,0.08)',
      onPress: () => Linking.openURL('mailto:support@pawsnap.app?subject=Bug%20Report'),
    },
    {
      icon: 'lightbulb',
      label: 'Request a feature',
      iconColor: '#F59E0B',
      iconBg: 'rgba(245,158,11,0.08)',
      onPress: () => Linking.openURL('mailto:support@pawsnap.app?subject=Feature%20Request'),
    },
    {
      icon: 'chat-bubble-outline',
      label: 'Contact support',
      iconColor: '#3B82F6',
      iconBg: 'rgba(59,130,246,0.08)',
      onPress: () => Linking.openURL('mailto:support@pawsnap.app'),
    },
    {
      icon: 'quiz',
      label: 'Frequently Asked Questions',
      iconColor: '#6B7280',
      iconBg: 'rgba(107,114,128,0.08)',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Help Center" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Card ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <MaterialIcons name="support-agent" size={30} color={BrandColors.primary} />
          </View>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>How can we help?</Text>
            <Text style={styles.heroSub}>
              Find answers or get in touch with our team regarding your pet's health tracking.
            </Text>
          </View>
        </Animated.View>

        {/* ─── Action List ─── */}
        {actions.map((action, i) => (
          <Animated.View
            key={action.label}
            entering={FadeInDown.delay(180 + i * 70).duration(400)}
          >
            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.7}
              onPress={action.onPress}
            >
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: action.iconBg }]}>
                  <MaterialIcons name={action.icon as any} size={22} color={BrandColors.primary} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.3)" />
            </TouchableOpacity>
          </Animated.View>
        ))}



        {/* ─── Footer ─── */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.footer}>
          <Text style={styles.versionText}>Pawsnap Version {AppConfig.version} (Build {AppConfig.build})</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/profile/terms')}
            >
              <Text style={styles.footerLink}>Terms of Service</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },

  /* ─── Hero ─── */
  heroCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(45,212,191,0.06)',
    borderRadius: 18, padding: 20,
    marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.08)',
  },
  heroIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(45,212,191,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  heroContent: { flex: 1 },
  heroTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  heroSub: { fontSize: 13, color: '#6B7280', lineHeight: 18 },

  /* ─── Actions ─── */
  actionRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.surface,
    borderRadius: 14, padding: 16,
    marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  actionIcon: {
    width: 38, height: 38, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  actionLabel: { fontSize: 15, fontWeight: '600', color: '#E5E7EB' },

  /* ─── Footer ─── */
  footer: { alignItems: 'center', paddingTop: 32 },
  versionText: { fontSize: 12, color: '#4B5563', marginBottom: 12 },
  footerLinks: { flexDirection: 'row', gap: 20 },
  footerLink: {
    fontSize: 12, fontWeight: '600', color: BrandColors.primary,
    textDecorationLine: 'underline',
  },
});
