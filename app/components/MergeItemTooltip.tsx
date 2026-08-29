import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MergeItemTooltipProps {
  item: {
    id: string;
    name: string;
    description: string;
    mergeValue: number;
  };
  onHover: (isHovered: boolean) => void;
}

const MergeItemTooltip: React.FC<MergeItemTooltipProps> = ({ item, onHover }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (showTooltip) {
      Animated.timing(tooltipOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  }, [showTooltip]);

  const handlePressIn = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setTooltipPosition({ x: pageX, y: pageY });
    setShowTooltip(true);
    onHover(true);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
    onHover(false);
  };

  return (
    <TouchableOpacity
      style={styles.tooltipContainer}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.tooltipContent}>
        <Text style={styles.tooltipText}>{item.name}</Text>
        <Text style={styles.tooltipDescription}>{item.description}</Text>
        <Text style={styles.tooltipValue}>Merge Value: {item.mergeValue}</Text>
        <TouchableOpacity style={styles.tooltipCloseButton} onPress={handlePressOut}>
          <Ionicons name="close-circle-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.tooltipOverlay,
          { opacity: tooltipOpacity },
          { transform: [{ translateX: tooltipPosition.x }, { translateY: tooltipPosition.y }] }
        ]}
      >
        <View style={styles.tooltipBox}>
          <Text style={styles.tooltipText}>{item.name}</Text>
          <Text style={styles.tooltipDescription}>{item.description}</Text>
          <Text style={styles.tooltipValue}>Merge Value: {item.mergeValue}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
  },
  tooltipContent: {
    position: 'absolute',
    zIndex: 10,
    width: 120,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  tooltipText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tooltipDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  tooltipValue: {
    fontSize: 14,
    color: 'blue',
  },
  tooltipCloseButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tooltipOverlay: {
    position: 'absolute',
    width: 120,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  tooltipBox: {
    width: 120,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MergeItemTooltip;