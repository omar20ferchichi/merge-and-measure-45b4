import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GameProvider from './app/context/GameContext';
import { InventoryProvider } from './app/context/InventoryContext';
import { MergeProvider } from './app/context/MergeContext';
import MergeScreen from './app/components/MergeScreen';
import InventoryScreen from './app/components/InventoryScreen';

type Tab = 'merge' | 'inventory';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('merge');

  return (
    <GameProvider>
      <MergeProvider>
        <InventoryProvider>
          <SafeAreaView style={styles.container}>
            <View style={styles.screen}>
              {activeTab === 'merge' ? <MergeScreen /> : <InventoryScreen />}
            </View>
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'merge' && styles.tabButtonActive]}
                onPress={() => setActiveTab('merge')}
              >
                <Text style={[styles.tabLabel, activeTab === 'merge' && styles.tabLabelActive]}>Merge</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'inventory' && styles.tabButtonActive]}
                onPress={() => setActiveTab('inventory')}
              >
                <Text style={[styles.tabLabel, activeTab === 'inventory' && styles.tabLabelActive]}>Inventory</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </SafeAreaView>
        </InventoryProvider>
      </MergeProvider>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  screen: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderTopWidth: 2,
    borderTopColor: '#4caf50',
  },
  tabLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#4caf50',
  },
});
