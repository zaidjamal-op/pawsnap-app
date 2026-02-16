import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function ProtocolScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Protocol</Text>
      </View>
      <View style={styles.empty}>
        <Ionicons name="clipboard-outline" size={48} color="rgba(148,163,184,0.3)" />
        <Text style={styles.emptyTitle}>No active protocol</Text>
        <Text style={styles.emptyText}>Medication schedules and routines will appear here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  header: {
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    gap: 12,
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  emptyText: { fontSize: 14, color: 'rgba(148,163,184,0.6)', textAlign: 'center' },
});
