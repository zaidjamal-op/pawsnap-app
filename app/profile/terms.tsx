import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Section {
  number: number;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  highlighted?: boolean;
}

const SECTIONS: Section[] = [
  {
    number: 1,
    title: 'Acceptance of Terms',
    paragraphs: [
      'By creating an account on Pawsnap, you agree to comply with all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.',
      'We reserve the right to modify these terms at any time. Continued use of the application following any changes indicates your acceptance of the new terms.',
    ],
  },
  {
    number: 2,
    title: 'Medical Disclaimer',
    highlighted: true,
    paragraphs: [
      'Pawsnap is not a substitute for professional veterinary advice. The content provided through the app, including itch pattern analysis and insights, is for informational purposes only.',
      'Always seek the advice of your veterinarian or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on Pawsnap.',
    ],
  },
  {
    number: 3,
    title: 'User Accounts & Data',
    paragraphs: [
      'You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.',
      'Pawsnap collects data regarding your pet\'s health metrics to provide personalized insights. You retain ownership of your personal data, but grant us a license to use anonymized data for improving our itch-tracking algorithms.',
    ],
    bullets: [
      'We do not sell your personal data to third parties.',
      'You may request data deletion at any time via Settings.',
    ],
  },
  {
    number: 4,
    title: 'Subscription & Payments',
    paragraphs: [
      'Certain features of the Service may require a paid subscription. All payments are processed securely through the Apple App Store. Refunds are handled in accordance with Apple\'s standard refund policies.',
    ],
  },
];

export default function TermsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Updated */}
        <Animated.View entering={FadeInDown.delay(60).duration(400)} style={styles.updatedRow}>
          <MaterialIcons name="history" size={14} color={BrandColors.primary} />
          <Text style={styles.updatedText}>LAST UPDATED: OCTOBER 24, 2023</Text>
        </Animated.View>

        {/* Intro */}
        <Animated.View entering={FadeInDown.delay(120).duration(400)}>
          <Text style={styles.introText}>
            Welcome to Pawsnap. By accessing or using our mobile application, you agree to be bound by these Terms of Service and our Privacy Policy. Please read them carefully before using our itch tracking services.
          </Text>
        </Animated.View>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <Animated.View
            key={section.number}
            entering={FadeInDown.delay(200 + i * 80).duration(400)}
            style={[
              styles.section,
              section.highlighted && styles.sectionHighlighted,
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{section.number}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            {section.paragraphs.map((p, j) => (
              <Text
                key={j}
                style={[
                  styles.paragraph,
                  section.highlighted && j === 0 && styles.highlightedParagraph,
                ]}
              >
                {section.highlighted && j === 0 ? (
                  <Text style={styles.highlightBold}>{p.split('.')[0]}.</Text>
                ) : null}
                {section.highlighted && j === 0 ? p.substring(p.indexOf('.') + 1) : p}
              </Text>
            ))}

            {section.bullets && (
              <View style={styles.bulletList}>
                {section.bullets.map((bullet, k) => (
                  <View key={k} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            )}
          </Animated.View>
        ))}

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(600).duration(400)} style={styles.footer}>
          <View style={styles.divider} />
          <Text style={styles.footerQuestion}>Questions about these terms?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL('mailto:legal@pawsnap.app')}
          >
            <Text style={styles.footerLink}>Contact Legal Support</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  /* Updated */
  updatedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  updatedText: {
    fontSize: 12, fontWeight: '600', color: BrandColors.primary,
    letterSpacing: 1,
  },

  /* Intro */
  introText: {
    fontSize: 14, color: '#9CA3AF', lineHeight: 22, marginBottom: 28,
  },

  /* Sections */
  section: { marginBottom: 24 },
  sectionHighlighted: {
    backgroundColor: 'rgba(45,212,191,0.05)',
    borderRadius: 16, padding: 18,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.08)',
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  numberBadge: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(45,212,191,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  numberText: { fontSize: 11, fontWeight: '700', color: BrandColors.primary },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#E5E7EB' },

  paragraph: { fontSize: 14, color: '#9CA3AF', lineHeight: 22, marginBottom: 12 },
  highlightedParagraph: {},
  highlightBold: { fontWeight: '600', color: BrandColors.primary },

  bulletList: { marginTop: 4, gap: 6 },
  bulletRow: { flexDirection: 'row', paddingLeft: 8 },
  bulletDot: { fontSize: 14, color: '#6B7280', marginRight: 8, lineHeight: 22 },
  bulletText: { fontSize: 14, color: '#9CA3AF', lineHeight: 22, flex: 1 },

  /* Footer */
  footer: { alignItems: 'center', paddingTop: 16, paddingBottom: 8 },
  divider: {
    width: '60%', height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 20,
  },
  footerQuestion: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  footerLink: { fontSize: 14, fontWeight: '600', color: BrandColors.primary },
});
