import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function QuickActionsRow() {
  const router = useRouter();
  const { isPremium } = usePets();

  const ACTIONS = [
    { 
      label: 'Check-in', 
      icon: 'checkmark-circle-outline', 
      color: BrandColors.primary, 
      route: '/checkin/daily' 
    },
    { 
      label: 'Flare Mode', 
      icon: 'warning-outline', 
      color: '#EF4444', 
      route: '/checkin/flare' 
    },
    { 
      label: 'Add Photo', 
      icon: 'camera-outline', 
      color: '#3B82F6', 
      route: '/photo/capture' 
    },
    { 
      label: 'Vet Report', 
      icon: 'document-text-outline', 
      color: '#8B5CF6', 
      route: '/report/range',
      locked: !isPremium // Example premium lock logic
    },
  ];

  return (
    <View style={styles.container}>
      {ACTIONS.map((action) => (
        <TouchableOpacity 
          key={action.label} 
          style={styles.actionCard} 
          activeOpacity={0.7} 
          onPress={() => router.push(action.route as any)}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: `${action.color}15` }, // 15% opacity
            ]}
          >
            <Ionicons name={action.icon as any} size={22} color={action.color} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
          {action.locked && (
            <View style={styles.lockBadge}>
               <Ionicons name="lock-closed" size={10} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 3,
    borderRadius: 6,
  },
});
