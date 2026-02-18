import { BrandColors } from '@/constants/theme';
import ScreenHeader from '@/components/ScreenHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,

    TouchableOpacity,
    View,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  withDelay,
  useDerivedValue,
  interpolateColor
} from 'react-native-reanimated';
import { usePets } from '@/context/PetContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function SeverityRing({ score }: { score: number }) {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(300, withTiming(score / 10, { duration: 1500 }));
  }, [score]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    const stroke = interpolateColor(
      progress.value,
      [0, 0.4, 0.7, 1],
      ['#22C55E', '#FBBF24', '#F97316', '#EF4444']
    );
    return {
      strokeDashoffset,
      stroke,
    };
  });
  
  // const colorStyle = useDerivedValue(() => {
  //     return interpolateColor(
  //       progress.value,
  //       [0, 0.4, 0.7, 1],
  //       ['#22C55E', '#FBBF24', '#F97316', '#EF4444']
  //     );
  // });

  // Animated props for color need to be handled carefully with SVG
  // Reanimated 2/3 supports animating props directly if createAnimatedComponent is used
  // But strictly speaking interpolateColor returns color string. 
  // We can pass it if we useAnimatedProps returning matches expected prop type.
  
  // const animatedColorProps = useAnimatedProps(() => {
  //     return {
  //         stroke: colorStyle.value
  //     };
  // });

  return (
    <View style={styles.ringContainer}>
      <Svg width={140} height={140} viewBox="0 0 140 140">
        <G rotation="-90" origin="70, 70">
          {/* Background Track */}
          <Circle
            cx="70"
            cy="70"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <AnimatedCircle
            cx="70"
            cy="70"
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.ringContent}>
         <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
           <Animated.Text style={[styles.severityScore, {color: '#FFF'}]}>{score}</Animated.Text>
           <Text style={styles.severityMax}>/10</Text>
         </View>
         <Text style={[styles.severityLabel, { color: score >= 8 ? '#EF4444' : score >= 5 ? '#FBBF24' : '#22C55E' }]}>
           {score >= 8 ? 'SEVERE' : score >= 5 ? 'MODERATE' : 'MILD'}
         </Text>
      </View>
    </View>
  );
}

