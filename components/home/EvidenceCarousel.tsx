import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function EvidenceCarousel() {
  const router = useRouter();
  const { checkIns, flares, activePetId } = usePets();

  // Combine media from check-ins and flares
  const mediaItems = React.useMemo(() => {
    const allMedia = [];
    
    checkIns.forEach(c => {
      if (c.petId === activePetId && c.imageUri) {
        allMedia.push({ id: c.id, uri: c.imageUri, type: 'checkin', date: c.date });
      }
    });

    flares.forEach(f => {
      if (f.petId === activePetId && f.imageUri) {
        allMedia.push({ id: f.id, uri: f.imageUri, type: 'flare', date: f.date });
      }
    });

    // Add some mock items if empty to demonstrate UI
    if (allMedia.length === 0) {
        return [
            { id: 'm1', uri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', type: 'demo', date: new Date().toISOString() },
            { id: 'm2', uri: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', type: 'demo', date: new Date(Date.now() - 86400000).toISOString() },
            { id: 'm3', uri: 'https://images.unsplash.com/photo-1517423568366-eb980dd2d415?auto=format&fit=crop&w=400&q=80', type: 'demo', date: new Date(Date.now() - 172800000).toISOString() },
        ];
    }

    return allMedia.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [checkIns, flares, activePetId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Evidence</Text>
        <TouchableOpacity onPress={() => router.push('/photo/gallery' as any)}>
          <Text style={styles.link}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Button */}
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => router.push('/photo/capture')}
          activeOpacity={0.7}
        >
          <View style={styles.addIconCircle}>
            <Ionicons name="camera" size={24} color={BrandColors.primary} />
          </View>
          <Text style={styles.addText}>Add New</Text>
        </TouchableOpacity>

        {/* Media Items */}
        {mediaItems.map((item, index) => (
          <TouchableOpacity 
            key={item.id + index} 
            style={styles.mediaItem}
            activeOpacity={0.8}
            onPress={() => {
                // Navigate to view photo
                // router.push(`/photo/view?id=${item.id}`);
            }}
          >
            <Image source={{ uri: item.uri }} style={styles.mediaImage} />
            {item.type === 'flare' && (
                <View style={styles.badge}>
                    <Ionicons name="warning" size={10} color="#FFFFFF" />
                </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.primary,
  },
  scrollContent: {
    paddingRight: 20,
    gap: 12,
  },
  addBtn: {
    width: 100,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 12,
    fontWeight: '600',
    color: BrandColors.primary,
  },
  mediaItem: {
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1F2937',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});
