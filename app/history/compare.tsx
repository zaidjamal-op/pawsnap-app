import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
    Dimensions,
    Image,
    PanResponder,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function CompareScreen() {
  const router = useRouter();
  
  // Shared value for slider position (0 to 1)
  const sliderPosition = useSharedValue(0.5);

  // We need a ref to track the START value of the drag
  const startX = useRef(0.5);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Capture initial position when drag starts
        startX.current = sliderPosition.value;
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate new position based on drag delta
        const newPos = Math.max(0, Math.min(1, startX.current + gestureState.dx / width));
        sliderPosition.value = newPos;
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const clippedImageStyle = useAnimatedStyle(() => ({
    width: sliderPosition.value * width,
  }));

  const sliderHandleStyle = useAnimatedStyle(() => ({
    left: sliderPosition.value * width,
  }));

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare Photos</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.compareContainer} {...panResponder.panHandlers}>
        {/* Labels */}
        <View style={[styles.dateLabel, { left: 16 }]}>
           <Text style={styles.dateText}>Oct 12</Text>
        </View>
        <View style={[styles.dateLabel, { right: 16 }]}>
           <Text style={styles.dateText}>Oct 24</Text>
        </View>

        {/* Images */}
        <View style={styles.imagesWrapper}>
           {/* Image 2 (Background - After) */}
           <Image 
             source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600' }} 
             style={styles.imageFull} 
           />
           
           {/* Image 1 (Foreground - Before - Clipped) */}
           <Animated.View style={[styles.imageClippedWrap, clippedImageStyle]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=600' }} 
                style={[styles.imageFull, { width: width }]} // Stretch to full width relative to parent
              />
           </Animated.View>

           {/* Slider Handle */}
           <Animated.View style={[styles.sliderHandle, sliderHandleStyle]}>
              <View style={styles.sliderLine} />
              <View style={styles.sliderKnob}>
                 <Ionicons name="code-working" size={20} color={BrandColors.background} />
              </View>
           </Animated.View>
        </View>
      </View>

      <View style={styles.infoContainer}>
         <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
               <View>
                 <Text style={styles.infoTitle}>Front Left Paw</Text>
                 <Text style={styles.infoSub}>Area of concern</Text>
               </View>
               <View style={styles.iconCircle}>
                 <Ionicons name="paw" size={24} color={BrandColors.primary} />
               </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
               <Text style={styles.statsLabel}>CHANGE DETECTED</Text>
               <View style={styles.statsBadge}>
                 <Text style={styles.statsBadgeText}>-20% Redness</Text>
               </View>
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
               <View style={[styles.progressBarFill, { width: '80%' }]} />
            </View>

            <Text style={[styles.statsLabel, { marginTop: 16, marginBottom: 8 }]}>NOTES</Text>
            <Text style={styles.noteText}>
               Visible reduction in inflammation compared to last week. The new ointment seems to be working well.
            </Text>

            <View style={styles.actionRow}>
               <TouchableOpacity style={styles.shareBtn}>
                 <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
                 <Text style={styles.shareText}>Share</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.addNoteBtn}>
                 <Ionicons name="add-circle-outline" size={20} color={BrandColors.background} />
                 <Text style={styles.addNoteText}>Add Note</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  backBtn: { padding: 4 },

  compareContainer: { height: 400, position: 'relative' },
  dateLabel: {
    position: 'absolute',
    top: 16, 
    zIndex: 20,
    backgroundColor: 'rgba(11,15,20,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#374151',
  },
  dateText: { color: BrandColors.primary, fontSize: 12, fontWeight: '700' },
  
  imagesWrapper: { width: '100%', height: '100%', overflow: 'hidden' },
  imageFull: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageClippedWrap: { 
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    overflow: 'hidden',
    borderRightWidth: 0, // removed static border, handled by slider line
  },
  sliderHandle: {
    position: 'absolute',
    top: 0, bottom: 0,
    width: 40, // Increased touch area logic width, but visual is thin line
    marginLeft: -20, // Center it
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  sliderLine: {
    position: 'absolute',
    top: 0, bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
  },
  sliderKnob: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  infoContainer: { flex: 1, marginTop: -24, paddingHorizontal: 24 },
  infoCard: {
    backgroundColor: BrandColors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  infoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoTitle: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  infoSub: { fontSize: 14, color: '#9CA3AF' },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
  },
  divider: { height: 1, backgroundColor: '#374151', marginVertical: 16 },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statsLabel: { fontSize: 12, fontWeight: '700', color: '#6B7280', letterSpacing: 0.5 },
  statsBadge: { backgroundColor: 'rgba(45,212,191,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999 },
  statsBadgeText: { color: BrandColors.primary, fontSize: 12, fontWeight: '700' },
  
  progressBarBg: { height: 8, backgroundColor: '#374151', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: BrandColors.primary, borderRadius: 4 },

  noteText: { color: '#D1D5DB', fontSize: 14, lineHeight: 22, marginBottom: 24 },

  actionRow: { flexDirection: 'row', gap: 12 },
  shareBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#1F2937', padding: 14, borderRadius: 12,
  },
  shareText: { color: '#FFFFFF', fontWeight: '600' },
  addNoteBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.primary, padding: 14, borderRadius: 12,
  },
  addNoteText: { color: BrandColors.background, fontWeight: '700' },
});
