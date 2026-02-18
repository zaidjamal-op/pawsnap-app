import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { BrandColors } from '@/constants/theme';
import { Media } from '@/context/PetContext';
import MediaTile from './MediaTile';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface MediaGridProps {
  media: Media[];
  isPremium: boolean;
}

const { width } = Dimensions.get('window');
const GAP = 8;
const PADDING = 20;
const COLUMNS = 3;
const TILE_WIDTH = (width - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

export default function MediaGrid({ media, isPremium }: MediaGridProps) {
  const router = useRouter();

  // Sort by date desc
  const sorted = [...media].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Premium gating logic
  // "Free: Photos + basic filters, Videos limited"
  // Let's implement full retention gating similar to check-ins
  const FREE_Item_LIMIT = 12; // Show only 12 items for free users

  const visibleMedia = isPremium ? sorted : sorted.slice(0, FREE_Item_LIMIT);
  const hiddenCount = sorted.length - visibleMedia.length;

  if (sorted.length === 0) {
    return (
       <View style={styles.emptyContainer}>
        <Ionicons name="images-outline" size={48} color="rgba(148,163,184,0.3)" />
        <Text style={styles.emptyTitle}>No photos yet</Text>
        <Text style={styles.emptyText}>Add photos to track skin changes over time.</Text>
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => {}} // TODO: Add photo action
        >
          <Text style={styles.btnText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {visibleMedia.map((item, index) => (
          <View key={`${item.id}-${item.uri}-${index}`} style={{ width: TILE_WIDTH, marginBottom: GAP }}>
            <MediaTile media={item} width={TILE_WIDTH} />
          </View>
        ))}
        {/* Add 'New' Tile button always visible at start or end? Requirements say "Add button" in top bar mainly */}
      </View>

      {!isPremium && hiddenCount > 0 && (
        <TouchableOpacity 
          style={styles.lockedCard}
          onPress={() => router.push('/premium/unlock')}
        >
           <View style={styles.lockContent}>
             <Ionicons name="lock-closed" size={20} color="#FBBF24" style={{marginBottom: 8}}/>
             <Text style={styles.lockTitle}>{hiddenCount} Older Items Locked</Text>
             <Text style={styles.lockDesc}>Upgrade to Premium to store unlimited photos & videos.</Text>
           </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: BrandColors.background,
    fontWeight: '700',
  },
  lockedCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  lockContent: {
    alignItems: 'center',
  },
  lockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FBBF24',
    marginBottom: 4,
  },
  lockDesc: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
