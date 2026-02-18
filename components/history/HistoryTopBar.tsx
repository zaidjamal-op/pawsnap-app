import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '@/context/PetContext';
import { BrandColors } from '@/constants/theme';

interface HistoryTopBarProps {
  onAddPress: () => void;
  onFilterPress?: () => void;
}

export default function HistoryTopBar({ onAddPress, onFilterPress }: HistoryTopBarProps) {
  const router = useRouter();
  const { activePetId, getPet } = usePets();
  const activePet = activePetId ? getPet(activePetId) : null;

  return (
    <View style={styles.header}>
      {/* Pet Switcher (Mock for now, links to profile) */}
      <TouchableOpacity 
        style={styles.petSelector}
        activeOpacity={0.8}
        onPress={() => router.push('/profile/pets')}
      >
        <View style={styles.avatarCircle}>
          <Image
            source={activePet ? { uri: activePet.avatar } : require('@/assets/images/pawsnap-logo.png')}
            style={styles.avatarImage}
          />
        </View>
        <View>
          <Text style={styles.historyLabel}>History for</Text>
          <View style={styles.nameRow}>
            <Text style={styles.petName}>{activePet ? activePet.name : 'Select Pet'}</Text>
            <Ionicons name="chevron-down" size={16} color={BrandColors.primary} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Actions */}
      {/* <View style={styles.actions}>
        <TouchableOpacity style={styles.addBtn} onPress={onAddPress} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color={BrandColors.background} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4, 
  },
  petSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(71,85,105,0.5)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  historyLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  petName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31,41,55,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
