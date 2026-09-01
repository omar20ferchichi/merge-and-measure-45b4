import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMergeContext } from '../context/MergeContext';
import { useNavigation } from '@react-navigation/native';

const CollectRewardsModal = () => {
  const { collectedItems, collectItem, isLoading } = useMergeContext();
  const navigation = useNavigation();
  const [showAchievements, setShowAchievements] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => collectItem(item.id)}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Ionicons name="checkmark-circle-outline" size={24} color="green" />
    </TouchableOpacity>
  );

  const renderAchievement = ({ item }) => (
    <View style={styles.achievementItem}>
      <Text style={styles.achievementText}>{item.name}</Text>
      <Text style={styles.achievementDesc}>{item.description}</Text>
    </View>
  );

  return (
    <Modal visible={collectedItems.length > 0} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Collect Rewards</Text>
          <TouchableOpacity onPress={() => setShowAchievements(!showAchievements)}>
            <Text style={styles.achievementBtn}>View Achievements</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={collectedItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        {showAchievements && (
          <FlatList
            data={useMergeContext().achievements}
            renderItem={renderAchievement}
            keyExtractor={item => item.id}
            style={styles.achievementList}
          />
        )}
        <TouchableOpacity style={styles.confirmBtn} onPress={() => navigation.navigate('MergeScreen')}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  achievementBtn: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  list: {
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  achievementList: {
    width: '100%',
    maxHeight: 300,
  },
  achievementItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementDesc: {
    fontSize: 14,
    color: 'gray',
  },
  confirmBtn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 18,
  },
  loader: {
    marginTop: 20,
  },
});

export default CollectRewardsModal;