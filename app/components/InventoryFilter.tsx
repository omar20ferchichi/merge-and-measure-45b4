import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterOption {
  id: string;
  label: string;
}

const InventoryFilter: React.FC<{ 
  filters: FilterOption[];
  onFilterChange: (filterId: string) => void;
}> = ({ filters, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Filter Items</Text>
      <View style={styles.filterOptionsContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={styles.filterOption}
            onPress={() => handleFilterSelect(filter.id)}
          >
            <Text style={styles.filterOptionLabel}>{filter.label}</Text>
            {selectedFilter === filter.id && (
              <Ionicons name="checkmark-circle-outline" size={20} color="green" />
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => handleFilterSelect('all')}
        >
          <Text style={styles.filterOptionLabel}>All Items</Text>
          {selectedFilter === 'all' && (
            <Ionicons name="checkmark-circle-outline" size={20} color="green" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterOption: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  filterOptionLabel: {
    fontSize: 14,
  },
});

export default InventoryFilter;