import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
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

export default function RequestFeatureScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'must' | 'nice'>('must');

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request a Feature</Text>
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
          {/* Feature Title */}
          <Animated.View entering={FadeInDown.delay(0).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Feature Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dark Mode Toggle"
              placeholderTextColor="rgba(148,163,184,0.4)"
              value={title}
              onChangeText={setTitle}
            />
          </Animated.View>

          {/* Problem Description */}
          <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>What problem does this solve?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the benefit..."
              placeholderTextColor="rgba(148,163,184,0.4)"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />
          </Animated.View>

          {/* Priority Selector */}
          <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityWrap}>
              <TouchableOpacity
                style={[
                  styles.priorityBtn,
                  priority === 'must' && styles.priorityBtnActive,
                ]}
                onPress={() => setPriority('must')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === 'must' && styles.priorityTextActive,
                  ]}
                >
                  Must have
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.priorityBtn,
                  priority === 'nice' && styles.priorityBtnActive,
                ]}
                onPress={() => setPriority('nice')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.priorityText,
                    priority === 'nice' && styles.priorityTextActive,
                  ]}
                >
                  Nice to have
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Submit */}
          <Animated.View entering={FadeInDown.delay(240).duration(400)} style={{ paddingTop: 16 }}>
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>Submit Request</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer note */}
          <Animated.View entering={FadeInDown.delay(320).duration(400)} style={{ marginTop: 24 }}>
            <Text style={styles.footerNote}>
              Our team reviews every request. High priority features are typically
              addressed within two development cycles.
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
    borderBottomColor: 'rgba(148,163,184,0.08)',
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
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  form: {
    padding: 16,
    gap: 24,
    paddingBottom: 48,
  },

  fieldGroup: { gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },
  textArea: {
    height: 180,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },

  /* Priority */
  priorityWrap: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
    borderRadius: 14,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  priorityBtnActive: {
    backgroundColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  priorityTextActive: {
    fontWeight: '600',
    color: BrandColors.background,
  },

  submitBtn: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
  },

  footerNote: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 18,
  },
});
