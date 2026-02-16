import OnboardingCompleteScreen from '@/components/onboarding/OnboardingCompleteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';

const ONBOARDING_KEY = '@pawsnap_onboarding_seen';

export default function OnboardingCompletePage() {
  const router = useRouter();

  const handleGoHome = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (e) {
      // Silently fail
    }
    router.replace('/(tabs)');
  };

  return (
    <OnboardingCompleteScreen
      petName="Luna"
      onGoHome={handleGoHome}
    />
  );
}
