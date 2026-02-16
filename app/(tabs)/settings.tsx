import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ONBOARDING_KEY = '@pawsnap_onboarding_seen';

const USER = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7LwViCdQwhgOpZWO7bMdrdGVRiPD4x90yw9v6y7tFMhgInFQ4gsabcUJHlBJf5PfCpWI8kyqtxZjlgV_jc8xriPhXQadmM_iP9Fr-2whPzCBiFz7g-cAMMBzc-11GiX8e_vHLpIwrAA-uPMY6TjPI0FhTKmEqV68OIBo_nFPf10zS_swyXUQ1Itl-pHNOl5_FXVsuhksPfVKf4-NqXPQQZVTh2wEC8mLncEoObp19tm0P8CtYOKGz4cEqH9g6QxnaUeJRYQQP_S6U',
};

export default function SettingsScreen() {
  const router = useRouter();

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    Alert.alert('Done', 'Onboarding reset! Redirecting to welcome…', [
      { text: 'OK', onPress: () => router.replace('/welcome') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Profile preview row */}
        <TouchableOpacity
          style={styles.profileRow}
          activeOpacity={0.7}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileLeft}>
            <Image source={{ uri: USER.avatar }} style={styles.profileAvatar} />
            <View>
              <Text style={styles.profileName}>{USER.name}</Text>
              <Text style={styles.profileEmail}>{USER.email}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* My Pets */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/profile/pets')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="pets" size={20} color={BrandColors.primary} />
          <Text style={styles.rowText}>My Pets</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Safety Guidance */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/profile/safety')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="health-and-safety" size={20} color="#EF4444" />
          <Text style={styles.rowText}>Safety Guidance</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Help Center */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/profile/help')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="help-outline" size={20} color={BrandColors.primary} />
          <Text style={styles.rowText}>Help Center</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/profile/about')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="info-outline" size={20} color={BrandColors.primary} />
          <Text style={styles.rowText}>About Pawsnap</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Help & Feedback */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/support')}
          activeOpacity={0.7}
        >
          <Ionicons name="help-buoy-outline" size={20} color={BrandColors.primary} />
          <Text style={styles.rowText}>Help & Feedback</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Upgrade to Premium */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/premium/unlock')}
          activeOpacity={0.7}
        >
          <Ionicons name="star" size={20} color="#FBBF24" />
          <Text style={styles.rowText}>Upgrade to Premium</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => router.push('/account/delete')}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.rowText}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>

        {/* Reset Onboarding */}
        <TouchableOpacity style={styles.row} onPress={resetOnboarding} activeOpacity={0.7}>
          <Ionicons name="refresh" size={20} color={BrandColors.primary} />
          <Text style={styles.rowText}>Reset Onboarding</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  header: {
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  content: { paddingHorizontal: 24, gap: 8 },

  /* Profile preview */
  profileRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.surface,
    padding: 16, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(31,41,55,0.6)',
    marginBottom: 4,
  },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileAvatar: { width: 48, height: 48, borderRadius: 24 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  profileEmail: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: BrandColors.surface,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.6)',
  },
  rowText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
});
