export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface MergeItem {
  id: string;
  name: string;
  rarity?: Rarity | number;
  level?: number;
  power?: number;
  value?: number;
  bonus?: number;
  category?: string;
  image?: string;
  imageUrl?: string;
  stat?: string;
  collected?: boolean;
}
