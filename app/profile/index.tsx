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
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock user data
const USER = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  isPremium: true,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7LwViCdQwhgOpZWO7bMdrdGVRiPD4x90yw9v6y7tFMhgInFQ4gsabcUJHlBJf5PfCpWI8kyqtxZjlgV_jc8xriPhXQadmM_iP9Fr-2whPzCBiFz7g-cAMMBzc-11GiX8e_vHLpIwrAA-uPMY6TjPI0FhTKmEqV68OIBo_nFPf10zS_swyXUQ1Itl-pHNOl5_FXVsuhksPfVKf4-NqXPQQZVTh2wEC8mLncEoObp19tm0P8CtYOKGz4cEqH9g6QxnaUeJRYQQP_S6U',
};

const ACTIVE_PET = {
  name: 'Luna',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApyt8behucmGqsoweFCm0ChByFu9b_6YcJA_DsadohRC4_2ko7xdOSTMjyTt2gWGGG0DxVP5lFxCuVPZ6JtT5ctk_2THfofm8fATnRxSaizmpmt7tD2ySjQbsrGkS_hTuzI1xpvbnTl8l2I6k5tuvR2z71Fa11mWct3bKT8hMBOeDKjkdgDAhavW9eb9hSUs4FR-hhgTgPPaj6_7EzbBC1wHlU54e062LUfbxsW9lyfCVt-PwcvK4QglWULSaNhhMVhcmPk_6a4Voz',
};

interface AccountRow {
  icon: string;
  label: string;
  badge?: number;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();

  const accountItems: AccountRow[] = [
    { icon: 'pets', label: 'My Pets', onPress: () => router.push('/profile/pets') },
    { icon: 'credit-card', label: 'Subscription', onPress: () => router.push('/profile/subscription') },
    { icon: 'notifications', label: 'Notifications', badge: 2, onPress: () => router.push('/profile/notifications') },
    { icon: 'security', label: 'Data & Privacy', onPress: () => router.push('/profile/data-privacy') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <MaterialIcons name="settings" size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── User Info Card ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.userCard}>
          <View style={styles.userGlow} />

          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <Image source={{ uri: USER.avatar }} style={styles.avatar} />
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={10} color={BrandColors.background} />
            </View>
          </View>

          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userEmail}>{USER.email}</Text>

          {USER.isPremium && (
            <View style={styles.premiumBadge}>
              <MaterialIcons name="stars" size={14} color={BrandColors.primary} />
              <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
            </View>
          )}
        </Animated.View>

        {/* ─── Active Pet Card ─── */}
        <Animated.View entering={FadeInDown.delay(180).duration(500)}>
          <TouchableOpacity
            style={styles.petCard}
            activeOpacity={0.8}
            onPress={() => router.push('/profile/pets')}
          >
            <View style={styles.petLeft}>
              <View style={styles.petAvatarWrap}>
                <Image source={{ uri: ACTIVE_PET.avatar }} style={styles.petAvatar} />
                <View style={styles.petDot} />
              </View>
              <View>
                <Text style={styles.petLabel}>CURRENTLY TRACKING</Text>
                <Text style={styles.petName}>{ACTIVE_PET.name}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.switchBtn} activeOpacity={0.7}>
              <Text style={styles.switchText}>Switch</Text>
              <MaterialIcons name="swap-horiz" size={18} color={BrandColors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>

        {/* ─── Account Section ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.accountCard}>
            {accountItems.map((item, i) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.accountRow,
                  i < accountItems.length - 1 && styles.accountRowBorder,
                ]}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.accountLeft}>
                  <View style={styles.accountIcon}>
                    <MaterialIcons name={item.icon as any} size={22} color={BrandColors.primary} />
                  </View>
                  <Text style={styles.accountLabel}>{item.label}</Text>
                </View>
                <View style={styles.accountRight}>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ─── Log Out ─── */}
        <Animated.View entering={FadeInDown.delay(420).duration(400)}>
          <TouchableOpacity style={styles.logoutCard} activeOpacity={0.7}>
            <MaterialIcons name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <Text style={styles.version}>App Version 2.4.1 (Build 890)</Text>
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
    paddingHorizontal: 24, paddingBottom: 12,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  /* ─── User Card ─── */
  userCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden', position: 'relative',
  },
  userGlow: {
    position: 'absolute', top: -20, right: -20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: BrandColors.primary, opacity: 0.06,
  },
  avatarWrap: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.08)',
  },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: BrandColors.surface,
  },
  userName: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#6B7280', marginBottom: 14 },
  premiumBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 6,
    backgroundColor: 'rgba(45,212,191,0.08)',
    borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
  },
  premiumText: {
    fontSize: 10, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 1,
  },

  /* ─── Active Pet ─── */
  petCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 18,
    marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  petLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  petAvatarWrap: { position: 'relative' },
  petAvatar: { width: 52, height: 52, borderRadius: 16 },
  petDot: {
    position: 'absolute', top: -2, right: -2,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: BrandColors.primary,
    borderWidth: 2, borderColor: BrandColors.surface,
  },
  petLabel: {
    fontSize: 9, fontWeight: '700', color: '#6B7280',
    letterSpacing: 1.2, marginBottom: 3,
  },
  petName: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  switchBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  switchText: { fontSize: 13, fontWeight: '700', color: BrandColors.primary },

  /* ─── Account ─── */
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 12, paddingLeft: 4,
  },
  accountCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  accountRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16,
  },
  accountRowBorder: {
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  accountLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  accountIcon: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(45,212,191,0.08)',
    justifyContent: 'center', alignItems: 'center',
  },
  accountLabel: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  accountRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    backgroundColor: '#EF4444',
    minWidth: 18, height: 18, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },

  /* ─── Logout ─── */
  logoutCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 16,
    marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#EF4444' },
  version: {
    fontSize: 11, color: '#4B5563', textAlign: 'center',
  },
});
