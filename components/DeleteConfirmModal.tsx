import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

const DESTRUCTIVE = '#EF4444';

export type DeleteConfirmVariant = 'check-in' | 'photo' | 'pet-profile';

interface DeleteConfirmModalProps {
  visible: boolean;
  variant: DeleteConfirmVariant;
  onDelete: () => void;
  onCancel: () => void;
}

const VARIANT_CONFIG: Record<DeleteConfirmVariant, { title: string; description: string }> = {
  'check-in': {
    title: 'Delete Check-in',
    description: "Delete this check-in? This can't be undone.",
  },
  'photo': {
    title: 'Delete Photo',
    description:
      'Delete this photo? This will remove it from your timeline permanently. This action cannot be undone.',
  },
  'pet-profile': {
    title: 'Delete Pet Profile',
    description:
      'Delete this pet? All history and data for this pet will be lost forever.',
  },
};

export default function DeleteConfirmModal({
  visible,
  variant,
  onDelete,
  onCancel,
}: DeleteConfirmModalProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <Animated.View
              entering={SlideInDown.duration(350).springify().damping(18)}
              style={styles.card}
            >
              {/* Drag handle */}
              <View style={styles.handle} />

              {/* Content */}
              <View style={styles.content}>
                {/* Icon */}
                <View style={styles.iconCircle}>
                  <Ionicons name="trash" size={28} color={DESTRUCTIVE} />
                </View>

                <Text style={styles.title}>{config.title}</Text>
                <Text style={styles.description}>{config.description}</Text>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={onDelete}
                  activeOpacity={0.85}
                >
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={onCancel}
                  activeOpacity={0.85}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom accent line */}
              <View style={styles.accentLine} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(11,15,20,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: BrandColors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 12,
  },
  content: {
    padding: 32,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239,68,68,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  deleteBtn: {
    height: 56,
    borderRadius: 999,
    backgroundColor: DESTRUCTIVE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelBtn: {
    height: 56,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(45,212,191,0.3)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  accentLine: {
    height: 4,
    backgroundColor: 'rgba(45,212,191,0.15)',
  },
});
