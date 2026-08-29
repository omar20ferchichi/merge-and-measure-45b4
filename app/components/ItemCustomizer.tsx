import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomizationOption {
  id: string;
  label: string;
  icon: string;
  value: string;
}

interface ItemCustomizerProps {
  item: any;
  onCustomize: (customization: any) => void;
}

const ItemCustomizer: React.FC<ItemCustomizerProps> = ({ item, onCustomize }) => {
  const [selectedColor, setSelectedColor] = useState<string>(item.color || '#FF6B6B');
  const [selectedShape, setSelectedShape] = useState<string>(item.shape || 'circle');
  const [selectedPattern, setSelectedPattern] = useState<string>(item.pattern || 'solid');

  const colorOptions: CustomizationOption[] = [
    { id: 'red', label: 'Red', icon: 'md-color-fill', value: '#FF6B6B' },
    { id: 'blue', label: 'Blue', icon: 'md-color-fill', value: '#4ECDC4' },
    { id: 'yellow', label: 'Yellow', icon: 'md-color-fill', value: '#45B7D1' },
    { id: 'green', label: 'Green', icon: 'md-color-fill', value: '#96CEB4' },
    { id: 'purple', label: 'Purple', icon: 'md-color-fill', value: '#FFEEAD' }
  ];

  const shapeOptions: CustomizationOption[] = [
    { id: 'circle', label: 'Circle', icon: 'md-circle', value: 'circle' },
    { id: 'square', label: 'Square', icon: 'md-square', value: 'square' },
    { id: 'triangle', label: 'Triangle', icon: 'md-triangle', value: 'triangle' },
    { id: 'star', label: 'Star', icon: 'md-star', value: 'star' }
  ];

  const patternOptions: CustomizationOption[] = [
    { id: 'solid', label: 'Solid', icon: 'md-checkmark', value: 'solid' },
    { id: 'striped', label: 'Striped', icon: 'md-ellipse', value: 'striped' },
    { id: 'dotted', label: 'Dotted', icon: 'md-dots', value: 'dotted' }
  ];

  const applyCustomization = () => {
    const customization = {
      color: selectedColor,
      shape: selectedShape,
      pattern: selectedPattern
    };
    onCustomize(customization);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customize Your Merge Item</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.optionGrid}>
          {colorOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedColor(option.value)}
              style={selectedColor === option.value ? styles.selectedOption : styles.option}
            >
              <View style={styles.colorCircle}>
                <View style={{ width: '100%', height: '100%', backgroundColor: option.value }} />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shape</Text>
        <View style={styles.optionGrid}>
          {shapeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedShape(option.value)}
              style={selectedShape === option.value ? styles.selectedOption : styles.option}
            >
              <View style={styles.shapeIcon}>
                <Ionicons name={option.icon} size={24} color='black' />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pattern</Text>
        <View style={styles.optionGrid}>
          {patternOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedPattern(option.value)}
              style={selectedPattern === option.value ? styles.selectedOption : styles.option}
            >
              <View style={styles.patternIcon}>
                <Ionicons name={option.icon} size={24} color='black' />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.applyButton} onPress={applyCustomization}>
        <Text style={styles.buttonText}>Apply Customization</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 8,
    padding: 8,
    elevation: 2,
  },
  selectedOption: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B2EBF2',
    margin: 8,
    padding: 8,
    elevation: 4,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shapeIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  patternIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ItemCustomizer;