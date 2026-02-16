import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AddPetScreenProps {
  onSave: (petData: PetFormData) => void;
  onCancel: () => void;
}

export interface PetFormData {
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  age: string;
  lifestyle: 'indoor' | 'both' | 'outdoor';
  itchAreas: string[];
}

const AGE_OPTIONS = ['Puppy (< 1yr)', 'Adult (1-7yrs)', 'Senior (7+ yrs)'];
const ITCH_AREAS = ['Ears', 'Paws', 'Belly', 'Tail', 'Back', 'Face'];

export default function AddPetScreen({ onSave, onCancel }: AddPetScreenProps) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [breed, setBreed] = useState('');
  const [ageIndex, setAgeIndex] = useState(0);
  const [lifestyle, setLifestyle] = useState<'indoor' | 'both' | 'outdoor'>('both');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [showAgePicker, setShowAgePicker] = useState(false);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSave = () => {
    onSave({
      name: name || 'My Pet',
      species,
      breed,
      age: AGE_OPTIONS[ageIndex],
      lifestyle,
      itchAreas: selectedAreas,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add your pet</Text>
        <View style={{ width: 50 }} />
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar Upload */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.avatarRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Ionicons name="camera" size={36} color="rgba(148,163,184,0.6)" />
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color={BrandColors.background} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Name */}
        <Animated.View entering={FadeInDown.delay(200).duration(450)} style={styles.fieldGroup}>
          <Text style={styles.label}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Barnaby"
            placeholderTextColor="rgba(71,85,105,0.8)"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </Animated.View>

        {/* Species Toggle */}
        <Animated.View entering={FadeInDown.delay(280).duration(450)}>
          <View style={styles.segmentedControl}>
            {(['dog', 'cat'] as const).map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.segmentItem, species === s && styles.segmentActive]}
                onPress={() => setSpecies(s)}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, species === s && styles.segmentTextActive]}>
                  {s === 'dog' ? 'Dog' : 'Cat'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Breed & Age Row */}
        <Animated.View entering={FadeInDown.delay(360).duration(450)} style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="Optional"
              placeholderTextColor="rgba(71,85,105,0.8)"
              value={breed}
              onChangeText={setBreed}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Age</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => {
                const next = (ageIndex + 1) % AGE_OPTIONS.length;
                setAgeIndex(next);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.pickerText} numberOfLines={1}>
                {AGE_OPTIONS[ageIndex]}
              </Text>
              <Ionicons name="chevron-down" size={18} color="rgba(148,163,184,0.5)" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Lifestyle */}
        <Animated.View entering={FadeInDown.delay(440).duration(450)} style={styles.fieldGroup}>
          <Text style={styles.label}>Lifestyle</Text>
          <View style={styles.segmentedControl}>
            {(['indoor', 'both', 'outdoor'] as const).map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.segmentItem3, lifestyle === l && styles.segmentActive]}
                onPress={() => setLifestyle(l)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentText3,
                    lifestyle === l && styles.segmentTextActive,
                  ]}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Problem Areas */}
        <Animated.View entering={FadeInDown.delay(520).duration(450)} style={styles.fieldGroup}>
          <View style={styles.chipHeader}>
            <Text style={styles.label}>Where are they itching?</Text>
            <Text style={styles.multiLabel}>Multi-select</Text>
          </View>
          <View style={styles.chipWrap}>
            {ITCH_AREAS.map((area) => {
              const active = selectedAreas.includes(area);
              return (
                <TouchableOpacity
                  key={area}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleArea(area)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {area}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Bottom spacer for sticky button */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Save Button */}
      <View style={styles.stickyFooter}>
        <LinearGradient
          colors={['transparent', BrandColors.background, BrandColors.background]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.saveButtonWrap}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: `${BrandColors.background}CC`,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.8)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },

  // Avatar
  avatarRow: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#161b22',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(71,85,105,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Form fields
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.8)',
    marginBottom: 8,
    marginLeft: 16,
  },
  required: {
    color: BrandColors.primary,
  },
  input: {
    backgroundColor: '#161b22',
    borderRadius: 9999,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },

  // Segmented control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#161b22',
    borderRadius: 9999,
    padding: 4,
    marginBottom: 20,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
  },
  segmentItem3: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: BrandColors.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(148,163,184,0.6)',
  },
  segmentText3: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(148,163,184,0.6)',
  },
  segmentTextActive: {
    color: BrandColors.background,
  },

  // Row
  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
  },
  pickerButton: {
    backgroundColor: '#161b22',
    borderRadius: 9999,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerText: {
    fontSize: 15,
    color: '#FFFFFF',
    flex: 1,
  },

  // Chips
  chipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  multiLabel: {
    fontSize: 11,
    color: 'rgba(71,85,105,0.7)',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 4,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.5)',
    backgroundColor: '#161b22',
  },
  chipActive: {
    backgroundColor: `${BrandColors.primary}30`,
    borderColor: BrandColors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(203,213,225,0.8)',
  },
  chipTextActive: {
    color: BrandColors.primary,
  },

  // Sticky footer
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    paddingTop: 40,
  },
  saveButtonWrap: {
    width: '100%',
  },
  saveButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
  },
});
