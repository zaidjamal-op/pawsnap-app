import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { usePets } from '@/context/PetContext';

export default function PetsListScreen() {
  const router = useRouter();
  const { pets, activePetId, setActivePet } = usePets();

  const handlePetPress = (id: string) => {
    setActivePet(id);
  };

  const handleEditPress = (id: string) => {
    router.push({
      pathname: '/profile/edit-pet',
      params: { id }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Your Pets" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pet Cards */}
        {pets.map((pet, i) => {
          const isActive = pet.id === activePetId;
          return (
            <Animated.View
              key={pet.id}
              entering={FadeInDown.delay(80 + i * 80).duration(400)}
            >
              <TouchableOpacity
                style={[
                  styles.petCard,
                  isActive && styles.petCardActive,
                ]}
                activeOpacity={0.8}
                onPress={() => handlePetPress(pet.id)}
              >
                <View style={styles.petLeft}>
                  <View style={styles.petAvatarWrap}>
                    <Image
                      source={{ uri: pet.avatar }}
                      style={[styles.petAvatar, !isActive && { opacity: 0.7 }]}
                    />
                    {isActive && (
                      <View style={styles.activeDot}>
                        <MaterialIcons name="check" size={10} color={BrandColors.background} />
                      </View>
                    )}
                  </View>
                  <View>
                    <View style={styles.petNameRow}>
                      <Text style={styles.petName}>{pet.name}</Text>
                      {isActive && (
                        <View style={styles.activeBadge}>
                          <Text style={styles.activeBadgeText}>Active</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.checkInRow}>
                      <MaterialIcons
                        name={pet.lastCheckIn ? 'schedule' : 'history'}
                        size={13}
                        color="#6B7280"
                      />
                      <Text style={styles.checkInText}>
                        {pet.lastCheckIn
                          ? `Last check-in: ${pet.lastCheckIn}`
                          : 'No recent data'
                        }
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => handleEditPress(pet.id)}
                  hitSlop={20}
                >
                  <Ionicons name="pencil" size={18} color="rgba(148,163,184,0.3)" />
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ─── Add Pet CTA ─── */}
      <View style={styles.ctaWrap}>
        <TouchableOpacity 
          style={styles.ctaBtn} 
          activeOpacity={0.85}
          onPress={() => router.push({
            pathname: '/add-pet',
            params: { returnTo: '/profile/pets' }
          })}
        >
          <MaterialIcons name="add" size={22} color={BrandColors.background} />
          <Text style={styles.ctaText}>Add a new pet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16, paddingBottom: 12,
  },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },

  /* ─── Pet Card ─── */
  petCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: BrandColors.surface,
    borderRadius: 18, padding: 16,
    marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  petCardActive: {
    borderColor: BrandColors.primary,
    borderWidth: 2,
    shadowColor: BrandColors.primary,
    shadowOpacity: 0.1, shadowRadius: 12,
    elevation: 4,
  },
  petLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  petAvatarWrap: { position: 'relative' },
  petAvatar: { width: 56, height: 56, borderRadius: 28 },
  activeDot: {
    position: 'absolute', bottom: -2, right: -2,
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: BrandColors.surface,
  },
  petNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  petName: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  activeBadge: {
    backgroundColor: 'rgba(45,212,191,0.1)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999,
  },
  activeBadgeText: {
    fontSize: 10, fontWeight: '700', color: BrandColors.primary,
  },
  checkInRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  checkInText: { fontSize: 12, color: '#6B7280' },

  /* ─── CTA ─── */
  ctaWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    paddingTop: 12,
    backgroundColor: BrandColors.background,
  },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 999,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 16,
    elevation: 8,
  },
  ctaText: { fontSize: 17, fontWeight: '800', color: BrandColors.background },
});
