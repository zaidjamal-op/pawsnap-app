import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';

interface BaselineScreenProps {
  petName?: string;
  onFinish: () => void;
  onSkip: () => void;
}

const DIET_OPTIONS = [
  { id: 'dry', label: 'Dry Food', icon: 'grid' as const },
  { id: 'wet', label: 'Wet Food', icon: 'water' as const },
  { id: 'home', label: 'Home-cooked', icon: 'restaurant' as const },
  { id: 'raw', label: 'Raw', icon: 'paw' as const },
];

const FLEA_OPTIONS = ['Yes', 'No', 'Not sure'];

export default function BaselineScreen({ petName = 'your pet', onFinish, onSkip }: BaselineScreenProps) {
  const [fleaIndex, setFleaIndex] = useState(0);
  const [dietId, setDietId] = useState('dry');
  const [triggers, setTriggers] = useState<string[]>(['Grass', 'Chicken']);
  const [triggerInput, setTriggerInput] = useState('');
  const [medications, setMedications] = useState<{ name: string; dose: string }[]>([
    { name: 'Apoquel', dose: '5.4mg / Daily' },
  ]);

  const addTrigger = () => {
    const tag = triggerInput.trim();
    if (tag && !triggers.includes(tag)) {
      setTriggers([...triggers, tag]);
      setTriggerInput('');
    }
  };

  const removeTrigger = (tag: string) => {
    setTriggers(triggers.filter((t) => t !== tag));
  };

  const removeMed = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress bar */}
        {/* <Animated.View entering={FadeIn.duration(400)} style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </Animated.View> */}

        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.headerBlock}>
          <Text style={styles.title}>Baseline</Text>
          <Text style={styles.subtitle}>(2 minutes)</Text>
          <Text style={styles.description}>
            This helps insights become useful faster for {petName}.
          </Text>
        </Animated.View>

        {/* Flea Prevention */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.section}>
          <Text style={styles.sectionLabel}>
            Is {petName} on flea prevention?
          </Text>
          <View style={styles.segmentedControl}>
            {FLEA_OPTIONS.map((opt, i) => (
              <TouchableOpacity
                key={opt}
                style={[styles.segmentItem, fleaIndex === i && styles.segmentActive]}
                onPress={() => setFleaIndex(i)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.segmentText, fleaIndex === i && styles.segmentTextActive]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Diet */}
        <Animated.View entering={FadeInDown.delay(300).duration(450)} style={styles.section}>
          <Text style={styles.sectionLabel}>Current Diet</Text>
          <View style={styles.dietGrid}>
            {DIET_OPTIONS.map((d) => {
              const active = dietId === d.id;
              return (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.dietCard, active && styles.dietCardActive]}
                  onPress={() => setDietId(d.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={d.icon}
                    size={28}
                    color={active ? BrandColors.primary : 'rgba(148,163,184,0.5)'}
                  />
                  <Text style={[styles.dietLabel, active && styles.dietLabelActive]}>
                    {d.label}
                  </Text>
                  {active && (
                    <View style={styles.dietCheck}>
                      <Ionicons name="checkmark" size={12} color={BrandColors.background} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Known Triggers */}
        <Animated.View entering={FadeInDown.delay(400).duration(450)} style={styles.section}>
          <Text style={styles.sectionLabel}>Known Triggers</Text>
          {triggers.length > 0 && (
            <View style={styles.tagRow}>
              {triggers.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTrigger(tag)} activeOpacity={0.7}>
                    <Ionicons name="close" size={14} color={BrandColors.background} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <View style={styles.tagInputRow}>
            <TextInput
              style={styles.tagInput}
              placeholder="Type to add tags..."
              placeholderTextColor="rgba(107,114,128,0.7)"
              value={triggerInput}
              onChangeText={setTriggerInput}
              onSubmitEditing={addTrigger}
              returnKeyType="done"
            />
            {triggerInput.length > 0 && (
              <TouchableOpacity onPress={addTrigger} style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Medications */}
        <Animated.View entering={FadeInDown.delay(500).duration(450)} style={styles.section}>
          <Text style={styles.sectionLabel}>Current Medications</Text>
          <View style={styles.medList}>
            {/* Add button */}
            <TouchableOpacity style={styles.medAddCard} activeOpacity={0.7}>
              <View style={styles.medIconCircle}>
                <Ionicons name="add" size={22} color="rgba(148,163,184,0.5)" />
              </View>
              <Text style={styles.medAddText}>Add medication</Text>
            </TouchableOpacity>
            {/* Meds */}
            {medications.map((med, i) => (
              <View key={i} style={styles.medCard}>
                <View style={styles.medIconActive}>
                  <Ionicons name="medkit" size={18} color={BrandColors.primary} />
                </View>
                <View style={styles.medInfo}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDose}>{med.dose}</Text>
                </View>
                <TouchableOpacity onPress={() => removeMed(i)} activeOpacity={0.7}>
                  <Ionicons name="trash-outline" size={18} color="rgba(148,163,184,0.5)" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
        <LinearGradient
          colors={['transparent', BrandColors.background, BrandColors.background]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.footerInner}>
          <TouchableOpacity style={styles.finishButton} onPress={onFinish} activeOpacity={0.85}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  progressDot: {
    height: 6,
    width: 48,
    borderRadius: 3,
    backgroundColor: 'rgba(31,41,55,0.8)',
  },
  progressActive: {
    backgroundColor: BrandColors.primary,
  },

  // Header
  headerBlock: { marginBottom: 28 },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(156,163,175,0.8)',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(156,163,175,0.7)',
    marginTop: 8,
    lineHeight: 22,
  },

  // Section
  section: { marginBottom: 28 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(229,231,235,0.9)',
    marginBottom: 14,
  },

  // Segmented control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(31,41,55,0.6)',
    borderRadius: 9999,
    padding: 5,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
  },
  segmentActive: { backgroundColor: BrandColors.primary },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(148,163,184,0.6)',
  },
  segmentTextActive: { color: BrandColors.background },

  // Diet grid
  dietGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dietCard: {
    width: '47%',
    backgroundColor: 'rgba(31,41,55,0.4)',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  dietCardActive: {
    borderColor: BrandColors.primary,
    backgroundColor: `${BrandColors.primary}15`,
  },
  dietLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.6)',
  },
  dietLabelActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dietCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Triggers
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.background,
  },
  tagInputRow: {
    position: 'relative',
  },
  tagInput: {
    backgroundColor: 'rgba(31,41,55,0.6)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 14,
    color: '#FFFFFF',
  },
  addBtn: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.primary,
  },

  // Medications
  medList: { gap: 12 },
  medAddCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(31,41,55,0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(107,114,128,0.4)',
    gap: 12,
  },
  medIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(55,65,81,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medAddText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.6)',
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(31,41,55,0.7)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.5)',
    gap: 12,
  },
  medIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${BrandColors.primary}25`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medInfo: { flex: 1 },
  medName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  medDose: {
    fontSize: 12,
    color: 'rgba(148,163,184,0.6)',
    marginTop: 2,
  },

  // Footer
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    paddingTop: 40,
  },
  footerInner: { alignItems: 'center', gap: 16 },
  finishButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    width: '100%',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.background,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.6)',
  },
});
