import NotificationsScreen from '@/components/onboarding/NotificationsScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function NotificationsSetupPage() {
  const router = useRouter();

  const goNext = () => {
    router.replace('/onboarding-complete');
  };

  return (
    <NotificationsScreen
      onEnable={goNext}
      onSkip={goNext}
    />
  );
}
