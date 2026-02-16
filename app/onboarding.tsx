import OnboardingScreen from '@/components/onboarding/OnboardingScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingPage() {
  const router = useRouter();

  const goToDisclaimer = () => {
    router.replace('/disclaimer');
  };

  return (
    <OnboardingScreen
      onComplete={goToDisclaimer}
      onSkip={goToDisclaimer}
    />
  );
}
