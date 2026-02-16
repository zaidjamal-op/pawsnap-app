import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

/* ─── Mock Data ─── */
const TIMELINE_DATA = [
  {
    id: '1',
    date: 'Today',
    time: '9:41 AM',
    score: 8,
    tags: [
      { label: 'Redness', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
      { label: 'Biting', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
      { label: 'Paws', color: '#9CA3AF', bg: 'rgba(31,41,55,0.4)' },
    ],
    note: 'Bella seemed very agitated after running in the grass. Ate chicken for dinner.',
    isFirst: true,
  },
  {
    id: '2',
    date: 'Yesterday',
    time: '8:15 PM',
    score: 4,
    tags: [
      { label: 'Paws', color: '#9CA3AF', bg: 'rgba(31,41,55,0.4)' },
      { label: 'Bath Day', color: '#60A5FA', bg: 'rgba(96,165,250,0.1)' },
    ],
    note: null,
  },
  {
    id: '3',
    date: 'Oct 24',
    time: '10:00 AM',
    score: 2,
    tags: [],
    note: 'Sleeping well. No issues observed.',
    isSleep: true,
  },
];

const PHOTOS_DATA = [
  { id: 'p1', date: 'Oct 24', label: 'Front Paw', uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300' },
  { id: 'p2', date: 'Oct 22', label: 'Right Ear', uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300' },
  { id: 'p3', date: 'Oct 20', label: 'Belly', uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300' },
  { id: 'p4', date: 'Oct 18', label: 'Neck', uri: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=300' },
  { id: 'p5', date: 'Oct 15', label: 'Snout', uri: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=300' },
  { id: 'p6', date: 'Oct 12', label: 'Tail', uri: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=300' },
  { id: 'p7', date: 'Sep 28', label: 'Back', uri: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=300' },
  { id: 'p8', date: 'Sep 25', label: 'Left Leg', uri: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=300' },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'checkins' | 'photos'>('checkins');

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>History</Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="filter" size={20} color="rgba(156,163,175,1)" />
          </TouchableOpacity>
        </View>
        
        {/* Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'checkins' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('checkins')}
            activeOpacity={0.9}
          >
            <Text style={[styles.segmentText, activeTab === 'checkins' && styles.segmentTextActive]}>
              Check-ins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'photos' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('photos')}
            activeOpacity={0.9}
          >
            <Text style={[styles.segmentText, activeTab === 'photos' && styles.segmentTextActive]}>
              Photos
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Content ─── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'checkins' ? (
          <Animated.View entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(300)}>
            {/* Month Header */}
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>October 2023</Text>
              <View style={styles.monthLine} />
            </View>

            {/* Timeline Items */}
            <View style={styles.timeline}>
              {/* Vertical Line */}
              <View style={styles.timelineLine} />

              {TIMELINE_DATA.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  {/* Dot */}
                  <View style={[
                    styles.timelineDot,
                    item.isFirst && styles.timelineDotActive,
                    item.isFirst ? {} : { backgroundColor: '#374151', borderColor: BrandColors.background }
                  ]} />
                  
                  {/* Card */}
                  <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={() => router.push(`/history/check-in/${item.id}`)}
                    style={[styles.card, !item.isFirst && { opacity: 0.8 }]}
                  >
                    <View style={styles.cardHeader}>
                      <View>
                        <Text style={[styles.cardDateLabel, item.isFirst && { color: BrandColors.primary }]}>
                          {item.date}
                        </Text>
                        <Text style={styles.cardTime}>{item.time}</Text>
                      </View>
                      
                      {/* Score Circle */}
                      <View style={[
                        styles.scoreCircle,
                        { borderColor: item.score > 7 ? BrandColors.primary : 'rgba(45,212,191,0.3)', backgroundColor: 'rgba(45,212,191,0.1)' }
                      ]}>
                        <Text style={[styles.scoreText, { color: item.score > 7 ? BrandColors.primary : 'rgba(45,212,191,0.7)' }]}>
                          {item.score}
                        </Text>
                      </View>
                    </View>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <View style={styles.tagsRow}>
                        {item.tags.map((tag, i) => (
                          <View key={i} style={[styles.tag, { backgroundColor: tag.bg }]}>
                            <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Note */}
                    {item.note && (
                      <View style={styles.noteBox}>
                        <Ionicons 
                          name={item.isSleep ? "checkmark-circle" : "document-text"} 
                          size={14} 
                          color={item.isSleep ? "#9CA3AF" : "#9CA3AF"} 
                          style={{ marginTop: 2 }}
                        />
                        <Text style={[styles.noteText, item.isSleep && { fontStyle: 'italic' }]} numberOfLines={2}>
                          {item.note}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Old Month */}
            <View style={[styles.monthHeader, { marginTop: 32, opacity: 0.5 }]}>
              <Text style={styles.monthTitle}>September 2023</Text>
              <View style={styles.monthLine} />
            </View>
            <View style={[styles.timelineItem, { paddingLeft: 20, opacity: 0.5 }]}>
               <View style={[styles.timelineDot, { backgroundColor: '#374151', borderColor: BrandColors.background, left: -9 }]} />
               <View style={styles.card}>
                 <View style={styles.cardHeader}>
                   <View>
                     <Text style={styles.cardDateLabel}>SEP 28</Text>
                     <Text style={styles.cardTime}>6:30 PM</Text>
                   </View>
                   <View style={[styles.scoreCircle, { borderColor: 'rgba(45,212,191,0.3)', backgroundColor: 'rgba(45,212,191,0.05)' }]}>
                     <Text style={[styles.scoreText, { color: 'rgba(45,212,191,0.6)' }]}>3</Text>
                   </View>
                 </View>
               </View>
            </View>

          </Animated.View>
        ) : (
          <Animated.View entering={FadeInRight.duration(300)} exiting={FadeOutLeft.duration(300)}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>October 2023</Text>
            </View>
            <View style={styles.photoGrid}>
              {PHOTOS_DATA.slice(0, 6).map((photo) => (
                <TouchableOpacity 
                  key={photo.id}
                  style={styles.photoItem}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/history/photo/${photo.id}`)}
                >
                  <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                  <View style={styles.photoOverlay} />
                  <View style={styles.photoInfo}>
                    <View style={styles.photoDateBadge}>
                      <Text style={styles.photoDateText}>{photo.date}</Text>
                    </View>
                    <Text style={styles.photoLabel} numberOfLines={1}>{photo.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.monthHeader, { marginTop: 24 }]}>
              <Text style={styles.monthTitle}>September 2023</Text>
            </View>
            <View style={styles.photoGrid}>
              {PHOTOS_DATA.slice(6).map((photo) => (
                <TouchableOpacity 
                   key={photo.id}
                   style={styles.photoItem}
                   activeOpacity={0.9}
                   onPress={() => router.push(`/history/photo/${photo.id}`)}
                >
                  <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                  <View style={styles.photoOverlay} />
                  <View style={styles.photoInfo}>
                    <View style={styles.photoDateBadge}>
                      <Text style={styles.photoDateText}>{photo.date}</Text>
                    </View>
                    <Text style={styles.photoLabel} numberOfLines={1}>{photo.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {/* Add New Button */}
              <TouchableOpacity style={styles.addPhotoBtn} activeOpacity={0.8}>
                <View style={styles.addPhotoIconCircle}>
                   <Ionicons name="camera" size={20} color={BrandColors.primary} />
                </View>
                <Text style={styles.addPhotoText}>ADD NEW</Text>
              </TouchableOpacity>
            </View>

          </Animated.View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Ionicons name="add" size={32} color={BrandColors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  /* Header */
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: BrandColors.background,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF' },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(31,41,55,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: BrandColors.surface,
    borderRadius: 9999,
    padding: 4,
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

  /* Month Header */
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  monthTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  monthLine: { flex: 1, height: 1, backgroundColor: 'rgba(55,65,81,0.5)' },

  /* Timeline */
  timeline: { paddingHorizontal: 24, position: 'relative' },
  timelineLine: {
    position: 'absolute',
    left: 24 + 11, // padding + line center
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(55,65,81,0.5)',
  },
  timelineItem: {
    paddingLeft: 20,
    marginBottom: 24,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -9,
    top: 3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: BrandColors.primary,
    borderWidth: 3,
    borderColor: BrandColors.background,
    zIndex: 1,
  },
  timelineDotActive: {
    backgroundColor: BrandColors.primary,
  },
  
  /* Timeline Card */
  card: {
    backgroundColor: BrandColors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardDateLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  cardTime: { fontSize: 13, color: '#9CA3AF' },
  scoreCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: { fontSize: 16, fontWeight: '700' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 },
  tagText: { fontSize: 10, fontWeight: '600' },
  noteBox: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'rgba(31,41,55,0.4)',
    padding: 10,
    borderRadius: 12,
  },
  noteText: { fontSize: 13, color: '#D1D5DB', flex: 1, lineHeight: 18 },

  /* Photo Grid */
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  photoItem: {
    width: (width - 40 - 16) / 3, // 3 columns, 40 pad, 16 total gap
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1F2937',
  },
  photoImage: { width: '100%', height: '100%' },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  photoInfo: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
  },
  photoDateBadge: {
    backgroundColor: 'rgba(45,212,191,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.3)',
  },
  photoDateText: { fontSize: 9, fontWeight: '700', color: BrandColors.primary },
  photoLabel: { fontSize: 11, fontWeight: '600', color: '#FFFFFF', textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 2 },
  
  addPhotoBtn: {
    width: (width - 40 - 16) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(45,212,191,0.3)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(45,212,191,0.05)',
  },
  addPhotoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(45,212,191,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  addPhotoText: { fontSize: 9, fontWeight: '700', color: 'rgba(45,212,191,0.8)', letterSpacing: 0.5 },

  /* FAB */
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});
