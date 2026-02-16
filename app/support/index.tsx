import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BORDER_SUBTLE = 'rgba(31,41,55,0.6)';

const ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string; sub: string; color: string; route: string }[] = [
  {
    icon: 'chatbubble-ellipses-outline',
    label: 'Contact Support',
    sub: 'Get help from our team',
    color: BrandColors.primary,
    route: '/support/contact',
  },
  {
    icon: 'bug-outline',
    label: 'Report a Bug',
    sub: 'Let us know what went wrong',
    color: '#EF4444',
    route: '/support/bug',
  },
  {
    icon: 'bulb-outline',
    label: 'Request a Feature',
    sub: 'Suggest an improvement',
    color: '#FBBF24',
    route: '/support/feature',
  },
];

export default function SupportHubScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Help & Feedback" />

      {/* Items */}
      <View style={styles.list}>
        {ITEMS.map((item, i) => (
          <Animated.View key={item.route} entering={FadeInDown.delay(i * 80).duration(350)}>
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => router.push(item.route as any)}
            >
              <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(31,41,55,0.3)',
    backgroundColor: 'rgba(11,15,20,0.8)',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18, fontWeight: '600', color: '#FFFFFF', letterSpacing: -0.3,
  },
  list: {
    padding: 16, gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: BrandColors.surface,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
  },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
  },
  rowLabel: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  rowSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
