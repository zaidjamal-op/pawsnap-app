import SignInScreen from '@/components/auth/SignInScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function SignInPage() {
  const router = useRouter();

  const handleSignInSuccess = () => {
    // Navigate to Add Pet flow after sign in
    // Note: In a real app we would check if user already has pets
    router.replace('/add-pet');
  };

  return <SignInScreen onSignInSuccess={handleSignInSuccess} />;
}
