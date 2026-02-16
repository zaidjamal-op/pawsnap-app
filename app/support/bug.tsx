import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const BORDER_SUBTLE = '#1F2937';
const TEXT_MUTED = '#94A3B8';

export default function ReportBugScreen() {
  const router = useRouter();
  const [steps, setSteps] = useState('');
  const [expected, setExpected] = useState('');
  const [actual, setActual] = useState('');

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#CBD5E1" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Bug</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Content ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Steps to reproduce */}
          <Animated.View entering={FadeInDown.delay(0).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Steps to reproduce</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={'1. Open the app\n2. Navigate to gallery\n3. Tap the \'Sync\' button...'}
              placeholderTextColor="rgba(148,163,184,0.4)"
              multiline
              textAlignVertical="top"
              value={steps}
              onChangeText={setSteps}
            />
          </Animated.View>

          {/* Expected result */}
          <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Expected result</Text>
            <TextInput
              style={[styles.input, styles.textAreaShort]}
              placeholder="The photos should start uploading immediately."
              placeholderTextColor="rgba(148,163,184,0.4)"
              multiline
              textAlignVertical="top"
              value={expected}
              onChangeText={setExpected}
            />
          </Animated.View>

          {/* Actual result */}
          <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Actual result</Text>
            <TextInput
              style={[styles.input, styles.textAreaShort]}
              placeholder="The app crashes or shows a 'Network Error' even on Wi-Fi."
              placeholderTextColor="rgba(148,163,184,0.4)"
              multiline
              textAlignVertical="top"
              value={actual}
              onChangeText={setActual}
            />
          </Animated.View>

          {/* Upload area */}
          <Animated.View entering={FadeInDown.delay(240).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Upload screenshots</Text>
            <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
              <MaterialIcons name="cloud-upload" size={36} color={BrandColors.primary} />
              <Text style={styles.uploadTitle}>Tap to upload images</Text>
              <Text style={styles.uploadSub}>PNG, JPG or HEIC (Max 5MB)</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Submit */}
          <Animated.View entering={FadeInDown.delay(320).duration(400)} style={{ paddingTop: 16 }}>
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>Send Report</Text>
              <Ionicons name="send" size={18} color={BrandColors.background} />
            </TouchableOpacity>
            <Text style={styles.disclaimer}>
              By submitting, you agree to share device logs to help us fix the issue.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 58 : 38,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(31,41,55,0.3)',
    backgroundColor: 'rgba(11,15,20,0.8)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  form: {
    padding: 16,
    gap: 20,
    paddingBottom: 48,
  },

  fieldGroup: { gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 4,
  },
  input: {
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },
  textAreaShort: {
    minHeight: 100,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },

  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    minHeight: 140,
    backgroundColor: BrandColors.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: BORDER_SUBTLE,
    borderRadius: 14,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginTop: 8,
  },
  uploadSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },

  submitBtn: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    backgroundColor: BrandColors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.background,
  },
  disclaimer: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
    fontStyle: 'italic',
  },
});
