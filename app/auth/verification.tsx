import VerificationScreen from '@/components/auth/VerificationScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function VerificationPage() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Logic to verify code would go here
      if (code === '424242') { // Mock success code
         router.replace('/add-pet');
      } else {
        // For demo purposes, we accept any 6 digit code or show error
        // Alert.alert('Error', 'Invalid verification code');
        // router.replace('/add-pet'); // Proceeding for easier testing
         router.replace('/add-pet');
      }
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  const handleResend = () => {
    Alert.alert('Code Resent', 'A new verification code has been sent to your email.');
  };

  return (
    <VerificationScreen
      email={email || 'luna@example.com'}
      onVerify={handleVerify}
      onBack={handleBack}
      onResend={handleResend}
      isLoading={isLoading}
    />
  );
}
