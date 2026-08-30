import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ItemCardProps {
  item: {
    id: string;
    name: string;
    category: string;
    image: string;
    collected: boolean;
  };
  onToggleCollect: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onToggleCollect }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onToggleCollect(item.id)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={item.collected ? styles.collectedText : styles.uncollectedText}>
          {item.collected ? 'Collected' : 'Collect'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collectedText: {
    color: 'green',
  },
  uncollectedText: {
    color: 'orange',
  },
});

export default ItemCard;