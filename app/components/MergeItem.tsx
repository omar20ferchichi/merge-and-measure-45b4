import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MergeItemProps {
  id: string;
  value: number;
  onMerge: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string) => void;
  isMerging: boolean;
  mergeTarget: number;
  mergeProgress: number;
}

const MergeItem: React.FC<MergeItemProps> = ({
  id,
  value,
  onMerge,
  onDragStart,
  onDragEnd,
  isMerging,
  mergeTarget,
  mergeProgress,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isMerging) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 10,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMerging]);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          transform: [
            { scale },
            { translateX },
            { translateY },
          ],
          opacity,
        },
      ]}
    >
      <View style={styles.itemContent}>
        <Ionicons
          name="rocket"
          size={32}
          color="blue"
        />
        <View style={styles.itemValueContainer}>
          <Text style={styles.itemValue}>{value}</Text>
          <Text style={styles.itemTarget}>{mergeTarget}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemValueContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemTarget: {
    fontSize: 14,
    color: '#666',
  },
});

export default MergeItem;