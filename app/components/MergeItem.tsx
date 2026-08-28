import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MergeItemProps {
  item: { id: string; name: string; value: number; isMerged: boolean; }
  onMerge: (itemId: string) => void;
  onUnmerge: (itemId: string) => void;
}

const MergeItem: React.FC<MergeItemProps> = ({ item, onMerge, onUnmerge }) => {
  const [isMerged, setIsMerged] = useState(item.isMerged);
  const [mergeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    setIsMerged(item.isMerged);
  }, [item.isMerged]);

  const handleMerge = () => {
    Animated.sequence([
      Animated.timing(mergeAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(mergeAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start(() => {
      onMerge(item.id);
    });
  };

  const handleUnmerge = () => {
    Animated.sequence([
      Animated.timing(mergeAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(mergeAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start(() => {
      onUnmerge(item.id);
    });
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={isMerged ? handleUnmerge : handleMerge}
      >
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.valueText}>{item.value}</Text>
        <Animated.View style={{ opacity: mergeAnimation }}>
          <Ionicons name={isMerged ? 'checkmark' : 'arrow-forward'} size={24} color="green" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MergeItem;