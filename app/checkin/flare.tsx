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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const TRIGGERS = [
  'New food',
  'High humidity',
  'Grass',
  'Grooming',
  'Missed meds',
];

export default function FlareModeScreen() {
  const router = useRouter();
  const [itchLevel, setItchLevel] = useState(7);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(['New food', 'Grooming']);
  const [notes, setNotes] = useState('');

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]
    );
  };

  const handleSave = () => {
    Alert.alert('Flare Saved', 'Your flare has been logged.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flare Mode</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Context Header ─── */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)}>
          <Text style={styles.heroTitle}>Quickly capture a sudden flare.</Text>
          <Text style={styles.heroSub}>Log the details now so you don't forget later.</Text>
        </Animated.View>

        {/* ─── Itch Slider Card ─── */}
        <Animated.View entering={FadeInDown.delay(140).duration(400)} style={styles.itchCard}>
          <View style={styles.itchCardHeader}>
            <Text style={styles.itchLabel}>ITCH RIGHT NOW</Text>
            <View style={styles.itchValueWrap}>
              <Text style={styles.itchValue}>{itchLevel}</Text>
              <Text style={styles.itchMax}>/10</Text>
            </View>
          </View>

          {/* Slider track */}
          <View style={styles.sliderTrack}>
            <View style={styles.trackBg} />
            <View style={[styles.trackFill, { width: `${itchLevel * 10}%` }]} />
            <TouchableOpacity
              style={[styles.sliderThumb, { left: `${itchLevel * 10}%` }]}
              activeOpacity={1}
            />
          </View>

          {/* Stepper */}
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setItchLevel(Math.max(0, itchLevel - 1))}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>No itch</Text>
              <Text style={styles.sliderLabelText}>Unbearable</Text>
            </View>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setItchLevel(Math.min(10, itchLevel + 1))}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Triggers ─── */}
        <Animated.View entering={FadeInDown.delay(220).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>What changed in last 48h?</Text>
          <View style={styles.triggerWrap}>
            {TRIGGERS.map((trigger) => {
              const active = selectedTriggers.includes(trigger);
              return (
                <TouchableOpacity
                  key={trigger}
                  style={[styles.triggerChip, active && styles.triggerChipActive]}
                  onPress={() => toggleTrigger(trigger)}
                  activeOpacity={0.7}
                >
                  {active && <Ionicons name="checkmark" size={14} color={BrandColors.primary} />}
                  <Text style={[styles.triggerText, active && styles.triggerTextActive]}>
                    {trigger}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.triggerChipOther} activeOpacity={0.7}>
              <Ionicons name="add" size={14} color="#6B7280" />
              <Text style={styles.triggerOtherText}>Other</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Photo Upload ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Visual Evidence</Text>
          <TouchableOpacity style={styles.photoUpload} activeOpacity={0.7}>
            <View style={styles.photoIconWrap}>
              <MaterialIcons name="add-a-photo" size={26} color={BrandColors.primary} />
            </View>
            <Text style={styles.photoTitle}>Add photo</Text>
            <Text style={styles.photoSub}>Tap to capture or upload</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ─── Notes ─── */}
        <Animated.View entering={FadeInDown.delay(380).duration(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any specific behaviors?"
            placeholderTextColor="#4B5563"
            multiline
            textAlignVertical="top"
          />
        </Animated.View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ─── Footer CTA ─── */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save flare</Text>
          <MaterialIcons name="arrow-forward" size={20} color={BrandColors.background} />
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={styles.disclaimerRow}>
          <Ionicons name="information-circle" size={16} color="#6B7280" />
          <Text style={styles.disclaimerText}>
            If symptoms are severe or rapidly worsening, contact your veterinarian immediately. This log is not a diagnosis.
          </Text>
        </View>
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
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  /* Hero */
  heroTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  heroSub: { fontSize: 14, color: '#6B7280', marginBottom: 24 },

  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginBottom: 12 },

  /* ─── Itch Card ─── */
  itchCard: {
    backgroundColor: '#151B23',
    borderRadius: 16, padding: 20,
    marginBottom: 28,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  itchCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: 20,
  },
  itchLabel: {
    fontSize: 12, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 1.2,
  },
  itchValueWrap: { flexDirection: 'row', alignItems: 'baseline' },
  itchValue: { fontSize: 32, fontWeight: '700', color: BrandColors.primary },
  itchMax: { fontSize: 16, color: '#6B7280' },

  sliderTrack: {
    height: 32, justifyContent: 'center', position: 'relative', marginBottom: 8,
  },
  trackBg: {
    position: 'absolute', left: 0, right: 0,
    height: 4, borderRadius: 2,
    backgroundColor: '#2D3748',
  },
  trackFill: {
    position: 'absolute', left: 0,
    height: 4, borderRadius: 2, backgroundColor: BrandColors.primary,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: BrandColors.primary,
    marginLeft: -12,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center', alignItems: 'center',
  },
  sliderLabels: {
    flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingHorizontal: 8,
  },
  sliderLabelText: { fontSize: 11, color: '#6B7280', fontWeight: '500' },

  /* ─── Triggers ─── */
  triggerWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  triggerChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    backgroundColor: '#151B23',
    borderWidth: 1, borderColor: 'rgba(55,65,81,0.6)',
  },
  triggerChipActive: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    borderColor: BrandColors.primary,
  },
  triggerText: { fontSize: 13, fontWeight: '500', color: '#9CA3AF' },
  triggerTextActive: { color: BrandColors.primary },
  triggerChipOther: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10,
    backgroundColor: '#151B23',
    borderWidth: 1, borderColor: 'rgba(55,65,81,0.6)',
  },
  triggerOtherText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },

  /* ─── Photo Upload ─── */
  photoUpload: {
    height: 120, borderRadius: 16,
    borderWidth: 2, borderColor: 'rgba(45,212,191,0.25)',
    borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  photoIconWrap: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(45,212,191,0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 4,
  },
  photoTitle: { fontSize: 14, fontWeight: '600', color: BrandColors.primary },
  photoSub: { fontSize: 11, color: '#6B7280' },

  /* ─── Notes ─── */
  notesInput: {
    backgroundColor: '#151B23',
    borderRadius: 12, padding: 14,
    height: 80, fontSize: 13, color: '#FFFFFF',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },

  /* ─── Footer ─── */
  footer: {
    paddingHorizontal: 20, paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 28 : 16,
  },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 14,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
    marginBottom: 12,
  },
  saveBtnText: { fontSize: 17, fontWeight: '700', color: BrandColors.background },
  disclaimerRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: 'rgba(31,41,55,0.3)',
    padding: 12, borderRadius: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)',
  },
  disclaimerText: { fontSize: 11, color: '#6B7280', lineHeight: 16, flex: 1 },
});
