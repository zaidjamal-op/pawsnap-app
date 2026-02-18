import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors } from '@/constants/theme';
import { usePets } from '@/context/PetContext';
import { useRouter } from 'expo-router';

export default function TopPatternCard() {
  const router = useRouter();
  const { isPremium } = usePets();

  if (isPremium) {
     return (
      <View style={styles.card}>
         <LinearGradient
            colors={['#312E81', '#1E1B4B']} // Deep Indigo for premium feel
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        <View style={styles.header}>
          <Text style={styles.title}>Top Likely Trigger</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>HIGH CONFIDENCE</Text>
          </View>
        </View>

        <View style={styles.content}>
           <View style={styles.iconBox}>
              <Ionicons name="water-outline" size={28} color="#FFFFFF" />
           </View>
           <View style={{ flex: 1 }}>
              <Text style={styles.triggerName}>High Humidity (+48h)</Text>
              <Text style={styles.triggerDesc}>Consistent flare-ups observed 2 days after humid weather.</Text>
           </View>
        </View>

        <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>See why this happens</Text>
            <Ionicons name="arrow-forward" size={14} color={BrandColors.primary} />
        </TouchableOpacity>
      </View>
     );
  }

  // Free (Locked) State - ENGAGING REDESIGN
  return (
    <View style={styles.cardLocked}>
      {/* Background Gradient - Subtle but Premium */}
      <LinearGradient
        colors={['#1E293B', '#0F172A']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Decorative 'Grid' or 'Pattern' overlay could go here if assets available */}

      <View style={styles.header}>
        <View style={styles.lockBadge}>
           <Ionicons name="lock-closed" size={12} color="#FBBF24" />
           <Text style={styles.lockText}>PREMIUM INSIGHT</Text>
        </View>
        <Text style={styles.previewDate}>Updated today</Text>
      </View>

      <Text style={styles.titleLocked}>Top Trigger Found</Text>

      {/* Teaser Content */}
      <View style={styles.teaserContainer}>
         {/* Left: Icon Placeholder */}
         <View style={styles.teaserIcon}>
            <MaterialCommunityIcons name="paw" size={24} color="rgba(255,255,255,0.1)" />
         </View>
         
         {/* Right: Blurred Details */}
         <View style={{ flex: 1, gap: 8 }}>
            <View style={styles.blurLineLarge}>
               <LinearGradient
                  colors={['transparent', 'rgba(255,255,255,0.2)', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={StyleSheet.absoluteFillObject}
               />
            </View>
            <View style={styles.blurLineSmall} />
         </View>
      </View>

      <Text style={styles.descLocked}>
        We’ve identified a pattern in your pet's flare-ups. Unlock to reveal the trigger and prevention tips.
      </Text>

      <TouchableOpacity 
        style={styles.ctaBtn} 
        onPress={() => router.push('/premium/plans')}
        activeOpacity={0.9}
      >
        <LinearGradient
            colors={[BrandColors.primary, '#0D9488']} // Teal gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.ctaText}>Reveal Top Pattern</Text>
        <Ionicons name="arrow-forward" size={16} color="#0F172A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Premium Layout
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E0E7FF',
    fontFamily: 'Inter_700Bold',
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  content: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconBox: {
      width: 48, 
      height: 48, 
      borderRadius: 24, 
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  triggerName: {
     fontSize: 20,
     fontWeight: '700',
     color: '#FFFFFF',
     marginBottom: 6,
     letterSpacing: -0.5,
  },
  triggerDesc: {
      fontSize: 14,
      color: '#C7D2FE',
      lineHeight: 20,
  },
  link: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
  },
  linkText: {
      fontSize: 14,
      fontWeight: '600',
      color: BrandColors.primary,
  },


  // Locked Layout (Redesigned)
  cardLocked: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  lockBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  lockText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#FBBF24',
      letterSpacing: 0.5,
      marginTop: 1,
  },
  previewDate: {
      fontSize: 12,
      color: '#64748B',
      fontWeight: '500',
  },
  titleLocked: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FFFFFF',
      marginTop: 12,
      marginBottom: 16,
      letterSpacing: -0.5,
  },
  teaserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 20,
      opacity: 0.5,
  },
  teaserIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  blurLineLarge: {
      height: 20,
      width: '80%',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 4,
      overflow: 'hidden',
  },
  blurLineSmall: {
      height: 14,
      width: '50%',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 4,
  },
  descLocked: {
      fontSize: 14,
      color: '#94A3B8',
      marginBottom: 24,
      lineHeight: 22,
  },
  ctaBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 16,
      overflow: 'hidden',
  },
  ctaText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#0F172A',
  },
});

