import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BrandColors } from '@/constants/theme';

interface HistorySegmentedControlProps {
  activeTab: 'checkins' | 'media';
  onChange: (tab: 'checkins' | 'media') => void;
}

export default function HistorySegmentedControl({ activeTab, onChange }: HistorySegmentedControlProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segmentBtn, activeTab === 'checkins' && styles.segmentBtnActive]}
        onPress={() => onChange('checkins')}
        activeOpacity={0.9}
      >
        <Text style={[styles.segmentText, activeTab === 'checkins' && styles.segmentTextActive]}>
          Check-ins
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segmentBtn, activeTab === 'media' && styles.segmentBtnActive]}
        onPress={() => onChange('media')}
        activeOpacity={0.9}
      >
        <Text style={[styles.segmentText, activeTab === 'media' && styles.segmentTextActive]}>
          Media
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BrandColors.surface,
    borderRadius: 9999,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9999,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#374151',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  segmentTextActive: {
    color: BrandColors.primary,
  },
});
