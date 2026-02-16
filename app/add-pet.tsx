import AddPetScreen from '@/components/onboarding/AddPetScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function AddPetPage() {
  const router = useRouter();

  return (
    <AddPetScreen
      onSave={() => router.replace('/baseline')}
      onCancel={() => router.back()}
    />
  );
}
