import ScreenHeader from '@/components/ScreenHeader';
import { BrandColors } from '@/constants/theme';
import { Media, usePets } from '@/context/PetContext';
import { Video, ResizeMode } from 'expo-av';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const getParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param[0] : param;

export default function MediaDetailScreen() {
  const { media } = usePets();
  const params = useLocalSearchParams();

  const id = getParam(params.id);
  const uriParam = getParam(params.uri);
  const typeParam = getParam(params.type) as Media['type'] | undefined;
  const dateParam = getParam(params.date);
  const areaParam = getParam(params.area);
  const notesParam = getParam(params.notes);

  const candidateItems = id ? media.filter((m) => m.id === id) : [];

  const item = candidateItems.find(
    (m) =>
      (!uriParam || m.uri === uriParam) &&
      (!typeParam || m.type === typeParam) &&
      (!dateParam || m.date === dateParam),
  ) ?? candidateItems.find((m) => (!uriParam ? true : m.uri === uriParam)) ?? (candidateItems.length === 1 ? candidateItems[0] : null);

  const resolved: Media | null = item
    ? item
    : id && uriParam && typeParam && dateParam
      ? {
          id,
          petId: '',
          uri: uriParam,
          type: typeParam,
          date: dateParam,
          area: areaParam || undefined,
          notes: notesParam || undefined,
        }
      : null;

  if (!resolved) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Media" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Media not found</Text>
          <Text style={styles.emptyText}>
            This item may have been removed from your history.
          </Text>
        </View>
      </View>
    );
  }

  const displayDate = new Date(resolved.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <ScreenHeader title={displayDate} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.previewCard}>
          {resolved.type === 'photo' ? (
            <Image source={{ uri: resolved.uri }} style={styles.preview} contentFit="contain" />
          ) : (
            <Video
              source={{ uri: resolved.uri }}
              style={styles.preview}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
            />
          )}
        </View>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Type</Text>
            <Text style={styles.metaValue}>{resolved.type === 'photo' ? 'Photo' : 'Video'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Area</Text>
            <Text style={styles.metaValue}>{resolved.area || 'General'}</Text>
          </View>
          {resolved.notes ? (
            <View style={styles.notesWrap}>
              <Text style={styles.metaLabel}>Notes</Text>
              <Text style={styles.notes}>{resolved.notes}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 28,
    gap: 16,
  },
  previewCard: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  metaCard: {
    borderRadius: 16,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    padding: 16,
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  metaValue: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '600',
  },
  notesWrap: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    paddingTop: 12,
  },
  notes: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 8,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
});