export default function CheckInDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { checkIns, media, deleteCheckIn } = usePets();

  const checkIn = checkIns.find(c => c.id === id);
  const linkedMediaFromContext = media.filter(m => m.checkInId === id);

  if (!checkIn) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#9CA3AF' }}>Check-in not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: BrandColors.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fallbackLinkedMedia = [
    checkIn.imageUri
      ? {
          id: `${checkIn.id}-photo`,
          petId: checkIn.petId,
          date: checkIn.date,
          type: 'photo' as const,
          uri: checkIn.imageUri,
          area: checkIn.selectedParts?.[0] ?? 'General',
          notes: checkIn.notes,
          checkInId: checkIn.id,
        }
      : null,
    checkIn.videoUri
      ? {
          id: `${checkIn.id}-video`,
          petId: checkIn.petId,
          date: checkIn.date,
          type: 'video' as const,
          uri: checkIn.videoUri,
          area: checkIn.selectedParts?.[0] ?? 'General',
          notes: checkIn.notes,
          checkInId: checkIn.id,
        }
      : null,
  ].filter(Boolean);

  const linkedMedia = [...linkedMediaFromContext, ...fallbackLinkedMedia].filter(
    (item, index, arr) =>
      arr.findIndex(
        (m) => m?.uri === item?.uri && m?.type === item?.type && m?.checkInId === item?.checkInId,
      ) === index,
  );
  const hasLinkedVideo = linkedMedia.some((m) => m?.type === 'video');
  const linkedTitle = hasLinkedVideo ? 'Linked Photos and Videos' : 'Linked Photos';

  const date = new Date(checkIn.date);
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const handleDelete = () => {
    deleteCheckIn(id as string);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <ScreenHeader
        title="Check-in Details"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dateBanner}>
           <Text style={styles.dateText}>{dateStr} at {timeStr}</Text>
        </View>


        <View style={styles.card}>
          {/* Severity Score */}
          <View style={styles.severitySection}>
             <SeverityRing score={checkIn.itchLevel} />
          </View>


          {/* Details */}
          {checkIn.selectedParts && checkIn.selectedParts.length > 0 && (
            <>
              <View style={styles.detailRow}>
                 <View style={styles.detailTitleRow}>
                   <Ionicons name="paw" size={18} color={BrandColors.primary} />
                   <Text style={styles.detailTitle}>Most Itchy</Text>
                 </View>
                 <View style={styles.tagsRow}>
                   {checkIn.selectedParts.map((part, index) => (
                      <View key={index} style={styles.pill}><Text style={styles.pillText}>{part}</Text></View>
                   ))}
                 </View>
              </View>
              <View style={styles.divider} />
            </>
          )}

          {checkIn.skinSigns && checkIn.skinSigns.length > 0 && (
            <>
              <View style={styles.detailRow}>
                 <View style={styles.detailTitleRow}>
                   <MaterialIcons name="healing" size={18} color="#EF4444" />
                   <Text style={styles.detailTitle}>Skin Signs</Text>
                 </View>
                 <View style={styles.tagsRow}>
                   {checkIn.skinSigns.map((sign, index) => (
                      <View key={index} style={[styles.pill, styles.pillRed]}>
                        <Text style={[styles.pillText, styles.pillTextRed]}>{sign}</Text>
                      </View>
                   ))}
                 </View>
              </View>
              <View style={styles.divider} />
            </>
          )}

          {checkIn.exposures && checkIn.exposures.length > 0 && (
            <>
              <View style={styles.detailRow}>
                 <View style={styles.detailTitleRow}>
                   <Ionicons name="leaf" size={18} color="#22C55E" />
                   <Text style={styles.detailTitle}>Exposures</Text>
                 </View>
                 <View style={styles.tagsRow}>
                    {checkIn.exposures.map((exp, index) => (
                      <View key={index} style={[styles.pill, styles.pillGreen]}>
                        <Text style={[styles.pillText, styles.pillTextGreen]}>{exp}</Text>
                      </View>
                   ))}
                 </View>
              </View>
              <View style={styles.divider} />
            </>
          )}

          <View style={styles.detailRow}>
             <View style={styles.detailTitleRow}>
               <Ionicons name="document-text" size={18} color="#9CA3AF" />
               <Text style={styles.detailTitle}>Notes</Text>
             </View>
             <View style={styles.noteBox}>
               <Text style={styles.noteText}>
                 {checkIn.notes || 'No notes added.'}
               </Text>
             </View>
          </View>
        </View>

        {/* Linked Media */}
        {linkedMedia.length > 0 && (
          <View style={styles.photosSection}>
             <View style={styles.photosHeader}>
               <Text style={styles.photosTitle}>{linkedTitle}</Text>
               <Text style={styles.photosCount}>{linkedMedia.length} items</Text>
             </View>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosRow}>
                {linkedMedia.map(item => (
                  <TouchableOpacity
                    key={`${item.id}-${item.uri}`}
                    style={styles.photoThumb}
                    onPress={() =>
                      router.push({
                        pathname: '/history/photo/[id]',
                        params: {
                          id: item.id,
                          uri: item.uri,
                          type: item.type,
                          date: item.date,
                          area: item.area ?? '',
                          notes: item.notes ?? '',
                        },
                      })
                    }
                    activeOpacity={0.85}
                  >
                     {item.type === 'video' ? (
                       <Video
                         source={{ uri: item.uri }}
                         style={styles.photoImg}
                         resizeMode={ResizeMode.COVER}
                         shouldPlay
                         isMuted
                         isLooping
                         useNativeControls={false}
                       />
                     ) : (
                       <ExpoImage source={{ uri: item.uri }} style={styles.photoImg} contentFit="cover" />
                     )}
                     {item.type === 'video' && (
                        <View style={{position: 'absolute', inset: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                           <Ionicons name="play-circle" size={24} color="#FFF" />
                        </View>
                     )}
                  </TouchableOpacity>
                ))}
             </ScrollView>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
           <TouchableOpacity style={styles.editBtn} onPress={() => router.push({ pathname: '/checkin/daily', params: { id: checkIn.id } })}>
              <Ionicons name="create-outline" size={20} color={BrandColors.primary} />
              <Text style={styles.editBtnText}>Edit Check-in</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
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
  dateText: { color: '#9CA3AF', fontSize: 14, fontWeight: '500', marginTop: 30 },
  
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
  severityLabel: { marginTop: 4, color: BrandColors.primary, fontSize: 7, fontWeight: '700', letterSpacing: 1 },

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
  
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  ringContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
