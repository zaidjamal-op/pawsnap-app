import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';
import Animated, { FadeIn } from 'react-native-reanimated';

// History Components
import HistoryTopBar from '@/components/history/HistoryTopBar';
import HistorySegmentedControl from '@/components/history/HistorySegmentedControl';
import CheckinsSummaryStrip from '@/components/history/CheckinsSummaryStrip';
import FilterChips from '@/components/history/FilterChips';
import CheckinsList from '@/components/history/CheckinsList';
import MediaGrid from '@/components/history/MediaGrid';

export default function HistoryScreen() {
  const router = useRouter();
  const { checkIns, media, isPremium, activePetId } = usePets();
  const [activeTab, setActiveTab] = useState<'checkins' | 'media'>('checkins');
  
  // Filter States
  const [dateRange, setDateRange] = useState('7d'); // 7d, 30d, custom
  const [filterType, setFilterType] = useState<string[]>([]); // 'flare', 'media', 'notes'

  // Filter Options
  const CHECKIN_FILTERS = [
    { id: 'flare', label: 'Flare-only', icon: 'flame' as const },
    { id: 'media', label: 'With Media', icon: 'images' as const },
    { id: 'notes', label: 'Notes', icon: 'document-text' as const },
  ];

  const MEDIA_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'photos', label: 'Photos', icon: 'image' as const },
    { id: 'videos', label: 'Videos', icon: 'videocam' as const },
  ];

  // Filter Logic
  const filteredCheckIns = React.useMemo(() => {
    let result = checkIns.filter(c => c.petId === activePetId);
    
    // Apply filters
    if (filterType.includes('flare')) {
      result = result.filter(c => c.itchLevel >= 7);
    }
    if (filterType.includes('media')) {
      result = result.filter(c => c.imageUri);
    }
    if (filterType.includes('notes')) {
      result = result.filter(c => !!c.notes);
    }
    
    // Date Range (Simple check for now)
    const now = new Date();
    const cutoff = new Date();
    if (dateRange === '7d') cutoff.setDate(now.getDate() - 7);
    else if (dateRange === '30d') cutoff.setDate(now.getDate() - 30);
    
    // Only apply date cutoff if NOT premium? Or always apply filter? 
    // Requirement: "Free: Range 7+30, Premium: Custom"
    // Let's rely on CheckinsList for hard gating logic, but use this for user-selected range.
    
    return result;
  }, [checkIns, activePetId, filterType, dateRange]);

  const filteredMedia = React.useMemo(() => {
    let result = media.filter(m => m.petId === activePetId);
    
    // Apply media type filter
    if (filterType.includes('photos')) result = result.filter(m => m.type === 'photo');
    if (filterType.includes('videos')) result = result.filter(m => m.type === 'video');

    return result;
  }, [media, activePetId, filterType]);

  const handleToggleFilter = (id: string) => {
    setFilterType(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleMediaFilter = (id: string) => {
      if (id === 'all') setFilterType([]);
      else setFilterType([id]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.contentContainer}>
        <HistoryTopBar 
          onAddPress={() => {
              if (activeTab === 'checkins') router.push('/checkin/daily');
              else router.push('/photo/capture'); // Or modal
          }}
          onFilterPress={() => {
              // Open advanced filter modal (Premium)
              if (!isPremium) router.push('/premium/unlock');
          }}
        />

        <HistorySegmentedControl 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />

        <View style={{ flex: 1 }}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {activeTab === 'checkins' ? (
              <Animated.View entering={FadeIn.duration(300)}>
                <CheckinsSummaryStrip />
                
                <FilterChips 
                  options={CHECKIN_FILTERS} 
                  selectedIds={filterType} 
                  onToggle={handleToggleFilter} 
                />

                <CheckinsList 
                  checkIns={filteredCheckIns} 
                  isPremium={isPremium} 
                />
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn.duration(300)}>
                <FilterChips 
                    options={MEDIA_FILTERS} 
                    selectedIds={filterType.length === 0 ? ['all'] : filterType} 
                    onToggle={handleMediaFilter}
                    allowMultiple={false}
                />
                
                <MediaGrid 
                    media={filteredMedia} 
                    isPremium={isPremium} 
                />
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});

