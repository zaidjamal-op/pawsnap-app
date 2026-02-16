import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const DESTRUCTIVE = '#EF4444';
const SURFACE_DARK = '#161C1B';
const BORDER_DARK = '#2A3735';

export default function ConfirmDeleteScreen() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const isValid = inputValue.toUpperCase() === 'DELETE';

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <ScreenHeader title="Delete Account" />

      {/* ── Content ── */}
      <View style={styles.content}>
        {/* Warning Icon */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.iconWrap}>
          <View style={styles.warningCircle}>
            <Ionicons name="warning" size={36} color={DESTRUCTIVE} />
          </View>
        </Animated.View>

        {/* Heading */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Text style={styles.title}>Confirm Deletion</Text>
        </Animated.View>

        {/* Description */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text style={styles.description}>
            This action is{' '}
            <Text style={styles.destructiveText}>irreversible</Text>. All your
            data, including pet profiles and photos, will be permanently removed.
            To confirm, please type{' '}
            <Text style={styles.boldText}>"DELETE"</Text> in the field below.
          </Text>
        </Animated.View>

        {/* Verification Input */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(400)}
          style={styles.inputGroup}
        >
          <Text style={styles.inputLabel}>VERIFICATION</Text>
          <TextInput
            style={styles.input}
            placeholder="DELETE"
            placeholderTextColor="rgba(148,163,184,0.3)"
            autoCapitalize="characters"
            textAlign="center"
            value={inputValue}
            onChangeText={setInputValue}
          />
        </Animated.View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Action Buttons */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(400)}
          style={styles.actions}
        >
          <TouchableOpacity
            style={[styles.deleteBtn, !isValid && styles.deleteBtnDisabled]}
            activeOpacity={0.85}
            disabled={!isValid}
            onPress={() => {
              // Handle deletion
              router.dismissAll();
            }}
          >
            <Text style={styles.deleteBtnText}>Permanently Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: BrandColors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 48 : 32,
  },

  iconWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  warningCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239,68,68,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  destructiveText: {
    color: DESTRUCTIVE,
    fontWeight: '600',
  },
  boldText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontStyle: 'italic',
  },

  /* Input */
  inputGroup: {
    gap: 8,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 2,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: SURFACE_DARK,
    borderWidth: 2,
    borderColor: BORDER_DARK,
    borderRadius: 999,
    paddingHorizontal: 24,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 4,
  },

  /* Actions */
  actions: { gap: 16 },
  deleteBtn: {
    height: 56,
    borderRadius: 999,
    backgroundColor: DESTRUCTIVE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: DESTRUCTIVE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  deleteBtnDisabled: {
    opacity: 0.4,
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelBtn: {
    height: 56,
    borderRadius: 999,
    backgroundColor: SURFACE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#CBD5E1',
  },
});
