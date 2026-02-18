import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';

export default function CareRemindersWidget() {
  const REMINDERS = [
      { id: 1, label: 'Flea Prevention', due: 'Due today', icon: 'ladybug', urgent: true },
      { id: 2, label: 'Cytopoint Injection', due: 'In 4 days', icon: 'needle', urgent: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Care Reminders</Text>
      <View style={styles.list}>
          {REMINDERS.map(item => (
              <TouchableOpacity key={item.id} style={styles.item} activeOpacity={0.7}>
                  <View style={[styles.iconBox, item.urgent && styles.iconBoxUrgent]}>
                      <MaterialCommunityIcons 
                        name={item.icon as any} 
                        size={20} 
                        color={item.urgent ? '#EF4444' : '#94A3B8'} 
                      />
                  </View>
                  <View style={{ flex: 1 }}>
                      <Text style={styles.label}>{item.label}</Text>
                      <Text style={[styles.due, item.urgent && styles.dueUrgent]}>{item.due}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#64748B" />
              </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  list: {
      backgroundColor: '#1E293B',
      borderRadius: 20,
      padding: 4,
  },
  item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  iconBox: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  iconBoxUrgent: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#E2E8F0',
  },
  due: {
      fontSize: 12,
      color: '#94A3B8',
  },
  dueUrgent: {
      color: '#EF4444',
      fontWeight: '600',
  },
});
