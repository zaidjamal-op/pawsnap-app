import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  const handleLogin = () => {
    // For now, skip to main app (same as completing onboarding)
    router.replace('/(tabs)');
  };

  return (
    <WelcomeScreen
      onGetStarted={handleGetStarted}
      onLogin={handleLogin}
    />
  );
}
