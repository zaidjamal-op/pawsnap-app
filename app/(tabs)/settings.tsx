import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ONBOARDING_KEY = '@pawsnap_onboarding_seen';

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
        <TouchableOpacity style={styles.row} onPress={resetOnboarding}>
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
