import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Media } from '@/context/PetContext';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

interface MediaTileProps {
  media: Media;
  width: number;
}

export default function MediaTile({ media, width }: MediaTileProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/history/photo/[id]',
      params: {
        id: media.id,
        uri: media.uri,
        type: media.type,
        date: media.date,
        area: media.area ?? '',
        notes: media.notes ?? '',
      },
    });
  };

  const dateStr = new Date(media.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <TouchableOpacity 
      style={[styles.container, { width, height: width }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {media.type === 'photo' ? (
        <Image source={{ uri: media.uri }} style={styles.image} contentFit="cover" />
      ) : (
        <Video
          source={{ uri: media.uri }}
          style={styles.videoPreview}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isMuted
          isLooping
          useNativeControls={false}
        />
      )}
      
      <View style={styles.overlay} />
      
      {media.type === 'video' && (
        <View style={styles.videoIcon}>
          <Ionicons name="play" size={16} color="#FFFFFF" />
        </View>
      )}

      <View style={styles.meta}>
        {media.area && (
          <View style={styles.areaBadge}>
            <Text style={styles.areaText}>{media.area}</Text>
          </View>
        )}
        <Text style={styles.dateText}>{dateStr}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(31,41,55,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  meta: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  areaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(31,41,55,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  areaText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  dateText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
  },
});
