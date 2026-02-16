import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
import Animated, { FadeInDown } from 'react-native-reanimated';

interface AreaOption {
  icon: string;
  label: string;
}

const AREAS: AreaOption[] = [
  { icon: 'pets', label: 'Paws' },
  { icon: 'hearing', label: 'Ears' },
  { icon: 'spa', label: 'Belly' },
  { icon: 'face', label: 'Face' },
  { icon: 'error-outline', label: 'Hotspot' },
  { icon: 'add', label: 'Other' },
];

export default function AreaPickerScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('Paws');

  const handleContinue = () => {
    router.push({
      pathname: '/photo/capture',
      params: { area: selected },
    });
  };

  return (
    <View style={styles.container}>
      {/* Drag Handle */}
      <View style={styles.handleWrap}>
        <View style={styles.handle} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Photo</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(60).duration(400)}>
          <Text style={styles.subtitle}>
            Select the area you are photographing to track changes.
          </Text>
        </Animated.View>

        {/* Selection Grid */}
        <Animated.View entering={FadeInDown.delay(140).duration(400)} style={styles.grid}>
          {AREAS.map((area, i) => {
            const active = selected === area.label;
            return (
              <TouchableOpacity
                key={area.label}
                style={[styles.gridItem, active && styles.gridItemActive]}
                onPress={() => setSelected(area.label)}
                activeOpacity={0.7}
              >
                {/* Active fill bg */}
                {active && <View style={styles.activeFill} />}

                {/* Checkmark */}
                {active && (
                  <View style={styles.checkBadge}>
                    <MaterialIcons name="check-circle" size={18} color={BrandColors.primary} />
                  </View>
                )}

                <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
                  <MaterialIcons
                    name={area.icon as any}
                    size={26}
                    color={active ? BrandColors.primary : '#6B7280'}
                  />
                </View>
                <Text style={[styles.areaLabel, active && styles.areaLabelActive]}>
                  {area.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Continue CTA */}
        <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.ctaWrap}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueBtnText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={18} color={BrandColors.background} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  handleWrap: { alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 56 : 36, paddingBottom: 4 },
  handle: { width: 48, height: 5, borderRadius: 3, backgroundColor: 'rgba(107,114,128,0.3)' },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20, marginTop: 8, lineHeight: 20 },

  /* Grid */
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 24, borderRadius: 14,
    backgroundColor: BrandColors.surface,
    borderWidth: 2, borderColor: 'transparent',
    position: 'relative', overflow: 'hidden',
  },
  gridItemActive: {
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15, shadowRadius: 12,
  },
  activeFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,212,191,0.06)',
  },
  checkBadge: { position: 'absolute', top: 10, right: 10 },

  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  iconCircleActive: { backgroundColor: 'rgba(45,212,191,0.15)' },
  areaLabel: { fontSize: 13, fontWeight: '500', color: '#9CA3AF' },
  areaLabelActive: { color: BrandColors.primary, fontWeight: '700' },

  /* CTA */
  ctaWrap: { marginTop: 28, paddingBottom: 20 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 16, borderRadius: 12,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: BrandColors.background },
});
