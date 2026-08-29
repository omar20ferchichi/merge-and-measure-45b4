import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { mergeItem } from '../../services/gameService';
import { useMergeContext } from '../../context/MergeContext';

interface MergeItemProps {
  id: string;
  name: string;
  value: number;
  imageUrl: string;
  selected?: boolean;
}

const MergeItem: React.FC<MergeItemProps> = ({ id, name, value, imageUrl, selected = false }) => {
  const { selectedItems, setSelectedItems, onMerge } = useMergeContext();
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    setSelectedItems(prev => {
      const newItems = [...prev];
      const itemIndex = newItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems.push({ id, name, value });
      }
      return new
    });
  };

  const handleMerge = () => {
    onMerge(id);
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={toggleSelection}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.value}>Value: {value}</Text>
      </View>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.mergeButton}
        onPress={handleMerge}
        disabled={!isSelected}
      >
        <Text style={styles.mergeButtonText}>Merge</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
  selectedIndicator: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mergeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  mergeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MergeItem;