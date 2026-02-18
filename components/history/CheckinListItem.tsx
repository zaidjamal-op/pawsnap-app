import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { CheckIn } from '@/context/PetContext';

interface CheckinListItemProps {
  checkIn: CheckIn;
  showMediaBadge?: boolean;
}

export default function CheckinListItem({ checkIn, showMediaBadge }: CheckinListItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/history/check-in/${checkIn.id}`);
  };

  const isFlare = checkIn.itchLevel >= 7;
  const dateObj = new Date(checkIn.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <TouchableOpacity 
      style={[styles.container, isFlare && styles.flareContainer]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Date Column */}
      <View style={styles.dateCol}>
        <Text style={[styles.dateDay, isFlare && { color: '#EF4444' }]}>{day}</Text>
        <Text style={styles.dateMonth}>{month}</Text>
        <Text style={styles.dateTime}>{time}</Text>
      </View>

      {/* Content Column */}
      <View style={styles.contentCol}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={[styles.itchBadge, isFlare ? styles.itchBadgeFlare : styles.itchBadgeNormal]}>
            <Text style={[styles.itchValue, isFlare ? { color: '#EF4444' } : { color: BrandColors.primary }]}>
              {checkIn.itchLevel}
            </Text>
            <Text style={styles.itchLabel}>/10</Text>
          </View>
          
          {isFlare && (
            <View style={styles.flareTag}>
               <Ionicons name="flame" size={12} color="#EF4444" />
               <Text style={styles.flareText}>FLARE</Text>
            </View>
          )}

          {showMediaBadge && (
             <Ionicons name="images" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
          )}
        </View>

        {/* Tags Row */}
        <View style={styles.tagsRow}>
          {checkIn.selectedParts.slice(0, 2).map((part, i) => (
             <View key={i} style={styles.tag}>
               <Text style={styles.tagText}>{part}</Text>
             </View>
          ))}
          {checkIn.selectedParts.length > 2 && (
             <Text style={styles.moreTags}>+{checkIn.selectedParts.length - 2}</Text>
          )}
        </View>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="rgba(148,163,184,0.5)" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.4)',
  },
  flareContainer: {
    borderColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  dateCol: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  dateTime: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  contentCol: {
    flex: 1,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itchBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(31,41,55,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itchBadgeFlare: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  itchBadgeNormal: {
    backgroundColor: 'rgba(31,41,55,0.5)',
  },
  itchValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  itchLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginLeft: 2,
  },
  flareTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  flareText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: 'rgba(71,85,105,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
