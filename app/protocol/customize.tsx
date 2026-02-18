import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { usePets } from '@/context/PetContext';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

// ─── Task Data ───
interface ProtocolTask {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  tag?: string;
  defaultOn: boolean;
}

const TASKS: ProtocolTask[] = [
  {
    id: 'no-treats',
    title: 'No new treats',
    subtitle: '',
    icon: 'block',
    tag: 'STRICT',
    defaultOn: true,
  },
  {
    id: 'wipe-paws',
    title: 'Wipe paws',
    subtitle: 'After every walk',
    icon: 'pets',
    defaultOn: true,
  },
  {
    id: 'bath-log',
    title: 'Bath log',
    subtitle: 'Record shampoo used',
    icon: 'bathtub',
    defaultOn: false,
  },
  {
    id: 'flea',
    title: 'Flea prevention',
    subtitle: 'Confirm status',
    icon: 'medical-services',
    defaultOn: true,
  },
];

export default function CustomizeProtocolScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = params.title as string;
  const { startProtocol } = usePets();

  // Task toggle states
  const [taskStates, setTaskStates] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TASKS.forEach((t) => { initial[t.id] = t.defaultOn; });
    return initial;
  });

  const toggleTask = (id: string) => {
    setTaskStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const enabledCount = Object.values(taskStates).filter(Boolean).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Customize Protocol" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.delay(50).duration(400)}>
          <Text style={styles.heroTitle}>14-Day Routine</Text>
          <Text style={styles.heroDesc}>
            Select the daily tasks you commit to for the next two weeks. Consistency is key for accurate results.
          </Text>
        </Animated.View>

        {/* Progress Bar */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
          <Text style={styles.progressLabel}>STEP 1/3</Text>
        </Animated.View>

        {/* Task Cards */}
        {TASKS.map((task, index) => {
          const isOn = taskStates[task.id];
          return (
            <Animated.View
              key={task.id}
              entering={FadeInDown.delay(150 + index * 80).duration(500)}
            >
              <View style={[styles.taskCard, !isOn && styles.taskCardDimmed]}>
                {/* Icon */}
                <View style={[
                  styles.taskIconCircle,
                  isOn
                    ? { backgroundColor: 'rgba(45,212,191,0.1)' }
                    : { backgroundColor: 'rgba(75,85,99,0.2)' },
                ]}>
                  <MaterialIcons
                    name={task.icon}
                    size={20}
                    color={isOn ? BrandColors.primary : '#6B7280'}
                  />
                </View>

                {/* Text */}
                <View style={styles.taskTextCol}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.tag ? (
                    <Text style={styles.taskTag}>{task.tag}</Text>
                  ) : task.subtitle ? (
                    <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                  ) : null}
                </View>

                {/* Toggle */}
                <Switch
                  value={isOn}
                  onValueChange={() => toggleTask(task.id)}
                  trackColor={{ false: '#374151', true: BrandColors.primary }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#374151"
                />
              </View>
            </Animated.View>
          );
        })}

        {/* Add Custom Task */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
          <TouchableOpacity style={styles.addTaskBtn} activeOpacity={0.7}>
            <MaterialIcons name="add-circle-outline" size={22} color="#6B7280" />
            <Text style={styles.addTaskText}>Add Custom Task</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom spacer for sticky CTA */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.ctaWrapper}>
        <View style={styles.ctaGradientFade} />
        <TouchableOpacity
          style={[styles.ctaBtn, enabledCount === 0 && { opacity: 0.5 }]}
          activeOpacity={0.85}
          disabled={enabledCount === 0}
          onPress={() => {
            startProtocol(title || 'Custom Protocol');
            router.replace('/(tabs)/protocol');
          }}
        >
          <Text style={styles.ctaBtnText}>Start 14-day Protocol</Text>
          <MaterialIcons name="arrow-forward" size={20} color={BrandColors.background} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 8 },

  /* Hero */
  heroTitle: {
    fontSize: 32, fontWeight: '800', color: '#FFFFFF',
    letterSpacing: -0.5, marginBottom: 12,
  },
  heroDesc: {
    fontSize: 15, color: '#9CA3AF', lineHeight: 23,
    marginBottom: 24,
  },

  /* Progress */
  progressRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginBottom: 28,
  },
  progressTrack: {
    flex: 1, height: 6, borderRadius: 3,
    backgroundColor: BrandColors.surface,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%', borderRadius: 3,
    backgroundColor: BrandColors.primary,
  },
  progressLabel: {
    fontSize: 11, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 0.5,
  },

  /* Task Cards */
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  taskCardDimmed: {
    opacity: 0.6,
  },
  taskIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  taskTextCol: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  taskTag: {
    fontSize: 11, fontWeight: '800', color: BrandColors.primary,
    letterSpacing: 0.8, marginTop: 2,
  },
  taskSubtitle: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },

  /* Add Custom Task */
  addTaskBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(75,85,99,0.5)',
    marginTop: 4,
  },
  addTaskText: { fontSize: 14, fontWeight: '700', color: '#6B7280' },

  /* Sticky CTA */
  ctaWrapper: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  ctaGradientFade: {
    position: 'absolute',
    top: -40, left: 0, right: 0, height: 40,
    // Simulated gradient fade — in production use LinearGradient
  },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 16,
    elevation: 8,
  },
  ctaBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
});
