import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

export default function NotificationsScreen() {
  const router = useRouter();

  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [protocolReminders, setProtocolReminders] = useState(true);
  const [reminderTime] = useState('8:00 PM');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Illustration ─── */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.illustrationWrap}>
          <View style={styles.bellCircle}>
            <MaterialIcons name="notifications-active" size={36} color={BrandColors.primary} />
            <View style={styles.bellPing} />
          </View>
          <Text style={styles.illustrationText}>
            Stay on top of your pet's health with timely reminders for logs and routines.
          </Text>
        </Animated.View>

        {/* ─── Daily Tracking ─── */}
        <Animated.View entering={FadeInDown.delay(160).duration(500)}>
          <Text style={styles.sectionTitle}>DAILY TRACKING</Text>
          <View style={styles.card}>
            {/* Toggle row */}
            <View style={[styles.toggleRow, styles.toggleRowBorder]}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(45,212,191,0.08)' }]}>
                  <MaterialIcons name="edit-calendar" size={20} color={BrandColors.primary} />
                </View>
                <View>
                  <Text style={styles.toggleTitle}>Daily Reminder</Text>
                  <Text style={styles.toggleSub}>Log itch levels every day</Text>
                </View>
              </View>
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: '#1F2937', true: BrandColors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#1F2937"
              />
            </View>

            {/* Time Picker row */}
            <TouchableOpacity style={styles.timeRow} activeOpacity={0.7}>
              <Text style={styles.timeLabel}>Reminder Time</Text>
              <View style={styles.timePill}>
                <Text style={styles.timeValue}>{reminderTime}</Text>
                <MaterialIcons name="expand-more" size={16} color="#6B7280" />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ─── Insights ─── */}
        <Animated.View entering={FadeInDown.delay(280).duration(500)}>
          <Text style={styles.sectionTitle}>INSIGHTS</Text>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(168,85,247,0.08)' }]}>
                  <MaterialIcons name="insights" size={20} color="#A855F7" />
                </View>
                <View>
                  <Text style={styles.toggleTitle}>Weekly Summary</Text>
                  <Text style={styles.toggleSub}>Get a Sunday digest of patterns</Text>
                </View>
              </View>
              <Switch
                value={weeklySummary}
                onValueChange={setWeeklySummary}
                trackColor={{ false: '#1F2937', true: BrandColors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#1F2937"
              />
            </View>
          </View>
        </Animated.View>

        {/* ─── Health Routine ─── */}
        <Animated.View entering={FadeInDown.delay(380).duration(500)}>
          <Text style={styles.sectionTitle}>HEALTH ROUTINE</Text>
          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleLeft}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(59,130,246,0.08)' }]}>
                  <MaterialIcons name="medical-services" size={20} color="#3B82F6" />
                </View>
                <View>
                  <Text style={styles.toggleTitle}>Protocol Reminders</Text>
                  <Text style={styles.toggleSub}>Alerts for 14-day routine tasks</Text>
                </View>
              </View>
              <Switch
                value={protocolReminders}
                onValueChange={setProtocolReminders}
                trackColor={{ false: '#1F2937', true: BrandColors.primary }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#1F2937"
              />
            </View>
          </View>
        </Animated.View>

        {/* ─── System Permissions ─── */}
        <Animated.View entering={FadeInDown.delay(460).duration(400)} style={styles.permissionsWrap}>
          <TouchableOpacity style={styles.permissionsBtn} activeOpacity={0.7}>
            <Text style={styles.permissionsText}>Manage System Permissions</Text>
            <MaterialIcons name="open-in-new" size={12} color={BrandColors.primary} />
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

  /* ─── Illustration ─── */
  illustrationWrap: { alignItems: 'center', paddingVertical: 24, marginBottom: 8 },
  bellCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(45,212,191,0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 14, position: 'relative',
  },
  bellPing: {
    position: 'absolute', inset: 0,
    borderRadius: 36, borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.15)',
  },
  illustrationText: {
    fontSize: 13, color: '#6B7280', textAlign: 'center',
    lineHeight: 20, maxWidth: 250,
  },

  /* ─── Sections ─── */
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: '#6B7280',
    letterSpacing: 1.5, marginBottom: 10, paddingLeft: 4,
  },
  card: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20, overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 18,
  },
  toggleRowBorder: {
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1, marginRight: 12 },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  toggleSub: { fontSize: 11, color: '#6B7280', marginTop: 2 },

  /* Time picker */
  timeRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 18,
  },
  timeLabel: { fontSize: 14, fontWeight: '500', color: '#9CA3AF' },
  timePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10,
  },
  timeValue: { fontSize: 16, fontWeight: '700', color: BrandColors.primary },

  /* ─── Permissions ─── */
  permissionsWrap: { alignItems: 'center', paddingTop: 8 },
  permissionsBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  permissionsText: { fontSize: 12, fontWeight: '600', color: BrandColors.primary },
});
