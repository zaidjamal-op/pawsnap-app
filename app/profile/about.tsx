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
import { Image as ExpoImage } from 'expo-image';

function PawLogo() {
  return (
    <ExpoImage
      source={require('@/assets/images/pawsnap-logo.svg')}
      style={{ width: 100, height: 100 }}
      contentFit="contain"
      tintColor={BrandColors.primary}
    />
  );
}

interface ActionLink {
  label: string;
  icon: string;
  onPress?: () => void;
}

export default function AboutScreen() {
  const router = useRouter();

  const links: ActionLink[] = [
    { label: 'Privacy Policy', icon: 'open-in-new' },
    {
      label: 'Terms of Service',
      icon: 'open-in-new',
      onPress: () => router.push('/profile/terms'),
    },
    {
      label: 'Rate Pawsnap',
      icon: 'star-border',
      onPress: () => {
        // Opens App Store rating page
        if (Platform.OS === 'ios') {
          Linking.openURL('https://apps.apple.com/app/id0000000000?action=write-review');
        }
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="About Pawsnap" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Brand Hero ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.heroSection}>
          <View style={styles.logoWrap}>
            <PawLogo />
          </View>
          <Text style={styles.brandName}>Pawsnap</Text>

          <View style={styles.versionPill}>
            <View style={styles.versionDot} />
            <Text style={styles.versionText}>Version {AppConfig.version}  |  Build {AppConfig.build}</Text>
          </View>
        </Animated.View>

        {/* ─── Mission Card ─── */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.missionCard}>
          <View style={styles.missionGlow} />
          <View style={styles.missionHeader}>
            <MaterialIcons name="favorite" size={20} color={BrandColors.primary} />
            <Text style={styles.missionTitle}>Our Mission</Text>
          </View>
          <Text style={styles.missionText}>
            Pawsnap helps you understand your pet's health by meticulously tracking itch patterns and environmental triggers. We believe every pet deserves a comfortable, itch-free life, and we're here to give you the data to make that happen.
          </Text>
        </Animated.View>

        {/* ─── Links ─── */}
        <Animated.View entering={FadeInDown.delay(340).duration(400)} style={styles.linksSection}>
          {links.map((link) => (
            <TouchableOpacity
              key={link.label}
              style={styles.linkRow}
              activeOpacity={0.7}
              onPress={link.onPress}
            >
              <Text style={styles.linkLabel}>{link.label}</Text>
              <MaterialIcons name={link.icon as any} size={18} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* ─── Footer ─── */}
        <Animated.View entering={FadeInDown.delay(460).duration(400)} style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerMade}>Made with care for pets 🐾</Text>
          <Text style={styles.footerCopy}>© 2023 Pawsnap Inc.</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  /* ─── Hero ─── */
  heroSection: { alignItems: 'center', marginBottom: 32 },
  logoWrap: {
    backgroundColor: '#161B22',
    borderRadius: 24, padding: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 20, elevation: 10,
    width: 120,
    height: 120,
    justifyContent: 'center', alignItems: 'center',
  },
  brandName: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 8 },
  versionPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  versionDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },
  versionText: { fontSize: 11, fontWeight: '500', color: '#6B7280' },

  /* ─── Mission ─── */
  missionCard: {
    backgroundColor: '#161B22',
    borderRadius: 18, padding: 22,
    marginBottom: 28, overflow: 'hidden', position: 'relative',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  missionGlow: {
    position: 'absolute', top: 0, right: 0,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: BrandColors.primary, opacity: 0.04,
  },
  missionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  missionTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  missionText: { fontSize: 14, color: '#9CA3AF', lineHeight: 22 },

  /* ─── Links ─── */
  linksSection: { gap: 4, marginBottom: 32 },
  linkRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  linkLabel: { fontSize: 14, fontWeight: '500', color: '#D1D5DB' },

  /* ─── Footer ─── */
  footer: { alignItems: 'center' },
  footerDivider: {
    width: 48, height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 20,
  },
  footerMade: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  footerCopy: { fontSize: 10, color: '#4B5563' },
});
