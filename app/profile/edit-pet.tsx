import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock data
const PET_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmq82oNYpg7bI14uEhifEN_e6w1edgfURf-A6U1yy_rC7IGiFjgybpdCrPjICi-ZkywnliL-jqPxO36fYyTXFNmPvloFJp9ZPyG9grS1Ki01YB5i5YzQjTmv3ZsDKY_WHq15PaIBPf85A8xsYt6_voBYiHE4jRaVr2bpgJ5TMFqanDqKgB2BSt5NuRfAVYF-NGdhX7h1ina5PlekOiKLe15Qr29M5VILRzM7bjVGO2pPEG8wSrjKtdE3-CwWfY0OOcAe7cCILCbCnE';

export default function EditPetScreen() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState('Luna');
  const [species, setSpecies] = useState<'Dog' | 'Cat'>('Dog');
  const [age, setAge] = useState('4 yrs');
  const [breed, setBreed] = useState('Golden Retriever');
  const [environment, setEnvironment] = useState<'Indoor' | 'Outdoor'>('Indoor');
  const [fleaPrevention, setFleaPrevention] = useState(true);
  const [hypoDiet, setHypoDiet] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit {name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Avatar Section ─── */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.avatarSection}>
          <View style={styles.avatarOuter}>
            <Image source={{ uri: PET_AVATAR }} style={styles.avatar} />
            <TouchableOpacity style={styles.editPhotoBadge} activeOpacity={0.8}>
              <MaterialIcons name="edit" size={12} color={BrandColors.background} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ─── Pet Details Card ─── */}
        <Animated.View entering={FadeInDown.delay(160).duration(500)} style={styles.card}>
          <Text style={styles.cardLabel}>PET DETAILS</Text>

          {/* Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Species + Age row */}
          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Species</Text>
              <View style={styles.selectorWrap}>
                <TouchableOpacity
                  style={styles.selector}
                  activeOpacity={0.7}
                  onPress={() => setSpecies(species === 'Dog' ? 'Cat' : 'Dog')}
                >
                  <Text style={styles.selectorText}>{species}</Text>
                  <MaterialIcons name="expand-more" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>

          {/* Breed */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Breed</Text>
            <TouchableOpacity style={styles.breedBtn} activeOpacity={0.7}>
              <Text style={styles.breedText}>{breed}</Text>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.4)" />
            </TouchableOpacity>
          </View>

          {/* Environment toggle */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Environment</Text>
            <View style={styles.segmentOuter}>
              {(['Indoor', 'Outdoor'] as const).map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.segmentBtn,
                    environment === opt && styles.segmentBtnActive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setEnvironment(opt)}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      environment === opt && styles.segmentTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* ─── Update Baseline Card ─── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.card}>
          <View style={styles.baselineHeader}>
            <MaterialIcons name="medical-services" size={18} color={BrandColors.primary} />
            <Text style={styles.cardLabel}>UPDATE BASELINE</Text>
          </View>

          {/* Flea Prevention */}
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Flea Prevention</Text>
              <Text style={styles.toggleSub}>Regular medication</Text>
            </View>
            <Switch
              value={fleaPrevention}
              onValueChange={setFleaPrevention}
              trackColor={{ false: '#1F2937', true: BrandColors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#1F2937"
            />
          </View>

          <View style={styles.divider} />

          {/* Hypoallergenic Diet */}
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Hypoallergenic Diet</Text>
              <Text style={styles.toggleSub}>Strict limitation</Text>
            </View>
            <Switch
              value={hypoDiet}
              onValueChange={setHypoDiet}
              trackColor={{ false: '#1F2937', true: BrandColors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#1F2937"
            />
          </View>
        </Animated.View>

        {/* ─── Actions ─── */}
        <Animated.View entering={FadeInDown.delay(420).duration(400)} style={styles.actions}>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={() => router.back()}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
            <MaterialIcons name="delete-outline" size={18} color="#6B7280" />
            <Text style={styles.deleteBtnText}>Delete Pet Profile</Text>
          </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 4 },

  /* ─── Avatar ─── */
  avatarSection: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  avatarOuter: {
    position: 'relative',
    width: 104, height: 104,
    borderRadius: 52,
    borderWidth: 2, borderColor: 'rgba(148,163,184,0.15)',
    padding: 3,
    marginBottom: 8,
  },
  avatar: { width: '100%', height: '100%', borderRadius: 50 },
  editPhotoBadge: {
    position: 'absolute', bottom: 2, right: 2,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: BrandColors.background,
  },
  changePhotoText: { fontSize: 13, fontWeight: '600', color: BrandColors.primary },

  /* ─── Card ─── */
  card: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, padding: 20,
    marginBottom: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  cardLabel: {
    fontSize: 11, fontWeight: '700', color: '#6B7280',
    letterSpacing: 1.2, marginBottom: 16,
  },

  /* ─── Fields ─── */
  fieldGroup: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 11, fontWeight: '600', color: '#6B7280',
    marginBottom: 6, marginLeft: 4,
  },
  input: {
    backgroundColor: BrandColors.background,
    borderRadius: 999, paddingVertical: 14, paddingHorizontal: 18,
    fontSize: 15, fontWeight: '500', color: '#FFFFFF',
  },
  row: { flexDirection: 'row', gap: 12 },

  selectorWrap: {},
  selector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.background,
    borderRadius: 999, paddingVertical: 14, paddingHorizontal: 18,
  },
  selectorText: { fontSize: 15, fontWeight: '500', color: '#FFFFFF' },

  breedBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.background,
    borderRadius: 999, paddingVertical: 14, paddingHorizontal: 18,
  },
  breedText: { fontSize: 15, fontWeight: '500', color: '#FFFFFF' },

  /* Segment */
  segmentOuter: {
    flexDirection: 'row', backgroundColor: BrandColors.background,
    borderRadius: 999, padding: 4,
  },
  segmentBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 999,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: BrandColors.primary,
  },
  segmentText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  segmentTextActive: { color: BrandColors.background, fontWeight: '700' },

  /* ─── Baseline ─── */
  baselineHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginBottom: 4,
  },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12,
  },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  toggleSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  divider: {
    height: 1, backgroundColor: 'rgba(255,255,255,0.04)',
  },

  /* ─── Actions ─── */
  actions: { gap: 4 },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 16,
    elevation: 8,
  },
  saveBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },

  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 14,
  },
  deleteBtnText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
});
