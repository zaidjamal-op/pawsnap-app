import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const PET_NAME = 'Luna';

function getFormattedDate() {
  const d = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

const QUICK_ACTIONS = [
  { label: 'Add Photo', icon: 'camera' as const, color: BrandColors.primary },
  { label: 'Flare Mode', icon: 'warning' as const, color: '#EF4444' },
  { label: 'Export', icon: 'share-outline' as const, color: BrandColors.primary },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <View>
            <Text style={styles.dateText}>{getFormattedDate()}</Text>
            <Text style={styles.greeting}>Today with {PET_NAME}</Text>
          </View>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Image
                source={require('@/assets/images/pawsnap-logo.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.statusDot} />
          </View>
        </Animated.View>

        {/* Streak Pill */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <View style={styles.streakPill}>
            <Ionicons name="flame" size={14} color="rgba(148,163,184,0.5)" />
            <Text style={styles.streakText}>Day 0 Streak</Text>
          </View>
        </Animated.View>

        {/* Main Status Card (Empty State) */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.statusCard}>
          {/* Decorative glow */}
          <View style={styles.cardGlow} />
          <View style={styles.statusContent}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark-circle-outline" size={40} color="rgba(71,85,105,0.4)" />
            </View>
            <Text style={styles.statusTitle}>No check-in logged today</Text>
            <Text style={styles.statusDesc}>
              Track {PET_NAME}'s itch level daily to build a comprehensive health profile.
            </Text>
            <TouchableOpacity style={styles.logButton} activeOpacity={0.85}>
              <Ionicons name="add" size={22} color={BrandColors.background} />
              <Text style={styles.logButtonText}>Log today's check-in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(350).duration(450)} style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionCard} activeOpacity={0.7}>
              <View
                style={[
                  styles.actionIconCircle,
                  action.color === '#EF4444'
                    ? { backgroundColor: 'rgba(239,68,68,0.15)' }
                    : { backgroundColor: 'rgba(31,41,55,0.8)' },
                ]}
              >
                <Ionicons name={action.icon} size={20} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Insight Teaser */}
        <Animated.View entering={FadeInDown.delay(450).duration(450)}>
          <View style={styles.insightCard}>
            <LinearGradient
              colors={[BrandColors.surface, '#0F1922']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            {/* Right-side primary glow */}
            <View style={styles.insightGlow} />

            <View style={styles.insightRow}>
              <View style={styles.insightIconCircle}>
                <Ionicons name="trending-up" size={20} color={BrandColors.primary} />
              </View>
              <View style={styles.insightTextWrap}>
                <Text style={styles.insightTitle}>Unlock Insights</Text>
                <Text style={styles.insightDesc}>
                  Log 7 days of data to reveal patterns in {PET_NAME}'s itch cycle.
                </Text>
                {/* Progress bar */}
                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.progressLabel}>7 DAYS REMAINING</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.7)',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  avatarWrap: { position: 'relative' },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(71,85,105,0.5)',
    overflow: 'hidden',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: BrandColors.background,
  },

  // Streak
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: BrandColors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.8)',
    marginBottom: 20,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(148,163,184,0.6)',
  },

  // Status card
  statusCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 28,
    padding: 32,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${BrandColors.primary}12`,
  },
  statusContent: {
    alignItems: 'center',
    position: 'relative',
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,
    marginBottom: 24,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 9999,
    width: '100%',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: BrandColors.background,
  },

  // Quick actions
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 10,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(203,213,225,0.8)',
  },

  // Insight teaser
  insightCard: {
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.6)',
    position: 'relative',
  },
  insightGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '35%',
    backgroundColor: `${BrandColors.primary}0A`,
  },
  insightRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  insightIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31,41,55,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTextWrap: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightDesc: {
    fontSize: 12,
    color: 'rgba(148,163,184,0.7)',
    marginBottom: 14,
    lineHeight: 18,
  },
  progressTrack: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(31,41,55,0.8)',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '5%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(107,114,128,0.6)',
    letterSpacing: 1.2,
  },
});
