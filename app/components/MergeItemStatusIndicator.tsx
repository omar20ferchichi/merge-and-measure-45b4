import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MergeItemStatusIndicatorProps {
  status: 'available' | 'merged' | 'locked';
  itemLabel: string;
}

const MergeItemStatusIndicator: React.FC<MergeItemStatusIndicatorProps> = ({ status, itemLabel }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'available':
        return '#2E7D32'; // Green
      case 'merged':
        return '#1E88E5'; // Blue
      case 'locked':
        return '#D32F2F'; // Red
      default:
        return '#000000';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'available':
        return 'checkmark-circle-outline';
      case 'merged':
        return 'checkmark-circle';
      case 'locked':
        return 'lock-open-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getStatusIcon()}
          size={24}
          color={getStatusColor()}
        />
      </View>
      <Text style={styles.label}>{itemLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 4,
  },
  iconContainer: {
    paddingRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
});

export default MergeItemStatusIndicator;