import { BrandColors } from '@/constants/theme';
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

// Mock pet data
interface Pet {
  id: string;
  name: string;
  avatar: string;
  active: boolean;
  lastCheckIn: string;
}

const PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHnuuatuRMi9VNzS8wYJjMROQvj-hcsDzwr-d1x0F0MEZ2zll9CJ0Bj6rVgI615ARPzcO2z1zua3CqG7p7gaWyXJ4TNoc76YkMr1uEYmLwJLnZKgtiVZ-JNBcB8XYFJvG0mNRnmA8Il0NGny8Kz6DBVc4cklsMPZGNtjvTZKu1KMZ3GKbpXaR09H1i0wZwglV4RQ7wUEtAc6txFMN6i63zBQl3jj8dvxB-pNh0V94kxqV0c9L2iPTUYfSWieL3jMeujOte9R9cTvih',
    active: true,
    lastCheckIn: '4h ago',
  },
  {
    id: '2',
    name: 'Charlie',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7BaKYie_BZTlv3PJ0EafkOMwzh4r9WUSFNn6lvS95y-WIcEncZgZNSVn4Vl2mVc7IieypeA7D0LLxUpXojcYFueevgCqiOK45m06BV-onPLG721mFpszIbu15JY-vwTPajdr-M2DcbX1PLNyBMJ9xlhzgRJO6SGn3hpa-K9-wy7pAmYrduPnwTpaBeYpXdy5wmkJ-Zj_1zOx4CxdgIW0LmTbeXSoN4qrYU0avRhUzgzgYHKqN_OiuxiPcTs8IxzvfJH9YOXZs8lb',
    active: false,
    lastCheckIn: '1d ago',
  },
  {
    id: '3',
    name: 'Bella',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYGieZWbS42z7PL-HKbCm7jISlIcjA7AqOfZ5cA1kc1jgOPCrIAHkqXHfyRlK4UGsJX_TDOfdtd15XXIMCBWikWaJWRgyQjmqZb8tynUFNqrREhTVRWQhbTaoLXcCp061OMZD53HPYAE7K-JncUFOmSYj7x-YCEVbFyr1JWIkEmMLb7dNd5ubrvWU7aAX7b2ArOrEJUPtEHSeDkt3YP0RBJB-RvTJ8V1-3ZLSM8jUNL0pqlcPbjqgC3LBdSGkCPz9iLB0na7HlFes3',
    active: false,
    lastCheckIn: '2d ago',
  },
  {
    id: '4',
    name: 'Max',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6JjHEp9XntEvYxzl-Z5bwKBxm2f1HV3NroeSjOLKhb1lbf5QS0b5mBG9O9wkgOsfa7izEaQUwTzfTVpYwqDhqScLLd2YMLvMoT56HsVioSrevH38Zpp-EWpq7Nujoz23RKygxgX7DEqHTLgWMgXlhhTTQcnc6_Y67z48timR2rjVSXHLLFLb7l7d89kzoumMXvM-aQjsGVJtkJ2nhKbVjBuxTNDd7JGLHaTO4iFGz7YMIwj-e6OUj4OmY-n6mXiSU7i2xFSFyQ4eD',
    active: false,
    lastCheckIn: 'No recent data',
  },
];

export default function PetsListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Pets</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pet Cards */}
        {PETS.map((pet, i) => (
          <Animated.View
            key={pet.id}
            entering={FadeInDown.delay(80 + i * 80).duration(400)}
          >
            <TouchableOpacity
              style={[
                styles.petCard,
                pet.active && styles.petCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => router.push('/profile/edit-pet')}
            >
              <View style={styles.petLeft}>
                <View style={styles.petAvatarWrap}>
                  <Image
                    source={{ uri: pet.avatar }}
                    style={[styles.petAvatar, !pet.active && { opacity: 0.7 }]}
                  />
                  {pet.active && (
                    <View style={styles.activeDot}>
                      <MaterialIcons name="check" size={10} color={BrandColors.background} />
                    </View>
                  )}
                </View>
                <View>
                  <View style={styles.petNameRow}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    {pet.active && (
                      <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>Active</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.checkInRow}>
                    <MaterialIcons
                      name={pet.lastCheckIn === 'No recent data' ? 'history' : 'schedule'}
                      size={13}
                      color="#6B7280"
                    />
                    <Text style={styles.checkInText}>
                      {pet.lastCheckIn === 'No recent data'
                        ? pet.lastCheckIn
                        : `Last check-in: ${pet.lastCheckIn}`}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(148,163,184,0.3)" />
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ─── Add Pet CTA ─── */}
      <View style={styles.ctaWrap}>
        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
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
