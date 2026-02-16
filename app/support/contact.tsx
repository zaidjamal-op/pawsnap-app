import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
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

const BORDER_SUBTLE = '#1F2937';
const TEXT_MUTED = '#9eb7b4';

export default function ContactSupportScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [includeLogs, setIncludeLogs] = useState(true);

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
        <Text style={styles.headerTitle}>Contact Support</Text>
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
          {/* Email */}
          <Animated.View entering={FadeInDown.delay(0).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Your Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="example@pawsnap.com"
              placeholderTextColor="rgba(158,183,180,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>

          {/* Message */}
          <Animated.View entering={FadeInDown.delay(80).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your issue or feedback here..."
              placeholderTextColor="rgba(158,183,180,0.5)"
              multiline
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />
          </Animated.View>

          {/* Log Toggle */}
          <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.logToggle}>
            <View style={{ flex: 1 }}>
              <Text style={styles.logTitle}>Include app logs</Text>
              <Text style={styles.logSub}>
                Include device logs to help us troubleshoot faster.
              </Text>
            </View>
            <Switch
              value={includeLogs}
              onValueChange={setIncludeLogs}
              trackColor={{ false: BORDER_SUBTLE, true: BrandColors.primary }}
              thumbColor="#FFFFFF"
              ios_backgroundColor={BORDER_SUBTLE}
            />
          </Animated.View>

          {/* Upload Area */}
          <Animated.View entering={FadeInDown.delay(240).duration(400)} style={styles.fieldGroup}>
            <Text style={styles.label}>Attachments (Optional)</Text>
            <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
              <View style={styles.uploadIcon}>
                <MaterialIcons name="upload-file" size={28} color={BrandColors.primary} />
              </View>
              <Text style={styles.uploadTitle}>Tap to upload</Text>
              <Text style={styles.uploadSub}>Images or PDF (max 5MB)</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Submit */}
          <Animated.View entering={FadeInDown.delay(320).duration(400)} style={{ paddingTop: 16 }}>
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>Submit Ticket</Text>
            </TouchableOpacity>
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
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },

  form: {
    padding: 16,
    gap: 16,
    paddingBottom: 48,
  },

  fieldGroup: { gap: 8 },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MUTED,
    marginLeft: 4,
  },
  input: {
    height: 56,
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#FFFFFF',
  },
  textArea: {
    height: 160,
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top',
  },

  logToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER_SUBTLE,
    backgroundColor: 'rgba(17,24,39,0.4)',
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logSub: {
    fontSize: 12,
    color: TEXT_MUTED,
    lineHeight: 18,
    marginTop: 2,
  },

  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: BrandColors.surface,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: BORDER_SUBTLE,
    borderRadius: 14,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  uploadSub: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 4,
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
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.background,
  },
});
