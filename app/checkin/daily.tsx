import { BrandColors } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Directory, File, Paths } from 'expo-file-system';
import { usePets } from '@/context/PetContext';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ItchSlider from '@/components/ItchSlider';

// Safe import for expo-speech-recognition to prevent crashes in Expo Go or non-rebuilt clients
let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent = (event: string, callback: any) => {};
let isSpeechRecognitionModuleAvailable = false;

try {
  const SpeechModule = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule =
    SpeechModule.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = SpeechModule.useSpeechRecognitionEvent;
  isSpeechRecognitionModuleAvailable = true;
} catch {
  console.warn(
    'expo-speech-recognition not found. You may need to rebuild your development client.',
  );
}

const DEFAULT_BODY_PARTS = ['Paws', 'Ears', 'Belly', 'Face', 'Tail'];

const DEFAULT_SKIN_SIGNS = ['Redness', 'Bumps', 'Hair Loss', 'Scabs'];

const DEFAULT_EXPOSURES = [
  { icon: 'grass', label: 'Grass' },
  { icon: 'bathtub', label: 'Bath' },
  { icon: 'restaurant', label: 'New Food' },
  { icon: 'pets', label: 'Other Dogs' },
];

const COMMON_EXPOSURE_ICONS = [
  '🌳', '🌿', '🌻', '🍂', 
  '☀️', '🌧️', '❄️', '💨',
  '🏠', '🏞️', '🏖️', '🚗',
  '🐕', '🐈', '🐿️', '🦟',
  '🥩', '🍗', '🥣', '🧼'
];

