import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CheckInDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <ScreenHeader
        title="Check-in Details"
        rightElement={
            <TouchableOpacity onPress={() => { /* Handle menu */ }}>
                <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dateBanner}>
           <Text style={styles.dateText}>October 24, 2023 at 9:41 AM</Text>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          {/* Severity Score */}
          <View style={styles.severitySection}>
             <View style={styles.severityRingOuter}>
                <View style={styles.severityRingInner} />
                <View style={styles.severityRingHighlight} />
                <View style={styles.severityScoreBox}>
                   <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                     <Text style={styles.severityScore}>8</Text>
                     <Text style={styles.severityMax}>/10</Text>
                   </View>
                   <Text style={styles.severityLabel}>SEVERE</Text>
                </View>
             </View>
          </View>

          {/* Details */}
          <View style={styles.detailRow}>
             <View style={styles.detailTitleRow}>
               <Ionicons name="paw" size={18} color={BrandColors.primary} />
               <Text style={styles.detailTitle}>Most Itchy</Text>
             </View>
             <View style={styles.tagsRow}>
               <View style={styles.pill}><Text style={styles.pillText}>Paws</Text></View>
               <View style={styles.pill}><Text style={styles.pillText}>Belly</Text></View>
             </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
             <View style={styles.detailTitleRow}>
               <MaterialIcons name="healing" size={18} color="#EF4444" />
               <Text style={styles.detailTitle}>Skin Signs</Text>
             </View>
             <View style={styles.tagsRow}>
               <View style={[styles.pill, styles.pillRed]}><Text style={[styles.pillText, styles.pillTextRed]}>Redness</Text></View>
               <View style={[styles.pill, styles.pillRed]}><Text style={[styles.pillText, styles.pillTextRed]}>Hot Spot</Text></View>
             </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
             <View style={styles.detailTitleRow}>
               <Ionicons name="leaf" size={18} color="#22C55E" />
               <Text style={styles.detailTitle}>Exposures</Text>
             </View>
             <View style={styles.tagsRow}>
               <View style={[styles.pill, styles.pillGreen]}><Text style={[styles.pillText, styles.pillTextGreen]}>Grass</Text></View>
               <View style={[styles.pill, styles.pillBlue]}><Text style={[styles.pillText, styles.pillTextBlue]}>New Shampoo</Text></View>
             </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
             <View style={styles.detailTitleRow}>
               <Ionicons name="document-text" size={18} color="#9CA3AF" />
               <Text style={styles.detailTitle}>Notes</Text>
             </View>
             <View style={styles.noteBox}>
               <Text style={styles.noteText}>
                 Bella seemed very agitated after running in the tall grass at the park. She immediately started chewing her paws when we got home. Gave her a soothing bath.
               </Text>
             </View>
          </View>
        </View>

        {/* Linked Photos */}
        <View style={styles.photosSection}>
           <View style={styles.photosHeader}>
             <Text style={styles.photosTitle}>Linked Photos</Text>
             <Text style={styles.photosCount}>2 photos</Text>
           </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosRow}>
              <View style={styles.photoThumb}>
                 <Image source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300' }} style={styles.photoImg} />
              </View>
              <View style={styles.photoThumb}>
                 <Image source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300' }} style={styles.photoImg} />
              </View>
              <TouchableOpacity style={styles.addPhotoThumb}>
                 <Ionicons name="camera" size={24} color={BrandColors.primary} />
                 <Text style={styles.addPhotoLabel}>Add Photo</Text>
              </TouchableOpacity>
           </ScrollView>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
           <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="create-outline" size={20} color={BrandColors.primary} />
              <Text style={styles.editBtnText}>Edit Check-in</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color="#9CA3AF" />
              <Text style={styles.deleteBtnText}>Delete</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BrandColors.background,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  dateBanner: { alignItems: 'center', marginBottom: 24 },
  dateText: { color: '#9CA3AF', fontSize: 14, fontWeight: '500' },
  
  card: {
    backgroundColor: BrandColors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  severitySection: { alignItems: 'center', marginBottom: 32 },
  severityRingOuter: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 6, borderColor: 'rgba(55,65,81,0.5)',
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  severityRingInner: { ...StyleSheet.absoluteFillObject },
  severityRingHighlight: {
    position: 'absolute',
    top: -6, left: 0, right: 0, bottom: 0,
    borderWidth: 6, borderColor: BrandColors.primary, borderRadius: 60,
    borderLeftColor: 'transparent', borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  severityScoreBox: { alignItems: 'center' },
  severityScore: { fontSize: 40, fontWeight: '800', color: '#FFFFFF' },
  severityMax: { fontSize: 20, fontWeight: '700', color: '#9CA3AF' },
  severityLabel: { marginTop: 4, color: BrandColors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 },

  detailRow: { marginVertical: 8 },
  detailTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  detailTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { backgroundColor: 'rgba(31,41,55,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999 },
  pillText: { color: '#D1D5DB', fontSize: 12, fontWeight: '600' },
  pillRed: { backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' },
  pillTextRed: { color: '#EF4444' },
  pillGreen: { backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.2)' },
  pillTextGreen: { color: '#22C55E' },
  pillBlue: { backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)' },
  pillTextBlue: { color: '#60A5FA' },

  divider: { height: 1, backgroundColor: 'rgba(55,65,81,0.5)', marginVertical: 16 },
  noteBox: { backgroundColor: 'rgba(31,41,55,0.4)', padding: 16, borderRadius: 12 },
  noteText: { color: '#D1D5DB', fontSize: 14, lineHeight: 22 },

  photosSection: { marginBottom: 24 },
  photosHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16, paddingHorizontal: 4 },
  photosTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  photosCount: { fontSize: 12, color: '#9CA3AF' },
  photosRow: { gap: 12 },
  photoThumb: { width: 100, height: 100, borderRadius: 16, overflow: 'hidden', backgroundColor: '#374151' },
  photoImg: { width: '100%', height: '100%' },
  addPhotoThumb: {
    width: 100, height: 100, borderRadius: 16,
    borderWidth: 2, borderColor: 'rgba(45,212,191,0.5)', borderStyle: 'dashed',
    backgroundColor: 'rgba(45,212,191,0.05)',
    justifyContent: 'center', alignItems: 'center',
    gap: 4
  },
  addPhotoLabel: { fontSize: 10, fontWeight: '600', color: BrandColors.primary },

  actions: { gap: 12 },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: 'rgba(45,212,191,0.1)',
    padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: BrandColors.primary
  },
  editBtnText: { color: BrandColors.primary, fontWeight: '700', fontSize: 16 },
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: 16, borderRadius: 12,
  },
  deleteBtnText: { color: '#9CA3AF', fontWeight: '600', fontSize: 16 },
});
