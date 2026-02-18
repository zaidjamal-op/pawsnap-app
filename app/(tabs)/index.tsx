import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

// Home Components
import HomeTopBar from '@/components/home/HomeTopBar';
import TodayStatusCard from '@/components/home/TodayStatusCard';
import QuickActionsRow from '@/components/home/QuickActionsRow';
import BaselineOrTrendCard from '@/components/home/BaselineOrTrendCard';
import TopPatternCard from '@/components/home/TopPatternCard';
import ProtocolCard from '@/components/home/ProtocolCard';
import EvidenceCarousel from '@/components/home/EvidenceCarousel';
import WeeklySummaryCard from '@/components/home/WeeklySummaryCard';
import CareRemindersWidget from '@/components/home/CareRemindersWidget';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <HomeTopBar />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <TodayStatusCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <QuickActionsRow />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <BaselineOrTrendCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)}>
          <TopPatternCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)}>
          <ProtocolCard />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <EvidenceCarousel />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(500)}>
           <WeeklySummaryCard />
        </Animated.View>

         <Animated.View entering={FadeInDown.delay(900).duration(500)}>
           <CareRemindersWidget />
        </Animated.View>
        
        {/* Bottom padding for tab bar */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
});
