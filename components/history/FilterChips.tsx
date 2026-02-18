import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface FilterOption {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  allowMultiple?: boolean;
}

export default function FilterChips({ options, selectedIds, onToggle, allowMultiple = true }: FilterChipsProps) {
  
  const handlePress = (id: string) => {
    if (!allowMultiple) {
      if (!selectedIds.includes(id)) {
        // If single selection and not selected, select it (and deselect others implicitly by parent logic usually, but here we just pass ID)
         onToggle(id);
      }
    } else {
        onToggle(id);
    }
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {options.map((opt) => {
        const isSelected = selectedIds.includes(opt.id);
        return (
          <TouchableOpacity
            key={opt.id}
            style={[styles.chip, isSelected && styles.chipActive]}
            onPress={() => handlePress(opt.id)}
            activeOpacity={0.8}
          >
            {opt.icon && (
              <Ionicons 
                name={opt.icon} 
                size={14} 
                color={isSelected ? BrandColors.background : '#9CA3AF'} 
                style={{ marginRight: 4 }}
              />
            )}
            <Text style={[styles.label, isSelected && styles.labelActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 4, // Parent has padding
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: BrandColors.surface,
    borderWidth: 1,
    borderColor: 'rgba(71,85,105,0.6)',
  },
  chipActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  labelActive: {
    color: BrandColors.background,
  },
});
