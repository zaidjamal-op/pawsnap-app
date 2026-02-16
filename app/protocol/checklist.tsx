import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

// ─── Constants ───
const CURRENT_DAY = 5;
const PROTOCOL_DAYS = 14;
const PROTOCOL_NAME = 'Elimination Diet Protocol';

// Progress ring
const RING_SIZE = 72;
const RING_STROKE = 5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface ChecklistTask {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  completed: boolean;
}

const INITIAL_TASKS: ChecklistTask[] = [
  {
    id: 'no-treats',
    title: 'No new treats',
    subtitle: 'Avoid all new foods',
    icon: 'cookie',
    completed: true,
  },
  {
    id: 'wipe-paws',
    title: 'Wipe paws after walks',
    subtitle: 'Remove allergens',
    icon: 'pets',
    completed: false,
  },
  {
    id: 'skin-cream',
    title: 'Apply skin barrier cream',
    subtitle: 'Twice daily',
    icon: 'healing',
    completed: false,
  },
];

export default function ChecklistScreen() {
  const router = useRouter();
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const [notes, setNotes] = React.useState('');

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = completedCount / tasks.length;
  const progressOffset = RING_CIRCUMFERENCE * (1 - progress);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader
        title={
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>
              Day {CURRENT_DAY} of {PROTOCOL_DAYS}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '600', color: BrandColors.primary, marginTop: 2 }}>
              {PROTOCOL_NAME}
            </Text>
          </View>
        }
        rightElement={
          <TouchableOpacity activeOpacity={0.7} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="more-horiz" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.progressCard}>
          {/* Decorative glow */}
          <View style={styles.progressGlow} />

          <View style={styles.progressRow}>
            {/* Ring */}
            <View style={styles.ringWrap}>
              <Svg width={RING_SIZE} height={RING_SIZE}>
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  stroke="rgba(55,65,81,0.6)"
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                />
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  stroke={BrandColors.primary}
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
                />
              </Svg>
              <View style={styles.ringLabel}>
                <Text style={styles.ringPercent}>{Math.round(progress * 100)}%</Text>
              </View>
            </View>

            {/* Text */}
            <View style={{ flex: 1 }}>
              <Text style={styles.progressTitle}>
                {progress >= 1 ? 'All done! 🎉' : progress >= 0.5 ? 'Almost there!' : 'Getting started!'}
              </Text>
              <Text style={styles.progressDesc}>
                Keep up the good work. Bella is counting on you for a scratch-free day.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Daily Tasks */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <Text style={styles.sectionTitle}>DAILY TASKS</Text>
        </Animated.View>

        {tasks.map((task, index) => (
          <Animated.View
            key={task.id}
            entering={FadeInDown.delay(200 + index * 70).duration(500)}
          >
            <TouchableOpacity
              style={styles.taskCard}
              activeOpacity={0.8}
              onPress={() => toggleTask(task.id)}
            >
              {/* Icon */}
              <View style={[
                styles.taskIcon,
                task.completed
                  ? { backgroundColor: 'rgba(45,212,191,0.15)' }
                  : { backgroundColor: 'rgba(75,85,99,0.2)' },
              ]}>
                <MaterialIcons
                  name={task.icon}
                  size={22}
                  color={task.completed ? BrandColors.primary : '#6B7280'}
                />
              </View>

              {/* Text */}
              <View style={styles.taskText}>
                <Text style={[
                  styles.taskTitle,
                  task.completed && styles.taskTitleDone,
                ]}>
                  {task.title}
                </Text>
                <Text style={[
                  styles.taskSubtitle,
                  task.completed && { color: BrandColors.primary },
                ]}>
                  {task.completed ? 'Completed' : task.subtitle}
                </Text>
              </View>

              {/* Check */}
              {task.completed ? (
                <View style={styles.checkDone}>
                  <MaterialIcons name="check" size={18} color={BrandColors.background} />
                </View>
              ) : (
                <View style={styles.checkEmpty} />
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Daily Observations */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <Text style={[styles.sectionTitle, { marginTop: 28 }]}>DAILY OBSERVATIONS</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.notesCard}>
          <TextInput
            style={styles.notesInput}
            placeholder="Noticed any scratching today? How is Bella's mood?"
            placeholderTextColor="#6B7280"
            multiline
            textAlignVertical="top"
            value={notes}
            onChangeText={setNotes}
          />
          <View style={styles.notesActions}>
            <TouchableOpacity style={styles.notesActionBtn} activeOpacity={0.6}>
              <MaterialIcons name="add-a-photo" size={22} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notesActionBtn} activeOpacity={0.6}>
              <MaterialIcons name="mic" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Bottom spacer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.ctaWrapper}>
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.ctaBtnText}>Complete Day {CURRENT_DAY}</Text>
          <MaterialIcons name="check-circle" size={22} color={BrandColors.background} />
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  headerBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: BrandColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  headerProtocol: {
    fontSize: 12, fontWeight: '600', color: BrandColors.primary,
    marginTop: 2,
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  /* Progress Card */
  progressCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  progressGlow: {
    position: 'absolute', top: -30, right: -30,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: BrandColors.primary,
    opacity: 0.06,
  },
  progressRow: {
    flexDirection: 'row', alignItems: 'center', gap: 18,
  },
  ringWrap: {
    width: RING_SIZE, height: RING_SIZE,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  ringLabel: {
    position: 'absolute',
    alignItems: 'center', justifyContent: 'center',
  },
  ringPercent: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  progressTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  progressDesc: { fontSize: 13, color: '#9CA3AF', lineHeight: 19 },

  /* Section */
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 14, paddingLeft: 2,
  },

  /* Task Cards */
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  taskIcon: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  taskText: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  taskSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  checkDone: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  checkEmpty: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(75,85,99,0.6)',
  },

  /* Notes */
  notesCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    position: 'relative',
  },
  notesInput: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    padding: 16,
    minHeight: 120,
  },
  notesActions: {
    flexDirection: 'row', gap: 4,
    position: 'absolute', bottom: 10, right: 10,
  },
  notesActionBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },

  /* Sticky CTA */
  ctaWrapper: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 16,
    elevation: 8,
  },
  ctaBtnText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
});
