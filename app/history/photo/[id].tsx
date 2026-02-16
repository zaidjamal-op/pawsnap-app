import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Oct 24, 2023" />

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600' }} 
            style={styles.image} 
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.zoomBtn}>
            <Ionicons name="scan-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="paw" size={20} color={BrandColors.primary} />
            </View>
            <View>
              <Text style={styles.label}>AREA</Text>
              <Text style={styles.value}>Front Paw</Text>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <View style={[styles.iconCircle, { marginTop: 2 }]}>
              <Ionicons name="create-outline" size={20} color={BrandColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>NOTE</Text>
              <Text style={styles.noteText}>
                Redness between toes. Seems sensitive to touch. Applied balm after photo.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
             style={styles.compareBtn}
             onPress={() => router.push('/history/compare')}
             activeOpacity={0.8}
          >
            <Ionicons name="images-outline" size={20} color={BrandColors.background} />
            <Text style={styles.compareText}>Compare</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  content: { flex: 1, padding: 24, flexDirection: 'column' },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/5,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#1F2937',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  image: { width: '100%', height: '100%' },
  zoomBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 30,
    backdropFilter: 'blur(10px)',
  },

  detailsCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  detailItem: { flexDirection: 'row', gap: 16 },
  iconCircle: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  noteText: { fontSize: 15, color: '#D1D5DB', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#1F2937', marginVertical: 16 },

  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 16,
  },
  compareBtn: {
    flex: 1,
    backgroundColor: BrandColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  compareText: { fontSize: 18, fontWeight: '700', color: BrandColors.background },
  deleteBtn: {
    width: 64,
    backgroundColor: BrandColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
});
