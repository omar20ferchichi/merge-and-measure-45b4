import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useMergeContext } from '../context/MergeContext';

interface MergeItemProps {
  id: string;
  value: number;
  onMerge: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string) => void;
}

const MergeItem: React.FC<MergeItemProps> = ({ id, value, onMerge, onDragStart, onDragEnd }) => {
  const { selectedItems, setSelectedItems, mergedItems, setMergedItems } = useMergeContext();
  const [isDragging, setIsDragging] = useState(false);
  const [scale] = useState(new Animated.Value(1));
  const dragRef = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    const handleDragStart = () => {
      setIsDragging(true);
      onDragStart(id);
      Animated.timing(dragRef.current, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      onDragEnd(id);
      Animated.timing(dragRef.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    };

    return () => {
      Animated.timing(dragRef.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    };
  }, [id, onDragStart, onDragEnd]);

  const handlePress = () => {
    if (isDragging) return;
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleMerge = () => {
    if (selectedItems.length >= 2) {
      const mergedValue = selectedItems.reduce((sum, itemId) => sum + mergedItems[itemId], 0);
      setMergedItems(prev => ({
        ...prev,
        [id]: mergedValue
      }));
      setSelectedItems([]);
      onMerge(id);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.itemContainer}
    >
      <Animated.View style={{ transform: [{ translateY: dragRef.current }] }}>
        <View style={styles.itemCard}>
          <Text style={styles.itemValue}>{value}</Text>
        </View>
      </Animated.View>
      {selectedItems.includes(id) && (
        <TouchableOpacity
          onPress={handleMerge}
          style={styles.mergeButton}
        >
          <Text style={styles.mergeButtonText}>Merge</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 80,
    height: 80,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 2,
  },
  itemCard: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  itemValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mergeButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',,
    height: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  mergeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default MergeItem;