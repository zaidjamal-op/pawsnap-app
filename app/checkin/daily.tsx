import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

const BODY_PARTS = ['Paws', 'Ears', 'Belly', 'Face', 'Tail'];

interface SkinSign {
  label: string;
  selected: boolean;
}

interface Exposure {
  icon: string;
  label: string;
  selected: boolean;
}

export default function DailyCheckinScreen() {
  const router = useRouter();
  const [itchLevel, setItchLevel] = useState(6);
  const [selectedParts, setSelectedParts] = useState<string[]>(['Paws']);
  const [skinSigns, setSkinSigns] = useState<SkinSign[]>([
    { label: 'Redness', selected: true },
    { label: 'Bumps', selected: false },
    { label: 'Hair Loss', selected: false },
    { label: 'Scabs', selected: false },
  ]);
  const [exposures, setExposures] = useState<Exposure[]>([
    { icon: 'grass', label: 'Grass', selected: false },
    { icon: 'bathtub', label: 'Bath', selected: false },
    { icon: 'restaurant', label: 'New Food', selected: true },
    { icon: 'pets', label: 'Other Dogs', selected: false },
  ]);

  const togglePart = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  const toggleSkinSign = (index: number) => {
    setSkinSigns((prev) =>
      prev.map((s, i) => (i === index ? { ...s, selected: !s.selected } : s))
    );
  };

  const toggleExposure = (index: number) => {
    setExposures((prev) =>
      prev.map((e, i) => (i === index ? { ...e, selected: !e.selected } : e))
    );
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const getItchLabel = () => {
    if (itchLevel <= 3) return 'Comfortable';
    if (itchLevel <= 6) return 'Moderate';
    return 'Severe';
  };

  const handleSave = () => {
    Alert.alert('Check-in Saved', 'Your daily check-in has been recorded.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Daily Check-in</Text>
          <Text style={styles.headerDate}>{dateStr}</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Itch Level Slider ─── */}
        <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.section}>
          <View style={styles.itchHeader}>
            <Text style={styles.sectionLabel}>Itch Level</Text>
            <View style={styles.itchValueWrap}>
              <Text style={styles.itchValue}>{itchLevel}</Text>
              <Text style={styles.itchMax}>/10</Text>
            </View>
          </View>

          {/* Track */}
          <View style={styles.sliderTrack}>
            <View style={styles.trackBg} />
            <View style={[styles.trackFill, { width: `${itchLevel * 10}%` }]} />
            {/* Thumb */}
            <TouchableOpacity
              style={[styles.sliderThumb, { left: `${itchLevel * 10}%` }]}
              activeOpacity={1}
            />
          </View>

          {/* Stepper buttons for itch level */}
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setItchLevel(Math.max(0, itchLevel - 1))}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={18} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.stepperLabels}>
              <Text style={[styles.stepperLabel, itchLevel <= 3 && styles.stepperActive]}>Comfortable</Text>
              <Text style={[styles.stepperLabel, itchLevel > 3 && itchLevel <= 6 && styles.stepperActive]}>Moderate</Text>
              <Text style={[styles.stepperLabel, itchLevel > 6 && styles.stepperActive]}>Severe</Text>
            </View>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setItchLevel(Math.min(10, itchLevel + 1))}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Body Parts ─── */}
        <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Where is it most visible?</Text>
          <View style={styles.chipWrap}>
            {BODY_PARTS.map((part) => {
              const active = selectedParts.includes(part);
              return (
                <TouchableOpacity
                  key={part}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => togglePart(part)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{part}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.chipDashed} activeOpacity={0.7}>
              <Ionicons name="add" size={14} color="#6B7280" />
              <Text style={styles.chipDashedText}>Other</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Skin Signs ─── */}
        <Animated.View entering={FadeInDown.delay(240).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Skin Signs</Text>
          <View style={styles.signsGrid}>
            {skinSigns.map((sign, i) => (
              <TouchableOpacity
                key={sign.label}
                style={[styles.signCard, sign.selected && styles.signCardActive]}
                onPress={() => toggleSkinSign(i)}
                activeOpacity={0.7}
              >
                <View style={[styles.signCheck, sign.selected && styles.signCheckActive]}>
                  {sign.selected && (
                    <Ionicons name="checkmark" size={13} color={BrandColors.background} />
                  )}
                </View>
                <Text style={[styles.signText, sign.selected && styles.signTextActive]}>
                  {sign.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* ─── Exposures ─── */}
        <Animated.View entering={FadeInDown.delay(320).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Exposures today</Text>
          <View style={styles.exposureRow}>
            {exposures.map((exp, i) => (
              <TouchableOpacity
                key={exp.label}
                style={styles.exposureItem}
                onPress={() => toggleExposure(i)}
                activeOpacity={0.7}
              >
                <View style={[styles.exposureIcon, exp.selected && styles.exposureIconActive]}>
                  <MaterialIcons
                    name={exp.icon as any}
                    size={24}
                    color={exp.selected ? BrandColors.background : '#6B7280'}
                  />
                </View>
                <Text style={[styles.exposureLabel, exp.selected && styles.exposureLabelActive]}>
                  {exp.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ─── Footer CTAs ─── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save check-in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoBtn} onPress={handleSave} activeOpacity={0.7}>
          <MaterialIcons name="add-a-photo" size={18} color={BrandColors.primary} />
          <Text style={styles.photoBtnText}>Save & add photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  headerDate: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  section: { marginBottom: 28 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#D1D5DB', marginBottom: 14 },

  /* ─── Itch Slider ─── */
  itchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  itchValueWrap: { flexDirection: 'row', alignItems: 'baseline' },
  itchValue: { fontSize: 28, fontWeight: '700', color: BrandColors.primary },
  itchMax: { fontSize: 14, color: '#6B7280', marginLeft: 2 },

  sliderTrack: {
    height: 40, justifyContent: 'center', position: 'relative', marginBottom: 4,
  },
  trackBg: {
    position: 'absolute', left: 0, right: 0,
    height: 4, borderRadius: 2, backgroundColor: '#1F2937',
  },
  trackFill: {
    position: 'absolute', left: 0,
    height: 4, borderRadius: 2, backgroundColor: BrandColors.primary,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: BrandColors.primary,
    borderWidth: 2, borderColor: '#FFFFFF',
    marginLeft: -12,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 5,
  },

  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center', alignItems: 'center',
  },
  stepperLabels: { flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingHorizontal: 8 },
  stepperLabel: { fontSize: 11, color: '#4B5563', fontWeight: '500' },
  stepperActive: { color: '#9CA3AF' },

  /* ─── Body Chips ─── */
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(55,65,81,0.6)',
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, shadowRadius: 8,
  },
  chipText: { fontSize: 13, fontWeight: '500', color: '#9CA3AF' },
  chipTextActive: { color: BrandColors.background, fontWeight: '600' },
  chipDashed: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(55,65,81,0.6)',
    borderStyle: 'dashed',
  },
  chipDashedText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },

  /* ─── Skin Signs ─── */
  signsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  signCard: {
    width: '47%', flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
    backgroundColor: 'rgba(17,24,39,0.6)',
  },
  signCardActive: {
    borderColor: 'rgba(45,212,191,0.4)',
    backgroundColor: 'rgba(45,212,191,0.08)',
  },
  signCheck: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 1, borderColor: '#4B5563',
    justifyContent: 'center', alignItems: 'center',
  },
  signCheckActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  signText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  signTextActive: { color: '#FFFFFF' },

  /* ─── Exposures ─── */
  exposureRow: { flexDirection: 'row', justifyContent: 'space-between' },
  exposureItem: { alignItems: 'center', gap: 8 },
  exposureIcon: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: '#1F2937',
    borderWidth: 1, borderColor: 'rgba(55,65,81,0.6)',
    justifyContent: 'center', alignItems: 'center',
  },
  exposureIconActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, shadowRadius: 10,
  },
  exposureLabel: { fontSize: 11, fontWeight: '500', color: '#6B7280' },
  exposureLabelActive: { color: BrandColors.primary },

  /* ─── Footer ─── */
  footer: {
    paddingHorizontal: 20, paddingVertical: 16, gap: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)',
  },
  saveBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 16, borderRadius: 14,
    alignItems: 'center',
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: BrandColors.background },
  photoBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 16, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.25)',
  },
  photoBtnText: { fontSize: 14, fontWeight: '600', color: BrandColors.primary },
});
