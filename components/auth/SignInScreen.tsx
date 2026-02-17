import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SignInScreenProps {
  onSignInSuccess: () => void;
}

export default function SignInScreen({ onSignInSuccess }: SignInScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'social' | 'email'>('social');

  const handleSocialLogin = (provider: string) => {
    // Mock login for now
    onSignInSuccess();
  };

  const handleEmailSubmit = () => {
    // Navigate to verification screen
    if (!email) {
      // In real app show error, for now proceed with mock
    }
    router.push({
      pathname: '/auth/verification',
      params: { email: email || 'luna@example.com' },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Background Gradient */}
          <LinearGradient
            colors={[BrandColors.background, '#111827', '#000000']}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Header / Logo */}
          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
            <Image
              source={require('@/assets/images/pawsnap-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Pawsnap</Text>
            <Text style={styles.subtitle}>Log in or sign up to track your pet's health.</Text>
          </Animated.View>

          {/* Content */}
          <View style={styles.content}>
            {step === 'social' ? (
              <Animated.View entering={FadeIn.duration(300)} style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('apple')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-apple" size={24} color="#000" />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('google')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-google" size={24} color="#000" />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={[styles.socialButton, styles.emailButton]}
                  onPress={() => setStep('email')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="mail" size={24} color="#fff" />
                  <Text style={[styles.socialButtonText, styles.emailButtonText]}>
                    Continue with Email
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn.duration(300)} style={styles.emailContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleEmailSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setStep('social')}
                >
                  <Text style={styles.backButtonText}>Use social login instead</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>

          {/* Footer Terms */}
          <View style={styles.footer}>
            <Text style={styles.termsText}>
              By continuing, you agree to Pawsnap's{' '}
              <Text style={styles.linkText}>Terms</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  socialContainer: {
    gap: 16,
  },
  emailContainer: {
    gap: 16,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emailButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  emailButtonText: {
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: BrandColors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  // Email Form
  inputLabel: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: -8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: BrandColors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: BrandColors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  // Footer
  footer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: BrandColors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#E5E7EB',
    textDecorationLine: 'underline',
  },
});
