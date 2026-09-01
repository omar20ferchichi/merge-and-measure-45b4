export interface MergeableItem {
  id: string;
  value: number;
}

let mockItems: MergeableItem[] = [
  { id: '1', value: 2 },
  { id: '2', value: 2 },
  { id: '3', value: 4 },
  { id: '4', value: 4 },
  { id: '5', value: 8 },
  { id: '6', value: 8 },
];

// Mock function to simulate fetching the player's current merge board.
export const getMergeItems = async (): Promise<MergeableItem[]> => {
  return mockItems;
};

// Mock function to simulate merging an item into the next tier.
export const mergeItems = async (itemId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  mockItems = mockItems.filter(item => item.id !== itemId);
};

// Mock function to simulate resetting the merge board.
export const resetMergeItems = async (): Promise<void> => {
  mockItems = [
    { id: '1', value: 2 },
    { id: '2', value: 2 },
    { id: '3', value: 4 },
    { id: '4', value: 4 },
    { id: '5', value: 8 },
    { id: '6', value: 8 },
  ];
};
