import { BrandColors } from '@/constants/theme';
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
import Animated, { FadeInDown } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

function PawLogo() {
  return (
    <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2Z"
        fill={BrandColors.primary}
      />
      <Path
        d="M18.5 4C19.8807 4 21 5.11929 21 6.5C21 7.88071 19.8807 9 18.5 9C17.1193 9 16 7.88071 16 6.5C16 5.11929 17.1193 4 18.5 4Z"
        fill={BrandColors.primary}
        fillOpacity={0.7}
      />
      <Path
        d="M5.5 4C6.88071 4 8 5.11929 8 6.5C8 7.88071 6.88071 9 5.5 9C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4Z"
        fill={BrandColors.primary}
        fillOpacity={0.7}
      />
      <Path
        d="M18.8954 11.5582C19.7891 12.3168 20.1039 13.6393 19.3326 14.8878C18.6667 15.9658 17.5165 17.653 16.0366 19.4674C14.9392 20.8127 13.5186 21.9961 12.0003 21.9961C10.482 21.9961 9.06141 20.8127 7.96403 19.4674C6.48412 17.653 5.33393 15.9658 4.668 14.8878C3.89672 13.6393 4.21151 12.3168 5.10519 11.5582C6.91899 10.0185 9.47563 11.0003 12.0003 11.0003C14.525 11.0003 17.0816 10.0185 18.8954 11.5582Z"
        fill={BrandColors.primary}
      />
    </Svg>
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Pawsnap</Text>
        <View style={{ width: 40 }} />
      </View>

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
            <Text style={styles.versionText}>Version 1.0.4  |  Build 42</Text>
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
