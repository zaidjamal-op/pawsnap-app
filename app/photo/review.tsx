import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MOCK_PHOTO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzh_7r1_GBL6DnhGSOvFTyMTjYEUM3_WENWnCDVKmDVFjrue62ZfYSAT8uRh-RA8rcnr6iU6Ttv2u1oOxHSRU44ECbK-l8wD0kG5_BwPRR0tpdnzAeMs3G_OJMNG_rWfRINgmnFJ5OsDyz8SU75E41PZs-KxsggBMqCmpiUycyFeePoUXA7OPaHdh5FoBP3-sEEWZ0VB_p9PuAv3n6Wxp9G2ljFm8oc2gjINljc7mM5NlqMDw6E6oodNCtZSb8XPfp7Y7jwwiG6VlV';

export default function PhotoReviewScreen() {
  const router = useRouter();
  const { area } = useLocalSearchParams<{ area: string }>();
  const [notes, setNotes] = useState('');

  const handleUsePhoto = () => {
    Alert.alert('Photo Saved', `Paw photo for "${area || 'Paws'}" has been saved.`, [
      { text: 'OK', onPress: () => router.dismissAll() },
    ]);
  };

  const handleRetake = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="close" size={18} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Photo</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Photo Preview */}
      <Animated.View entering={FadeInDown.delay(80).duration(500)} style={styles.photoWrap}>
        <Image
          source={{ uri: MOCK_PHOTO }}
          style={styles.photo}
          resizeMode="cover"
        />
        {/* Gradient overlay at bottom */}
        <View style={styles.photoGradient} />
        {/* Zoom indicator */}
        <View style={styles.zoomBadge}>
          <MaterialIcons name="zoom-in" size={18} color="rgba(255,255,255,0.8)" />
        </View>
      </Animated.View>

      {/* Notes */}
      <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.notesSection}>
        <Text style={styles.notesLabel}>Notes</Text>
        <View style={styles.notesInputWrap}>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note (optional)..."
            placeholderTextColor="#6B7280"
            multiline
            textAlignVertical="top"
          />
          <MaterialIcons
            name="edit"
            size={16}
            color="#4B5563"
            style={styles.notesEditIcon}
          />
        </View>
      </Animated.View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.useBtn} onPress={handleUsePhoto} activeOpacity={0.85}>
          <MaterialIcons name="check" size={20} color={BrandColors.background} />
          <Text style={styles.useBtnText}>Use photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake} activeOpacity={0.7}>
          <MaterialIcons name="replay" size={18} color="#9CA3AF" />
          <Text style={styles.retakeBtnText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Progress */
  progressTrack: {
    width: '100%', height: 3,
    backgroundColor: '#1F2937',
    marginTop: Platform.OS === 'ios' ? 54 : 34,
  },
  progressFill: {
    width: '66%', height: '100%',
    backgroundColor: BrandColors.primary, borderTopRightRadius: 2, borderBottomRightRadius: 2,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 6,
  },

  /* Header */
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#FFFFFF' },

  /* Photo */
  photoWrap: {
    flex: 1, marginHorizontal: 20,
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#12201e',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
    position: 'relative',
  },
  photo: { width: '100%', height: '100%' },
  photoGradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  zoomBadge: {
    position: 'absolute', bottom: 14, right: 14,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },

  /* Notes */
  notesSection: { paddingHorizontal: 20, paddingTop: 16 },
  notesLabel: { fontSize: 13, fontWeight: '500', color: '#6B7280', marginBottom: 8, marginLeft: 2 },
  notesInputWrap: { position: 'relative' },
  notesInput: {
    backgroundColor: BrandColors.surface,
    borderRadius: 12, padding: 14, paddingRight: 36,
    fontSize: 14, color: '#FFFFFF', height: 80,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)',
  },
  notesEditIcon: { position: 'absolute', bottom: 12, right: 12 },

  /* Footer */
  footer: {
    paddingHorizontal: 20, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    gap: 8,
  },
  useBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: BrandColors.primary,
    paddingVertical: 18, borderRadius: 14,
    shadowColor: BrandColors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 12, elevation: 6,
  },
  useBtnText: { fontSize: 17, fontWeight: '700', color: BrandColors.background },
  retakeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 12, borderRadius: 14,
  },
  retakeBtnText: { fontSize: 14, fontWeight: '500', color: '#9CA3AF' },
});
