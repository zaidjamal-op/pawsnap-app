import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HistoryScreen() {
  const router = useRouter();
  const { checkIns, flares, activePetId, media } = usePets();
  const [filter, setFilter] = useState<'all' | 'checkin' | 'flare'>('all');

  const historyData = React.useMemo(() => {
    let data: any[] = [];
    
    checkIns.forEach(c => {
      if (c.petId === activePetId) {
        data.push({ ...c, type: 'checkin' });
      }
    });

    flares.forEach(f => {
      if (f.petId === activePetId) {
        data.push({ ...f, type: 'flare' });
      }
    });

    // Filter first
    if (filter !== 'all') {
      data = data.filter(d => d.type === filter);
    }

    // Sort by date desc
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Group by Month
    const grouped: { [key: string]: any[] } = {};
    data.forEach(item => {
      const date = new Date(item.date);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(item);
    });

    return Object.keys(grouped).map(key => ({
      title: key,
      data: grouped[key]
    }));
  }, [checkIns, flares, activePetId, filter]);

  const renderItem = ({ item, index, section }: { item: any, index: number, section: any }) => {
    const isFlare = item.type === 'flare';
    const date = new Date(item.date);
    const dayNum = date.getDate();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    // Check if same day as previous item in this section
    const prevItem = section.data[index - 1];
    let isSameDay = false;
    if (prevItem) {
        const prevDate = new Date(prevItem.date);
        isSameDay = prevDate.getDate() === date.getDate() && prevDate.getMonth() === date.getMonth() && prevDate.getFullYear() === date.getFullYear();
    }

    // Calculate Media Counts
    const linkedMedia = media.filter(m => m.checkInId === item.id);
    const photoCount = linkedMedia.filter(m => m.type === 'photo').length;
    const videoCount = linkedMedia.filter(m => m.type === 'video').length;

    return (
      <Animated.View entering={FadeInDown.delay(index * 50).duration(400)}>
        <View style={styles.timelineRow}>
            {/* Date Column */}
            <View style={styles.timelineDateCol}>
                {!isSameDay && (
                    <View style={styles.dateBadge}>
                        <Text style={styles.dayNum}>{dayNum}</Text>
                        <Text style={styles.dayName}>{dayName}</Text>
                    </View>
                )}
            </View>

            {/* Timeline Line Column */}
            <View style={styles.timelineLineCol}>
                <View style={styles.timelineLine} />
                <View style={[styles.timelineDot, isFlare ? styles.dotFlare : styles.dotCheckin]}>
                   <Ionicons name={isFlare ? "warning" : "checkmark"} size={10} color="#FFF" />
                </View>
            </View>

            {/* Content Card */}
            <TouchableOpacity 
              style={[styles.card, isFlare ? styles.cardFlare : styles.cardCheckin]} 
              activeOpacity={0.7}
              onPress={() => {
                 const route = isFlare ? `/checkin/flare?id=${item.id}` : `/history/check-in/${item.id}`;
                 router.push(route as any);
              }}
            >
              <View style={styles.cardHeader}>
                 <Text style={styles.timeText}>{timeStr}</Text>
                 <View style={styles.row}>
                    <Text style={styles.typeText}>{isFlare ? 'Flare' : 'Check-in'}</Text>
                    <View style={styles.itchBadge}>
                        <Text style={styles.itchText}>Itch: {item.itchLevel}</Text>
                    </View>
                 </View>
              </View>
                 
              <Text style={styles.detailsText} numberOfLines={1}>
                 {isFlare 
                   ? `Triggers: ${item.triggers?.join(', ') || 'None'}`
                   : `Signs: ${item.skinSigns?.join(', ') || 'None'}`
                 }
              </Text>

              {item.notes ? (
                <Text style={styles.noteSnippet} numberOfLines={1}>
                  {item.notes}
                </Text>
              ) : null}

              {(photoCount > 0 || videoCount > 0) && (
                <View style={styles.mediaBadgeRow}>
                  {photoCount > 0 && (
                    <View style={styles.mediaBadge}>
                       <Ionicons name="image" size={10} color="#9CA3AF" />
                       <Text style={styles.mediaCountText}>{photoCount}</Text>
                    </View>
                  )}
                  {videoCount > 0 && (
                    <View style={styles.mediaBadge}>
                       <Ionicons name="videocam" size={10} color="#9CA3AF" />
                       <Text style={styles.mediaCountText}>{videoCount}</Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => router.back()}
        >
           <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabs}>
         {['all', 'checkin', 'flare'].map((t) => (
             <TouchableOpacity 
                key={t} 
                style={[styles.tab, filter === t && styles.tabActive]}
                onPress={() => setFilter(t as any)}
             >
                <Text style={[styles.tabText, filter === t && styles.tabTextActive]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
             </TouchableOpacity>
         ))}
      </View>

      <Animated.SectionList
        sections={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
            <View style={styles.empty}>
                <Ionicons name="document-text-outline" size={48} color="#334155" />
                <Text style={styles.emptyText}>No logs found for this filter.</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tabs: {
      flexDirection: 'row',
      padding: 16,
      gap: 12,
  },
  tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#1E293B',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: {
      backgroundColor: BrandColors.primary,
      borderColor: BrandColors.primary,
  },
  tabText: {
      fontSize: 13,
      fontWeight: '600',
      color: '#94A3B8',
  },
  tabTextActive: {
      color: BrandColors.background,
  },
  listContent: {
      padding: 0,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: BrandColors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E2E8F0',
    letterSpacing: 0.5,
  },
  timelineRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
  },
  timelineDateCol: {
      width: 50,
      alignItems: 'center',
      paddingTop: 0,
  },
  dateBadge: {
      alignItems: 'center',
      marginTop: 20, // Align with first card
  },
  dayNum: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFFFFF',
  },
  dayName: {
      fontSize: 11,
      fontWeight: '600',
      color: '#94A3B8',
      textTransform: 'uppercase',
  },
  timelineLineCol: {
      width: 20,
      alignItems: 'center',
      position: 'relative',
  },
  timelineLine: {
      position: 'absolute',
      width: 1,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255,0.1)',
      left: 10,
  },
  timelineDot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24, // Align with card top
      borderWidth: 2,
      borderColor: BrandColors.background,
      zIndex: 2,
  },
  dotCheckin: { backgroundColor: BrandColors.primary },
  dotFlare: { backgroundColor: '#EF4444' },

  card: {
      flex: 1,
      backgroundColor: '#1E293B',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      marginTop: 12,
      marginLeft: 12,
      gap: 8,
  },
  cardCheckin: {
      borderLeftWidth: 3,
      borderLeftColor: BrandColors.primary,
  },
  cardFlare: {
      borderLeftWidth: 3,
      borderLeftColor: '#EF4444',
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
  },
  timeText: {
      fontSize: 12,
      color: '#94A3B8',
      fontWeight: '500',
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  typeText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#FFFFFF',
  },
  itchBadge: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
  },
  itchText: {
      fontSize: 11,
      fontWeight: '700',
      color: '#FFFFFF',
  },
  detailsText: {
      fontSize: 13,
      color: '#CBD5E1',
      lineHeight: 18,
  },
  noteSnippet: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
    marginTop: 2,
  },
  mediaBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  mediaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mediaCountText: {
    fontSize: 10,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  
  empty: {
      marginTop: 60,
      alignItems: 'center',
      gap: 16,
  },
  emptyText: {
      fontSize: 14,
      color: '#64748B',
  },
});
