import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';

interface DisclaimerScreenProps {
  onAccept: () => void;
}

export default function DisclaimerScreen({ onAccept }: DisclaimerScreenProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* Icon */}
        <Animated.View
          entering={FadeIn.delay(150).duration(500)}
          style={styles.iconRow}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="medkit" size={36} color={BrandColors.primary} />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500).springify()}
          style={styles.titleBlock}
        >
          <Text style={styles.title}>Important</Text>
          <Text style={styles.subtitle}>MEDICAL DISCLAIMER</Text>
        </Animated.View>

        {/* Body text */}
        <Animated.View
          entering={FadeInDown.delay(450).duration(500)}
          style={styles.bodyBlock}
        >
          <Text style={styles.bodyText}>
            <Text style={styles.bodyBrand}>PawSnap</Text> does not diagnose
            conditions or replace veterinary care.
          </Text>
          <Text style={[styles.bodyText, { marginTop: 14 }]}>
            The insights provided by this application are for informational
            purposes only and are not a substitute for professional veterinary
            diagnosis or treatment.
          </Text>
        </Animated.View>

        {/* Emergency Warning Card */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={styles.warningCard}
        >
          {/* Subtle glow */}
          <View style={styles.warningGlow} />

          <View style={styles.warningContent}>
            <View style={styles.warningIconBg}>
              <Ionicons name="warning" size={18} color={BrandColors.primary} />
            </View>
            <View style={styles.warningTextWrap}>
              <Text style={styles.warningTitle}>EMERGENCY WARNING</Text>
              <Text style={styles.warningBody}>
                If your pet is experiencing difficulty breathing, facial
                swelling, or severe lethargy, please contact an emergency
                veterinarian immediately.
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(800).duration(500)}
        style={styles.footer}
      >
        {/* Gradient top fade */}
        <LinearGradient
          colors={['transparent', BrandColors.background]}
          style={styles.footerGradient}
          pointerEvents="none"
        />

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.checkbox,
              accepted && styles.checkboxChecked,
            ]}
          >
            {accepted && (
              <Ionicons
                name="checkmark"
                size={16}
                color={BrandColors.background}
              />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            I understand that this app does not replace professional veterinary
            advice.
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !accepted && styles.continueButtonDisabled,
          ]}
          onPress={onAccept}
          disabled={!accepted}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.continueText,
              !accepted && styles.continueTextDisabled,
            ]}
          >
            Continue
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={
              accepted
                ? BrandColors.background
                : 'rgba(255,255,255,0.3)'
            }
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 80 : 56,
  },

  // ── Icon ──
  iconRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: `${BrandColors.primary}30`,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },

  // ── Title ──
  titleBlock: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 1)',
    letterSpacing: 2,
  },

  // ── Body ──
  bodyBlock: {
    marginBottom: 24,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: '500',
    color: BrandColors.textPrimary,
    lineHeight: 26,
  },
  bodyBold: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bodyBrand: {
    fontWeight: '700',
    color: BrandColors.primary,
  },

  // ── Warning Card ──
  warningCard: {
    borderRadius: 14,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: `${BrandColors.primary}30`,
    padding: 18,
    overflow: 'hidden',
  },
  warningGlow: {
    position: 'absolute',
    top: -32,
    right: -32,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${BrandColors.primary}18`,
  },
  warningContent: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  warningIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${BrandColors.primary}18`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningTextWrap: {
    flex: 1,
    gap: 4,
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  warningBody: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(209, 213, 219, 1)',
    lineHeight: 20,
  },

  // ── Footer ──
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 44 : 28,
    paddingTop: 16,
  },
  footerGradient: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 40,
  },

  // ── Checkbox ──
  checkboxRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(107, 114, 128, 1)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    borderColor: BrandColors.primary,
    backgroundColor: BrandColors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: BrandColors.textPrimary,
    lineHeight: 20,
  },

  // ── Continue button ──
  continueButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.background,
  },
  continueTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});
