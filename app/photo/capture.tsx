import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

function PawGuide() {
  return (
    <Svg width={160} height={160} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2Z"
        fill={BrandColors.primary}
        fillOpacity={0.15}
      />
      <Path
        d="M18.5 4C19.8807 4 21 5.11929 21 6.5C21 7.88071 19.8807 9 18.5 9C17.1193 9 16 7.88071 16 6.5C16 5.11929 17.1193 4 18.5 4Z"
        fill={BrandColors.primary}
        fillOpacity={0.12}
      />
      <Path
        d="M5.5 4C6.88071 4 8 5.11929 8 6.5C8 7.88071 6.88071 9 5.5 9C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4Z"
        fill={BrandColors.primary}
        fillOpacity={0.12}
      />
      <Path
        d="M18.8954 11.5582C19.7891 12.3168 20.1039 13.6393 19.3326 14.8878C18.6667 15.9658 17.5165 17.653 16.0366 19.4674C14.9392 20.8127 13.5186 21.9961 12.0003 21.9961C10.482 21.9961 9.06141 20.8127 7.96403 19.4674C6.48412 17.653 5.33393 15.9658 4.668 14.8878C3.89672 13.6393 4.21151 12.3168 5.10519 11.5582C6.91899 10.0185 9.47563 11.0003 12.0003 11.0003C14.525 11.0003 17.0816 10.0185 18.8954 11.5582Z"
        fill={BrandColors.primary}
        fillOpacity={0.15}
      />
    </Svg>
  );
}

export default function CaptureScreen() {
  const router = useRouter();
  const { area } = useLocalSearchParams<{ area: string }>();
  const [flashOn, setFlashOn] = useState(false);
  const areaName = area || 'Paws';

  const handleCapture = () => {
    // Simulate photo capture → navigate to review
    router.push({
      pathname: '/photo/review',
      params: { area: areaName },
    });
  };

  return (
    <View style={styles.container}>
      {/* Simulated camera background */}
      <View style={styles.cameraBg}>
        <View style={styles.cameraGradTop} />
        <View style={styles.cameraGradBot} />
      </View>

      {/* Header */}
      <Animated.View entering={FadeIn.delay(100).duration(400)} style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Capturing {areaName}</Text>
        <TouchableOpacity style={styles.headerClose} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>

      {/* Main viewfinder */}
      <View style={styles.viewfinder}>
        {/* Instruction badge */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.instructionBadge}>
          <MaterialIcons name="wb-sunny" size={14} color={BrandColors.primary} />
          <Text style={styles.instructionText}>HOLD STEADY • GOOD LIGHTING HELPS</Text>
        </Animated.View>

        {/* Guide frame */}
        <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.guideFrame}>
          {/* Corner accents */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Ghost paw */}
          <PawGuide />
        </Animated.View>
      </View>

      {/* Bottom controls */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          {/* Flash toggle */}
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setFlashOn(!flashOn)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={flashOn ? 'flash-on' : 'flash-off'}
              size={22}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>

          {/* Shutter button */}
          <TouchableOpacity style={styles.shutterOuter} onPress={handleCapture} activeOpacity={0.9}>
            <View style={styles.shutterGlow} />
            <View style={styles.shutterInner}>
              <MaterialIcons name="camera-alt" size={28} color={BrandColors.background} style={{ opacity: 0.6 }} />
            </View>
          </TouchableOpacity>

          {/* Flip camera */}
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
            <MaterialIcons name="flip-camera-ios" size={22} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>

        {/* Cancel */}
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C2A28' },

  /* Camera background simulation */
  cameraBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2a3d3a',
  },
  cameraGradTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 120,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cameraGradBot: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20, paddingBottom: 12,
    zIndex: 10,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  headerClose: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(28,42,40,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },

  /* Viewfinder */
  viewfinder: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    zIndex: 5,
  },
  instructionBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(28,42,40,0.6)',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 999, marginBottom: 28,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
  },
  instructionText: {
    fontSize: 11, fontWeight: '700', color: BrandColors.primary,
    letterSpacing: 0.8,
  },

  guideFrame: {
    width: 260, height: 260,
    borderWidth: 2, borderColor: 'rgba(45,212,191,0.25)',
    borderStyle: 'dashed', borderRadius: 40,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute', width: 24, height: 24,
  },
  cornerTL: {
    top: -2, left: -2,
    borderTopWidth: 4, borderLeftWidth: 4,
    borderColor: BrandColors.primary, borderTopLeftRadius: 14,
  },
  cornerTR: {
    top: -2, right: -2,
    borderTopWidth: 4, borderRightWidth: 4,
    borderColor: BrandColors.primary, borderTopRightRadius: 14,
  },
  cornerBL: {
    bottom: -2, left: -2,
    borderBottomWidth: 4, borderLeftWidth: 4,
    borderColor: BrandColors.primary, borderBottomLeftRadius: 14,
  },
  cornerBR: {
    bottom: -2, right: -2,
    borderBottomWidth: 4, borderRightWidth: 4,
    borderColor: BrandColors.primary, borderBottomRightRadius: 14,
  },

  /* Controls */
  controls: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingTop: 16, zIndex: 10,
  },
  controlRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 36, marginBottom: 20,
  },
  secondaryBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(28,42,40,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  shutterOuter: {
    width: 76, height: 76, borderRadius: 38,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  shutterGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
    backgroundColor: BrandColors.primary, opacity: 0.15,
  },
  shutterInner: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4, shadowRadius: 12,
  },
  cancelBtn: { paddingVertical: 8, paddingHorizontal: 24 },
  cancelText: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
});
