import BaselineScreen from '@/components/onboarding/BaselineScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function BaselinePage() {
  const router = useRouter();

  const goNext = () => {
    router.replace('/notifications-setup');
  };

  return (
    <BaselineScreen
      petName="your pet"
      onFinish={goNext}
      onSkip={goNext}
    />
  );
}
