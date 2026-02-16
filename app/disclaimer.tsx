import DisclaimerScreen from '@/components/onboarding/DisclaimerScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function DisclaimerPage() {
  const router = useRouter();

  const handleAccept = () => {
    router.replace('/add-pet');
  };

  return <DisclaimerScreen onAccept={handleAccept} />;
}