export default function DailyCheckinScreen() {
  const router = useRouter();
  const {
    activePetId,
    addCheckIn,
    updateCheckIn,
    deleteCheckIn,
    checkIns,
    customBodyParts,
    addCustomBodyPart,
    removeCustomBodyPart,
    customSkinSigns,
    addCustomSkinSign,
    removeCustomSkinSign,
    customExposures,
    addCustomExposure,
    removeCustomExposure,
    addMedia,
  } = usePets();
  const params = useLocalSearchParams();
  const editId = params.id as string;

  // Form State
  const [itchLevel, setItchLevel] = useState(0);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedSkinSigns, setSelectedSkinSigns] = useState<string[]>([]);
  const [selectedExposures, setSelectedExposures] = useState<string[]>([]);
  
  // Custom item adding state
  const [isAddingSkinSign, setIsAddingSkinSign] = useState(false);
  const [newSkinSign, setNewSkinSign] = useState('');
  
  const [isAddingExposure, setIsAddingExposure] = useState(false);
  const [newExposureLabel, setNewExposureLabel] = useState('');
  const [newExposureEmoji, setNewExposureEmoji] = useState('');

  // New features
  const [noteText, setNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textBeforeRecordingRef = useRef('');
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  // Custom Part Modal
  const [isAddingPart, setIsAddingPart] = useState(false);
  const [newPartName, setNewPartName] = useState('');

  // Combined lists
  const allBodyParts = [...DEFAULT_BODY_PARTS, ...customBodyParts];
  const allSkinSigns = [...DEFAULT_SKIN_SIGNS, ...customSkinSigns.map(s => s.label)];
  const allExposures = [...DEFAULT_EXPOSURES, ...customExposures];

  // Load existing data
  useEffect(() => {
    if (editId) {
      const existing = checkIns.find((c) => c.id === editId);
      if (existing) {
        setItchLevel(existing.itchLevel);
        setSelectedParts(existing.selectedParts);
        setSelectedSkinSigns(existing.skinSigns);
        setSelectedExposures(existing.exposures);
        setNoteText(existing.notes || '');
        setAudioUri(existing.audioUri || null);
        setImageUri(existing.imageUri || null);
        setVideoUri(existing.videoUri || null);
      }
    }
  }, [editId, checkIns]);

  const togglePart = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part)
        ? prev.filter((p) => p !== part)
        : [...prev, part],
    );
  };

  const handleAddCustomPart = () => {
    const name = newPartName.trim();
    if (!name) return;
    
    // Check duplicates (case-insensitive)
    const activeDefaults = DEFAULT_BODY_PARTS.map(p => p.toLowerCase());
    const activeCustoms = customBodyParts.map(p => p.toLowerCase());
    
    if (activeDefaults.includes(name.toLowerCase()) || activeCustoms.includes(name.toLowerCase())) {
      Alert.alert('Duplicate', 'This body part already exists.');
      return;
    }

    addCustomBodyPart(name);
    // Auto select it
    togglePart(name);
    setNewPartName('');
    setIsAddingPart(false);
  };

  const toggleSkinSign = (sign: string) => {
    setSelectedSkinSigns(prev => 
      prev.includes(sign) ? prev.filter(s => s !== sign) : [...prev, sign]
    );
  };

  const toggleExposure = (expLabel: string) => {
    setSelectedExposures(prev => 
      prev.includes(expLabel) ? prev.filter(e => e !== expLabel) : [...prev, expLabel]
    );
  };

  const handleAddCustomSkinSign = () => {
    const name = newSkinSign.trim();
    if (!name) return;

    // Check duplicates
    const activeDefaults = DEFAULT_SKIN_SIGNS.map(s => s.toLowerCase());
    const activeCustoms = customSkinSigns.map(s => s.label.toLowerCase());

    if (activeDefaults.includes(name.toLowerCase()) || activeCustoms.includes(name.toLowerCase())) {
        Alert.alert('Duplicate', 'This skin sign already exists.');
        return;
    }

    addCustomSkinSign(name);
    toggleSkinSign(name);
    setNewSkinSign('');
    setIsAddingSkinSign(false);
  };

  const handleAddCustomExposure = () => {
    const name = newExposureLabel.trim();
    if (!name) return;

    // Check duplicates
    const activeDefaults = DEFAULT_EXPOSURES.map(e => e.label.toLowerCase());
    const activeCustoms = customExposures.map(e => e.label.toLowerCase());

    if (activeDefaults.includes(name.toLowerCase()) || activeCustoms.includes(name.toLowerCase())) {
        Alert.alert('Duplicate', 'This exposure already exists.');
        return;
    }

    addCustomExposure(name, newExposureEmoji.trim() || '📍');
    toggleExposure(name);
    setNewExposureLabel('');
    setNewExposureEmoji('');
    setIsAddingExposure(false);
  };

  const handleDeletePart = (part: string) => {
    if (DEFAULT_BODY_PARTS.includes(part)) return;
    Alert.alert('Remove Body Part', `Remove "${part}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Remove', 
        style: 'destructive', 
        onPress: () => {
          removeCustomBodyPart(part);
          if (selectedParts.includes(part)) togglePart(part);
        }
      }
    ]);
  };

  const handleDeleteSkinSign = (sign: string) => {
    if (DEFAULT_SKIN_SIGNS.includes(sign)) return;
    Alert.alert('Remove Skin Sign', `Remove "${sign}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Remove', 
        style: 'destructive', 
        onPress: () => {
          removeCustomSkinSign(sign);
          if (selectedSkinSigns.includes(sign)) toggleSkinSign(sign);
        }
      }
    ]);
  };

  const handleDeleteExposure = (label: string) => {
    if (DEFAULT_EXPOSURES.some(e => e.label === label)) return;
    Alert.alert('Remove Exposure', `Remove "${label}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Remove', 
        style: 'destructive', 
        onPress: () => {
          removeCustomExposure(label);
          if (selectedExposures.includes(label)) toggleExposure(label);
        }
      }
    ]);
  };

  // Real-time Speech Recognition
  useSpeechRecognitionEvent('start', () => setIsRecording(true));
  useSpeechRecognitionEvent('end', () => setIsRecording(false));

  useSpeechRecognitionEvent('result', (event: any) => {
    const transcript = event.results[0]?.transcript?.trim();
    if (transcript) {
      const base = textBeforeRecordingRef.current;
      setNoteText(base ? `${base} ${transcript}` : transcript);
    }
  });

  useSpeechRecognitionEvent('error', (event: any) => {
    setIsRecording(false);
    console.warn('Speech recognition error:', event);
  });

  const handleToggleRecording = async () => {
    if (isRecording) {
      if (
        ExpoSpeechRecognitionModule &&
        ExpoSpeechRecognitionModule.stop
      ) {
        ExpoSpeechRecognitionModule.stop();
      }
      setIsRecording(false); // Ensure state is updated even if mock
    } else {
      if (
        !isSpeechRecognitionModuleAvailable ||
        !ExpoSpeechRecognitionModule?.start
      ) {
        Alert.alert(
          'Speech recognition unavailable',
          'Speech recognition requires a development build with expo-speech-recognition. Rebuild the app and try again.',
        );
        return;
      }

      let granted = false;
      try {
        const result =
          await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        granted = result.granted;
      } catch (e) {
        console.warn('Permission check failed', e);
        granted = false;
      }

      if (!granted) {
        Alert.alert(
          'Permission denied',
          'We need microphone access to record voice notes.',
        );
        return;
      }

      // Start recording
      textBeforeRecordingRef.current = noteText.trim();

      try {
        ExpoSpeechRecognitionModule.start({
          lang: 'en-US',
          interimResults: true,
          continuous: true,
        });
        setIsRecording(true);
      } catch (e) {
        console.warn('Failed to start speech recognition', e);
        setIsRecording(false);
      }
    }
  };

  const persistPickedAsset = async (
    asset: ImagePicker.ImagePickerAsset,
    type: 'photo' | 'video',
  ) => {
    try {
      const mediaDir = new Directory(Paths.document, 'checkin-media');
      if (!mediaDir.exists) {
        mediaDir.create({ idempotent: true, intermediates: true });
      }

      const extFromName = asset.fileName?.split('.').pop();
      const extFromMime = asset.mimeType?.split('/').pop();
      const extension =
        (extFromName || extFromMime || (type === 'photo' ? 'jpg' : 'mp4'))
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '') || (type === 'photo' ? 'jpg' : 'mp4');

      const output = new File(
        mediaDir,
        `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`,
      );
      new File(asset.uri).copy(output);
      return output.uri;
    } catch (error) {
      console.warn('Could not persist picked media, using original uri', error);
      return asset.uri;
    }
  };

  // Camera Action
  const handleCamera = async (type: 'photo' | 'video') => {
    // Check permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photos to attach media.');
      return;
    }

    Alert.alert(
      type === 'photo' ? 'Add Photo' : 'Add Video',
      'Choose a source',
      [
        {
          text: 'Camera',
          onPress: async () => {
             const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
             if (cameraStatus !== 'granted') {
               Alert.alert('Permission denied', 'We need camera access.');
               return;
             }
             const result = await ImagePicker.launchCameraAsync({
               mediaTypes: type === 'photo' 
                 ? ['images'] 
                 : ['videos'],
               allowsEditing: true,
               quality: 0.8,
             });
             if (!result.canceled) {
               const persistedUri = await persistPickedAsset(result.assets[0], type);
               if (type === 'photo') setImageUri(persistedUri);
               else setVideoUri(persistedUri);
             }
          }
        },
        {
          text: 'Library',
          onPress: async () => {
             const result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: type === 'photo' 
                 ? ['images'] 
                 : ['videos'],
               allowsEditing: true,
               quality: 0.8,
             });
             if (!result.canceled) {
               const persistedUri = await persistPickedAsset(result.assets[0], type);
               if (type === 'photo') setImageUri(persistedUri);
               else setVideoUri(persistedUri);
             }
          }
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSave = () => {
    if (!activePetId) return;

    const date = new Date().toISOString();
    const checkInId = editId || Date.now().toString();

    const checkInData = {
      petId: activePetId,
      date,
      itchLevel,
      selectedParts,
      skinSigns: selectedSkinSigns,
      exposures: selectedExposures,
      notes: noteText,
      imageUri: imageUri || undefined,
      videoUri: videoUri || undefined,
    };

    if (editId) {
      updateCheckIn(editId, checkInData);
      Alert.alert('Updated', 'Check-in updated successfully.');
    } else {
      // Add media to global context if present
      if (imageUri) {
        addMedia({
          petId: activePetId,
          date,
          type: 'photo',
          uri: imageUri,
          area: selectedParts.length > 0 ? selectedParts[0] : 'General',
          notes: noteText,
          checkInId
        });
      }
      if (videoUri) {
        addMedia({
           petId: activePetId,
           date,
           type: 'video',
           uri: videoUri,
           area: selectedParts.length > 0 ? selectedParts[0] : 'General',
           notes: noteText,
           checkInId
        });
      }

      addCheckIn(checkInData);
      Alert.alert('Saved', 'Daily check-in recorded.');
    }
    router.back();
  };

  const handleDelete = () => {
    if (editId) {
      Alert.alert('Delete Check-in', 'Are you sure?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCheckIn(editId);
            router.back();
          },
        },
      ]);
    }
  };

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            {editId ? 'Edit Check-in' : 'Daily Check-in'}
          </Text>
          <Text style={styles.headerDate}>{dateStr}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {editId && (
            <TouchableOpacity
              style={[
                styles.closeBtn,
                { backgroundColor: 'rgba(239,68,68,0.1)' },
              ]}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#EF4444"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets={true}
        >
          {/* ─── Itch Level Slider ─── */}
          <Animated.View
            entering={FadeInDown.delay(80).duration(400)}
            style={styles.section}
          >
            <ItchSlider
              value={itchLevel}
              onValueChange={setItchLevel}
            />
          </Animated.View>

          {/* ─── Body Parts ─── */}
          <Animated.View
            entering={FadeInDown.delay(160).duration(400)}
            style={styles.section}
          >
            <Text style={styles.sectionLabel}>
              Where is it most visible?
            </Text>
            <View style={styles.chipWrap}>
              {allBodyParts.map((part) => {
                const active = selectedParts.includes(part);
                return (
                  <TouchableOpacity
                    key={part}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => togglePart(part)}
                    onLongPress={() => handleDeletePart(part)}
                    delayLongPress={500}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        active && styles.chipTextActive,
                      ]}
                    >
                      {part}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={styles.chipDashed}
                activeOpacity={0.7}
                onPress={() => setIsAddingPart(true)}
              >
                <Ionicons name="add" size={14} color="#6B7280" />
                <Text style={styles.chipDashedText}>Other</Text>
              </TouchableOpacity>
            </View>
            {customBodyParts.length > 0 && (
              <Text style={styles.hintText}>(Long press custom items to remove)</Text>
            )}
          </Animated.View>

          {/* ─── Skin Signs ─── */}
          <Animated.View
            entering={FadeInDown.delay(240).duration(400)}
            style={styles.section}
          >
            <Text style={styles.sectionLabel}>Skin Signs</Text>
            <View style={styles.signsGrid}>
              {allSkinSigns.map((sign) => {
                const selected = selectedSkinSigns.includes(sign);
                return (
                <TouchableOpacity
                  key={sign}
                  style={[
                    styles.signCard,
                    selected && styles.signCardActive,
                  ]}
                  onPress={() => toggleSkinSign(sign)}
                  onLongPress={() => handleDeleteSkinSign(sign)}
                  delayLongPress={500}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.signCheck,
                      selected && styles.signCheckActive,
                    ]}
                  >
                    {selected && (
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={BrandColors.background}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.signText,
                      selected && styles.signTextActive,
                    ]}
                  >
                    {sign}
                  </Text>
                </TouchableOpacity>
                );
              })}
               <TouchableOpacity
                  style={[styles.signCard, { borderStyle: 'dashed', justifyContent: 'center' }]}
                  onPress={() => setIsAddingSkinSign(true)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={20} color="#6B7280" />
                  <Text style={styles.signText}>Other</Text>
                </TouchableOpacity>
            </View>
            {customSkinSigns.length > 0 && (
              <Text style={styles.hintText}>(Long press custom items to remove)</Text>
            )}
          </Animated.View>

          {/* ─── Exposures ─── */}
          <Animated.View
            entering={FadeInDown.delay(320).duration(400)}
            style={styles.section}
          >
            <Text style={styles.sectionLabel}>Exposures today</Text>
            <View style={styles.exposureRow}>
              {allExposures.map((exp) => {
                const selected = selectedExposures.includes(exp.label);
                return (
                <TouchableOpacity
                  key={exp.label}
                  style={styles.exposureItem}
                  onPress={() => toggleExposure(exp.label)}
                  onLongPress={() => handleDeleteExposure(exp.label)}
                  delayLongPress={500}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.exposureIcon,
                      selected && styles.exposureIconActive,
                    ]}
                  >
                    {'icon' in exp ? (
                      <MaterialIcons
                        name={exp.icon as any}
                        size={24}
                        color={selected ? BrandColors.background : '#6B7280'}
                      />
                    ) : (
                      <Text style={{ fontSize: 24 }}>{(exp as any).emoji}</Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.exposureLabel,
                      selected && styles.exposureLabelActive,
                    ]}
                  >
                    {exp.label}
                  </Text>
                </TouchableOpacity>
                );
              })}
               <TouchableOpacity
                  style={styles.exposureItem}
                  onPress={() => setIsAddingExposure(true)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.exposureIcon, { borderStyle: 'dashed' }]}>
                     <Ionicons name="add" size={24} color="#6B7280" />
                  </View>
                  <Text style={styles.exposureLabel}>Other</Text>
                </TouchableOpacity>
            </View>
            {customExposures.length > 0 && (
              <Text style={styles.hintText}>(Long press custom items to remove)</Text>
            )}
          </Animated.View>

          {/* ─── Notes & Media (New) ─── */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(400)}
            style={styles.section}
          >
            <Text style={styles.sectionLabel}>Notes & Media</Text>

            <View style={styles.noteContainer}>
              <TextInput
                style={styles.noteInput}
                placeholder="Add notes about behavior, food, etc..."
                placeholderTextColor="#6B7280"
                multiline
                value={noteText}
                onChangeText={setNoteText}
                maxLength={200}
              />
              {/* Audio Recorder Button */}
              <TouchableOpacity
                style={[
                  styles.audioBtn,
                  isRecording && styles.audioBtnRecording,
                ]}
                onPress={handleToggleRecording}
              >
                <Ionicons
                  name={isRecording ? 'stop' : 'mic'}
                  size={20}
                  color={isRecording ? '#FFFFFF' : BrandColors.primary}
                />
              </TouchableOpacity>
            </View>
            {isRecording && (
              <Text
                style={{
                  color: BrandColors.primary,
                  fontSize: 12,
                  marginTop: 4,
                  marginLeft: 4,
                }}
              >
                Listening...
              </Text>
            )}

            {/* Media Buttons */}
            <View style={styles.mediaRow}>
              {/* Photo Button */}
              {imageUri ? (
                <View style={styles.mediaPreview}>
                   <Image source={{ uri: imageUri }} style={styles.mediaPreviewImage} contentFit="cover" />
                   <TouchableOpacity style={styles.mediaRemoveBtn} onPress={() => setImageUri(null)}>
                     <Ionicons name="close" size={12} color="#FFF" />
                   </TouchableOpacity>
                   <Text style={styles.mediaPreviewText}>Photo</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.mediaBtn}
                  onPress={() => handleCamera('photo')}
                >
                  <Ionicons name="image" size={20} color="#9CA3AF" />
                  <Text style={styles.mediaBtnText}>Add Photo</Text>
                </TouchableOpacity>
              )}

              {/* Video Button */}
              {videoUri ? (
                 <View style={styles.mediaPreview}>
                   <View style={styles.mediaPreviewVideoFallback} />
                   <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                      <Ionicons name="play" size={24} color="#FFF" />
                   </View>
                   <TouchableOpacity style={styles.mediaRemoveBtn} onPress={() => setVideoUri(null)}>
                     <Ionicons name="close" size={12} color="#FFF" />
                   </TouchableOpacity>
                   <Text style={styles.mediaPreviewText}>Video</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.mediaBtn}
                  onPress={() => handleCamera('video')}
                >
                  <Ionicons name="videocam" size={20} color="#9CA3AF" />
                  <Text style={styles.mediaBtnText}>Add Video</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ─── Footer CTAs ─── */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Check-in</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Part Modal */}
      <Modal
        visible={isAddingPart}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddingPart(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Body Part</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Chin, Left Paw..."
              placeholderTextColor="#6B7280"
              value={newPartName}
              onChangeText={setNewPartName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setIsAddingPart(false)}
                style={styles.modalBtnCancel}
              >
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddCustomPart}
                style={styles.modalBtnSave}
              >
                <Text style={styles.modalBtnTextSave}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Custom Skin Sign Modal */}
      <Modal
        visible={isAddingSkinSign}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddingSkinSign(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Skin Sign</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Dryness..."
              placeholderTextColor="#6B7280"
              value={newSkinSign}
              onChangeText={setNewSkinSign}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsAddingSkinSign(false)} style={styles.modalBtnCancel}>
                 <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCustomSkinSign} style={styles.modalBtnSave}>
                 <Text style={styles.modalBtnTextSave}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Custom Exposure Modal */}
      <Modal
        visible={isAddingExposure}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAddingExposure(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Exposure</Text>
            <View style={{ gap: 12, marginBottom: 20 }}>
              <TextInput
                style={[styles.modalInput, { marginBottom: 0 }]}
                placeholder="Name (e.g. Beach)"
                placeholderTextColor="#6B7280"
                value={newExposureLabel}
                onChangeText={setNewExposureLabel}
                autoFocus
              />
               
               <Text style={{color:'#D1D5DB', fontSize:14, fontWeight:'600', marginTop:8, marginBottom:8}}>Icon</Text>
               <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16}}>
                  {COMMON_EXPOSURE_ICONS.map(emoji => (
                    <TouchableOpacity 
                      key={emoji}
                      onPress={() => setNewExposureEmoji(emoji)}
                      style={{
                        width: 36, height: 36, 
                        borderRadius: 18, 
                        backgroundColor: newExposureEmoji === emoji ? BrandColors.primary : '#374151',
                        justifyContent: 'center', alignItems: 'center'
                      }}
                    >
                      <Text style={{fontSize: 20}}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
               </View>

               <TextInput
                style={[styles.modalInput, { marginBottom: 0 }]}
                placeholder="Or type custom emoji..."
                placeholderTextColor="#6B7280"
                value={newExposureEmoji}
                onChangeText={setNewExposureEmoji}
                maxLength={6}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsAddingExposure(false)} style={styles.modalBtnCancel}>
                 <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCustomExposure} style={styles.modalBtnSave}>
                 <Text style={styles.modalBtnTextSave}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BrandColors.background },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  headerDate: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  section: { marginBottom: 28 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
    marginBottom: 14,
  },
  hintText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },

  /* ─── Itch Slider ─── */
  itchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  itchValueWrap: { flexDirection: 'row', alignItems: 'baseline' },
  itchValue: {
    fontSize: 28,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  itchMax: { fontSize: 14, color: '#6B7280', marginLeft: 2 },

  sliderTrack: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 4,
  },
  trackBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1F2937',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: BrandColors.primary,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginLeft: -12,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(31,41,55,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 8,
  },
  stepperLabel: { fontSize: 11, color: '#4B5563', fontWeight: '500' },
  stepperActive: { color: '#9CA3AF' },

  /* ─── Body Chips ─── */
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  chipText: { fontSize: 13, fontWeight: '500', color: '#9CA3AF' },
  chipTextActive: {
    color: BrandColors.background,
    fontWeight: '600',
  },
  chipDashed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
    borderStyle: 'dashed',
  },
  chipDashedText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* ─── Skin Signs ─── */
  signsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  signCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    backgroundColor: 'rgba(17,24,39,0.6)',
  },
  signCardActive: {
    borderColor: 'rgba(45,212,191,0.4)',
    backgroundColor: 'rgba(45,212,191,0.08)',
  },
  signCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signCheckActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  signText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  signTextActive: { color: '#FFFFFF' },

  /* ─── Exposures ─── */
  exposureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  exposureItem: { alignItems: 'center', gap: 8 },
  exposureIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exposureIconActive: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  exposureLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
  },
  exposureLabelActive: { color: BrandColors.primary },

  /* ─── Notes & Media ─── */
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
  },
  noteInput: {
    flex: 1,
    minHeight: 80,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  audioBtn: {
    padding: 10,
  },
  audioBtnRecording: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    margin: 4,
  },
  audioPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(45,212,191,0.1)',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  audioText: { color: BrandColors.primary, fontSize: 13, flex: 1 },

  mediaRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  mediaBtn: {
    flex: 1,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(55,65,81,0.6)',
    backgroundColor: '#1F2937',
  },
  mediaBtnActive: {
    borderColor: BrandColors.primary,
    backgroundColor: 'rgba(45,212,191,0.1)',
  },
  mediaBtnText: { color: '#9CA3AF', fontSize: 13, fontWeight: '600' },

  mediaPreview: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  mediaPreviewImage: {
    width: '100%',
    height: '100%',
  },
  mediaPreviewVideoFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111827',
  },
  mediaPreviewText: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
  mediaRemoveBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  /* ─── Footer ─── */
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
  saveBtn: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 20,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.background,
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.25)',
  },
  photoBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: BrandColors.primary,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalBtnCancel: { padding: 12 },
  modalBtnTextCancel: { color: '#9CA3AF', fontWeight: '600' },
  modalBtnSave: {
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalBtnTextSave: {
    color: BrandColors.background,
    fontWeight: '700',
  },
});
