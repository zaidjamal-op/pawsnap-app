import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';

export default function ProtocolCard() {
  const router = useRouter();
  const { activeProtocol, startProtocol } = usePets();



  if (activeProtocol) {
      return (
          <View style={styles.cardActive}>
              <View style={styles.header}>
                 <Text style={styles.title}>{activeProtocol.name}</Text>
                 <Text style={styles.dayBadge}>Day {activeProtocol.day}/{activeProtocol.totalDays}</Text>
              </View>
              <View style={styles.taskList}>
                  <View style={styles.taskItem}>
                      <Ionicons name="checkbox" size={20} color={BrandColors.primary} />
                      <Text style={styles.taskText}>Feed Rabbit & Potato</Text>
                  </View>
                  <View style={styles.taskItem}>
                      <Ionicons name="square-outline" size={20} color="#64748B" />
                      <Text style={styles.taskText}>No treats given</Text>
                  </View>
              </View>
          </View>
      );
  }

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="list-outline" size={24} color={BrandColors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Start a Protocol</Text>
        <Text style={styles.sub}>
           Find the root cause with a guided 14-day elimination trial.
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.startBtn}
        onPress={() => router.push('/protocol/choose')}
      >
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sub: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  startBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.primary,
  },
  
  // Active State
  cardActive: {
      backgroundColor: '#1E293B',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
  },
  dayBadge: {
      fontSize: 12,
      fontWeight: '600',
      color: BrandColors.primary,
  },
  taskList: {
      gap: 12,
  },
  taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  taskText: {
      fontSize: 14,
      color: '#E2E8F0',
  },
});
