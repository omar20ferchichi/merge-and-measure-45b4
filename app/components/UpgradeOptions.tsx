import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UpgradeOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  cost: number;
  onPress: () => void;
}

const UpgradeOptions: React.FC<{ options: UpgradeOption[] }> = ({ options }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionCard}
          onPress={option.onPress}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={option.icon} size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.description}>{option.description}</Text>
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.costText}>Cost: {option.cost} coins</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555555',
  },
  costContainer: {
    marginLeft: 16,
  },
  costText: {
    fontSize: 14,
    color: '#888888',
  },
});

export default UpgradeOptions;