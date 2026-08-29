export const mergeItems = (items: any[]): any[] => {
  const mergedItems = [];
  let currentMerge = null;

  for (const item of items) {
    if (currentMerge === null || currentMerge.id !== item.id) {
      currentMerge = { ...item, isMerged: false };
      mergedItems.push(currentMerge);
    } else {
      currentMerge.isMerged = true;
    }
  }

  return mergedItems;
};

export const filterItems = (items: any[], filter: string): any[] => {
  if (filter === 'merged') {
    return items.filter(item => item.isMerged);
  } else if (filter === 'unmerged') {
    return items.filter(item => !item.isMerged);
  }
  return items;
};