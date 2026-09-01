import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MergeItem } from './MergeItem';
import { useMergeContext } from '../context/MergeContext';

const { width } = Dimensions.get('window');

const MergeGroup: React.FC = () => {
  const { mergeItems, onMerge, onMergeComplete } = useMergeContext();
  const [isGrouping, setIsGrouping] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [groupAnimation] = useState(new Animated.Value(0));
  const groupRef = useRef<View>(null);

  const handleMerge = useCallback(() => {
    if (selectedItems.length < 2) return;

    // Validate merge logic (e.g., same type, quantity)
    const selectedItemTypes = mergeItems.filter(item => selectedItems.includes(item.id)).map(item => item.type);
    const isSameType = selectedItemTypes.every(type => type === selectedItemTypes[0]);

    if (!isSameType) {
      alert('Cannot merge different item types');
      return;
    }

    // Perform merge
    onMerge(selectedItems);
    setSelectedItems([]);
    setIsGrouping(false);

    // Trigger merge complete
    onMergeComplete();
  }, [selectedItems, mergeItems, onMerge, onMergeComplete]);

  const handleSelectItem = useCallback((itemId: number) => {
    if (isGrouping) {
      setSelectedItems(prev => {
        if (prev.includes(itemId)) {
          return prev.filter(id => id !== itemId);
        } else {
          return [...prev, itemId];
        }
      });
    }
  }, [isGrouping]);

  const handleStartGrouping = useCallback(() => {
    if (mergeItems.length < 2) return;
    setIsGrouping(true);
    setSelectedItems([]);
  }, [merge, mergeItems]);

  const handleCancelGrouping = useCallback(() => {
    setIsGrouping(false);
    setSelectedItems([]);
  }, []);

  useEffect(() => {
    if (isGrouping) {
      Animated.timing(groupAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(groupAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isGrouping]);

  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <TouchableOpacity onPress={handleStartGrouping} style={styles.groupButton}>
          <Text style={styles.groupButtonText}>Group Items</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mergeArea}>
        {mergeItems.map(item => (
          <MergeItem
            key={item.id}
            item={item}
            onSelect={handleSelectItem}
            isSelected={selectedItems.includes(item.id)}
          />
        ))}
      </View>
      {isGrouping && (
        <View style={styles.groupOverlay}>
          <View style={styles.groupSelections}>
            {selectedItems.map(id => (
              <MergeItem
                key={id}
                item={mergeItems.find(item => item.id === id)!}
                onSelect={handleSelectItem}
                isSelected={selectedItems.includes(id)}
                isGrouped
              />
            ))}
          </View>
          <TouchableOpacity onPress={handleMerge} style={styles.mergeButton}>
            <Text style={styles.mergeButtonText}>Merge Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelGrouping} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  groupContainer: {
    width: width - 40,
    height: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  groupButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mergeArea: {
    width: width - 40,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  groupOverlay: {
    position: 'absolute',
    width: width - 40,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  groupSelections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mergeButton: {
    width: 150,
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  mergeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 150,
    height: 50,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { MergeGroup };