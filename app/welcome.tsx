import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/disclaimer');
  };

  const handleLogin = () => {
    router.replace('/auth/sign-in');
  };

  return (
    <WelcomeScreen
      onGetStarted={handleGetStarted}
      onLogin={handleLogin}
    />
  );
}
