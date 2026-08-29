import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ItemTradeOptionsProps {
  onTrade: () => void;
  onExchange: () => void;
  onCancel: () => void;
}

const ItemTradeOptions: React.FC<ItemTradeOptionsProps> = ({ onTrade, onExchange, onCancel }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={onTrade}>
        <Text style={styles.optionText}>Trade Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={onExchange}>
        <Text style={styles.optionText}>Exchange Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={onCancel}>
        <Text style={styles.option, { color: '#888' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  option: {
    marginVertical: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemTradeOptions;