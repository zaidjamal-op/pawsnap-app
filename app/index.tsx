import SplashLoader from '@/components/SplashLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

const ONBOARDING_KEY = '@pawsnap_onboarding_seen';

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const hasSeenOnboarding = useRef<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        hasSeenOnboarding.current = value === 'true';
      } catch {
        hasSeenOnboarding.current = false;
      }
      // Hide the native splash immediately — our custom one is now visible
      await SplashScreen.hideAsync();
    };
    check();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    if (hasSeenOnboarding.current) {
      router.replace('/(tabs)');
    } else {
      router.replace('/welcome');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14' }}>
      {showSplash && <SplashLoader onFinish={handleSplashFinish} />}
    </View>
  );
}

