import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mergeItem } from '../services/mergeService';

const { width } = Dimensions.get('window');

interface MergeItemProps {
  item: { 
    id: string;
    type: string;
    value: number;
    image: string;
    position: { x: number; y: number };
    onMerge: (id: string) => void;
  };
}

const MergeItem: React.FC<MergeItemProps> = ({ item, onMerge }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMerged, setIsMerged] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 }));

  const handlePress = () => {
    setIsDragging(true);
    dragPosition.current.setValue({ x: item.position.x, y: item.position.y });
  };

  const handleMove = (event: any) => {
    if (!isDragging) return;
    const { touchX, touchY } = event.nativeEvent;
    const newX = touchX - item.position.x;
    const newY = touchY - item.position.y;
    setDragOffset({ x: newX, y: newY });
    dragPosition.current.setValue({ x: newX,  y: newY });
  };

  const handleRelease = () => {
    setIsDragging(false);
    setIsMerged(true);
    onMerge(item.id);
  };

  useEffect(() => {
    const subscription = dragPosition.current.addListener(({ value }) => {
      if (isDragging) {
        setDragOffset({ x: value.x, y: value.y });
      }
    });
    return () => subscription.remove();
  }, [isDragging]);

  return (
    <Animated.View
      style={[styles.itemContainer, {
        transform: dragPosition.current.getTranslateTransform(),
      }]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onMoveShouldSetResponder={() => isDragging}
        onMove={handleMove}
        onRelease={handleRelease}
      >
        <View style={styles.itemCard}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemValue}>{item.value}</Text>
          <Text style={styles.itemType}>{item.type}</Text>
          <Ionicons name="ios-arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  itemCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  itemType: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
});

export default MergeItem;