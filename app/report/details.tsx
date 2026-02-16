import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface DetailToggle {
  icon: string;
  title: string;
  subtitle: string;
  defaultOn: boolean;
}

const TOGGLES: DetailToggle[] = [
  { icon: 'camera-enhance', title: 'Include Condition Photos', subtitle: 'Visual progress tracking', defaultOn: true },
  { icon: 'hub', title: 'Include Exposures & Associations', subtitle: 'Environmental patterns', defaultOn: false },
  { icon: 'checklist-rtl', title: 'Include Protocol Compliance', subtitle: 'Routine adherence', defaultOn: true },
];

export default function ReportDetailsScreen() {
  const router = useRouter();
  const { range } = useLocalSearchParams<{ range: string }>();
  const [toggleStates, setToggleStates] = useState(
    TOGGLES.map((t) => t.defaultOn)
  );

  const toggleItem = (index: number) => {
    setToggleStates((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleGenerate = () => {
    router.push('/report/generating');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vet Report Wizard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.stepLabel}>STEP 2 OF 3</Text>
              <Text style={styles.stepSub}>Report Customization</Text>
            </View>
            <Text style={styles.percentText}>66%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </Animated.View>

        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.heroSection}>
          <Text style={styles.heroTitle}>Report Details</Text>
          <Text style={styles.heroDesc}>
            Select what you want to include in the medical history export.
          </Text>
        </Animated.View>

        {/* Toggle Cards */}
        <View style={styles.togglesWrap}>
          {TOGGLES.map((item, i) => (
            <Animated.View
              key={item.title}
              entering={FadeInDown.delay(200 + i * 80).duration(400)}
            >
              <View style={styles.toggleCard}>
                <View style={styles.toggleLeft}>
                  <View style={styles.toggleIconCircle}>
                    <MaterialIcons name={item.icon as any} size={24} color={BrandColors.primary} />
                  </View>
                  <View style={styles.toggleTextWrap}>
                    <Text style={styles.toggleTitle}>{item.title}</Text>
                    <Text style={styles.toggleSub}>{item.subtitle}</Text>
                  </View>
                </View>
                <Switch
                  value={toggleStates[i]}
                  onValueChange={() => toggleItem(i)}
                  trackColor={{ false: '#374151', true: BrandColors.primary }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#374151"
                />
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Info */}
        <Animated.View entering={FadeInDown.delay(480).duration(400)} style={styles.infoBox}>
          <Ionicons name="information-circle" size={18} color={BrandColors.primary} />
          <Text style={styles.infoText}>
            Exported reports are encrypted and can be shared directly with your veterinarian via the secure link.
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} activeOpacity={0.85}>
          <Text style={styles.generateBtnText}>Generate Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.draftBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.draftBtnText}>Save Draft and Exit</Text>
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
    paddingHorizontal: 16, paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: BrandColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8 },

  /* Progress */
  progressSection: { marginBottom: 24 },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 11, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 1.2,
  },
  stepSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  percentText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  progressTrack: {
    width: '100%', height: 6, borderRadius: 3,
    backgroundColor: BrandColors.surface, overflow: 'hidden',
  },
  progressFill: {
    width: '66%', height: '100%', borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },

  /* Hero */
  heroSection: { marginBottom: 24 },
  heroTitle: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  heroDesc: { fontSize: 15, color: '#6B7280', lineHeight: 22 },

  /* Toggles */
  togglesWrap: { gap: 14 },
  toggleCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 18, borderRadius: 18,
    backgroundColor: BrandColors.surface,
    borderWidth: 1, borderColor: 'rgba(31,41,55,0.8)',
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  toggleIconCircle: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  toggleTextWrap: { flex: 1, marginRight: 12 },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 2 },
  toggleSub: { fontSize: 12, color: '#6B7280' },

  /* Info */
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    marginTop: 28, padding: 14, borderRadius: 14,
    backgroundColor: 'rgba(45,212,191,0.04)',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
  },
  infoText: { fontSize: 13, color: '#94A3B8', lineHeight: 19, flex: 1 },

  /* Footer */
  footer: {
    paddingHorizontal: 24, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    alignItems: 'center',
  },
  generateBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999, width: '100%',
    alignItems: 'center',
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  generateBtnText: { fontSize: 17, fontWeight: '700', color: BrandColors.background },
  draftBtn: { marginTop: 12 },
  draftBtnText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
});
