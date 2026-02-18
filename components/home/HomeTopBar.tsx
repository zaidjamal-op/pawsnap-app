import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '@/context/PetContext';
import { BrandColors } from '@/constants/theme';

export default function HomeTopBar() {
  const router = useRouter();
  const { activePetId, getPet, currentStreak } = usePets();
  const activePet = activePetId ? getPet(activePetId) : null;

  // Helper to safely get streak
  const getStreak = (id: string | null) => {
      // In real app, streak is likely per-pet. 
      // Our context calculates 'currentStreak' based on activePetId already.
      return currentStreak;
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.dateText}>{dateStr}</Text>
        <View
          style={styles.petSelector}
        >
          <Text style={styles.greeting}>
            Today with {activePet ? activePet.name : '...'}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        
        {/* Streak Badge */}
        <View style={styles.streakBadge}>
           <LinearGradient
              colors={['#FF7E5F', '#FEB47B']} // Warm Flame Gradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StyleSheet.absoluteFillObject}
           />
           <Ionicons name="flame" size={14} color="#FFFFFF" />
           <Text style={styles.streakText}>{getStreak(activePetId)}</Text>
        </View>

        {/* Avatar */}
        <TouchableOpacity onPress={() => router.push('/profile/pets')}>
           <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Image
                source={activePet ? { uri: activePet.avatar } : require('@/assets/images/pawsnap-logo.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.statusDot} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Changed to center for better alignment
    marginBottom: 24,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(148,163,184,0.7)',
    marginBottom: 4,
  },
  petSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  greeting: {
    fontSize: 26, // Slightly reduced
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 50,
    justifyContent: 'center',
    shadowColor: '#FF7E5F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  streakText: {
      fontSize: 13,
      fontWeight: '800',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
  },
  iconBtn: {
    padding: 4,
  },
  avatarWrap: { position: 'relative' },
  avatarCircle: {
    width: 44, // Slightly smaller
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(71,85,105,0.5)',
    overflow: 'hidden',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: BrandColors.background,
  },
});
