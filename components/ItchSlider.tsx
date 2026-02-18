import React, { useState } from 'react';
import { StyleSheet, Text, View, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ItchSliderProps {
  value: number;
  onValueChange: (val: number) => void;
}

export default function ItchSlider({ value, onValueChange }: ItchSliderProps) {
  const [width, setWidth] = useState(0);
  const position = useSharedValue(0);
  
  // Sync shared value with prop when width is known or value changes externally
  // Note: For smoother bidirectional sync, more complex logic might be needed, 
  // but for this simple case, we'll rely on the gesture updating the parent.
  // We use a useEffect/useDerivedValue equivalent logic if needed, but 
  // strictly updating position based on props requires care to not fight the gesture.
  // Here we'll just set it initially or when layout changes.
  
  React.useEffect(() => {
    if (width > 0) {
      position.value = withSpring((value / 10) * width, { damping: 20, stiffness: 200 });
    }
  }, [value, width]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      position.value = Math.min(Math.max(g.x, 0), width);
    })
    .onUpdate((g) => {
      let newX = g.x;
      // Clamp
      if (newX < 0) newX = 0;
      if (newX > width) newX = width;
      position.value = newX;
      
      const distinct = Math.round((newX / width) * 10);
      runOnJS(onValueChange)(distinct);
    });

  const tap = Gesture.Tap()
    .onEnd((g) => {
       const newX = Math.min(Math.max(g.x, 0), width);
       position.value = withSpring(newX);
       const distinct = Math.round((newX / width) * 10);
       runOnJS(onValueChange)(distinct);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    width: position.value,
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.label}>Itch Level</Text>
        <View style={styles.valueWrap}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.max}>/10</Text>
        </View>
      </View>

      <GestureDetector gesture={Gesture.Race(pan, tap)}>
        <View style={styles.trackContainer} onLayout={onLayout}>
          {/* Background Track */}
          <View style={styles.trackBg} />
          
          {/* Filled Track */}
          <Animated.View style={[styles.trackFill, trackAnimatedStyle]} />
          
          {/* Thumb */}
          <Animated.View style={[styles.thumb, animatedStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </View>
      </GestureDetector>

      <View style={styles.labels}>
        <Text style={[styles.labelText, value <= 3 && styles.activeText]}>Comfortable</Text>
        <Text style={[styles.labelText, value > 3 && value <= 6 && styles.activeText]}>Moderate</Text>
        <Text style={[styles.labelText, value > 6 && styles.activeText]}>Severe</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
  },
  valueWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  max: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  trackContainer: {
    height: 40,
    justifyContent: 'center',
    width: '100%',
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
  thumb: {
    position: 'absolute',
    left: -12, // Half width to center
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  labelText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
  activeText: {
    color: '#9CA3AF',
    fontWeight: '700',
  },
});
