import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { currencyOptions } from '../../assets/currencyOptions';
import { useCurrencyStore } from '../../services/currencyStore';

const PurchaseCurrencyOptions: React.FC = () => {
  const { purchaseCurrency } = useCurrencyStore();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handlePurchase = (amount: number, price: number) => {
    if (selectedOption !== null) {
      purchaseCurrency(amount, price);
      setSelectedOption(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase In-Game Currency</Text>
      <FlatList
        data={currencyOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => setSelectedOption(item.id)}
          >
            <View style={styles.rowContainer}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.optionText}>{item.name}</Text>
            </View>
            <Text style={styles.priceText}>Price: {item.price} coins</Text>
            {selectedOption === item.id && (
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => handlePurchase(item.amount, item.price)}
              >
                <Text style={styles.purchaseButtonText}>Purchase</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  purchaseButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PurchaseCurrencyOptions;