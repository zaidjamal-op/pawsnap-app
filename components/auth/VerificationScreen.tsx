import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image as RNImage,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CODE_LENGTH = 6;

interface VerificationScreenProps {
  email: string;
  onVerify: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
  isLoading?: boolean;
}

export default function VerificationScreen({
  email,
  onVerify,
  onBack,
  onResend,
  isLoading = false,
}: VerificationScreenProps) {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<TextInput>(null);
  
  // Blinking cursor animation
  const cursorOpacity = useSharedValue(0);

  useEffect(() => {
    cursorOpacity.value = withRepeat(
      withSequence(withTiming(1, { duration: 500 }), withTiming(0, { duration: 500 })),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text: string) => {
    // Only numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= CODE_LENGTH) {
      setCode(cleaned);
      if (cleaned.length === CODE_LENGTH) {
        // Auto-submit or just let user press verify? 
        // Design has a verify button, so usually wait for that, 
        // but auto-dismiss keyboard is nice.
        Keyboard.dismiss();
      }
    }
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={20} color={BrandColors.textSecondary} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <RNImage
              source={require('@/assets/images/pawsnap-logo.png')}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </View>
          
          <View style={{ width: 40 }} /> 
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              We sent a {CODE_LENGTH}-digit code to{' '}
              <Text style={styles.emailText}>{email}</Text>. Enter it below to verify your account.
            </Text>
          </Animated.View>

          {/* OTP Input */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              style={styles.hiddenInput}
              autoFocus
            />
            
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
              <View style={styles.codeRow}>
                {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                  const digit = code[index];
                  const isFocused = index === code.length;
                  const isFilled = index < code.length;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.codeBox,
                        isFocused && styles.codeBoxFocused,
                        isFilled && styles.codeBoxFilled,
                      ]}
                    >
                      <Text style={styles.codeText}>{digit}</Text>
                      {isFocused && (
                        <Animated.View style={[styles.cursor, cursorStyle]} />
                      )}
                      
                      {/* Fake focus glow */}
                      {isFocused && <View style={styles.focusGlow} />}
                    </View>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Resend Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Didn't receive the code?{'\n'}
              <Text style={styles.resendText}>
                {timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Resend Code'}
              </Text>
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={onResend} style={styles.resendButtonOverlay} />
            )}
          </View>
        </View>

        {/* Verify Button */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)} 
          style={styles.footer}
        >
          <TouchableOpacity
            style={[styles.verifyButton, code.length !== CODE_LENGTH && styles.verifyButtonDisabled]}
            onPress={() => onVerify(code)}
            disabled={code.length !== CODE_LENGTH || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Text>
            {!isLoading && (
              <MaterialIcons name="arrow-forward" size={20} color={BrandColors.background} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Custom Keyboard Placeholder (Visual only, to match requirements if needed, but using native keyboard is better for UX. 
            The requirements said "make some screens that are not exists using the current design system... plz coll animations". 
            I'll rely on native keyboard for functionality but styled nicely.) */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F14', // requested deep graphite
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    display: 'flex',
    
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: BrandColors.textSecondary,
    lineHeight: 24,
  },
  emailText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
  },
  codeBox: {
    width: 48,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  codeBoxFocused: {
    borderColor: BrandColors.primary,
    backgroundColor: '#111827',
  },
  codeBoxFilled: {
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: '#161F2E',
  },
  codeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: BrandColors.primary,
  },
  focusGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 10,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: BrandColors.textSecondary,
    lineHeight: 22,
  },
  resendText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resendButtonOverlay: {
    position: 'absolute',
    inset: 0,
  },
  footer: {
    marginTop: 'auto',
  },
  verifyButton: {
    backgroundColor: BrandColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B0F14',
  },
});
