import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MergeItem } from './MergeItem';
import { useMergeContext } from '../../context/MergeContext';

interface MergeGroupProps {
  items: string[];
  groupId: string;
  onMerge: (groupId: string) => void;
  onDragStart: (groupId: string) => void;
  onDragEnd: (groupId: string) => void;
}

export const MergeGroup: React.FC<MergeGroupProps> = ({ items, groupId, onMerge, onDragStart, onDragEnd }) => {
  const { mergeItems, setMergeItems } = useMergeContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeAnimation] = useState(new Animated.Value(0));
  const groupRef = useRef<HTMLDivElement>(null);

  const handleMerge = () => {
    setIsMerging(true);
    Animated.timing(mergeAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      onMerge(groupId);
      setIsMerging(false);
    });
  };

  const handleDragStart = () => {
    onDragStart(groupId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    onNoneDragged();
    onDragEnd(groupId);
    setIsDragging(false);
  };

  const handleNoneDragged = () => {
    setIsDragging(false);
  };

  return (
    <View style={styles.groupContainer}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupLabel}>Group {groupId}</Text>
      </View>
      <View style={styles.groupItems}>
        {items.map((item, index) => (
          <MergeItem
            key={item}
            item={item}
            groupId={groupId}
            index={index}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onNoneDragged={handleNoneDragged}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.mergeButton}
        onPress={handleMerge}
        disabled={isMerging || isDragging}
      >
        <Text style={styles.mergeButtonText}>Merge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mergeButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  mergeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});