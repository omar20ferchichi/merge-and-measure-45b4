import { mergeItem, useMergeItems } from './gameService';

// Mock function to simulate merging an item
export const mergeItem = async (itemId: string) => {
  // In a real application, this would update the game state or backend
  console.log(`Merging item with ID: ${itemId}`);
  // Simulate a delay to mimic async operation
  await new Promise(resolve => setTimeout(resolve, 1000));
};

// Mock function to simulate fetching merge items
export const useMergeItems = async () => {
  // In a real application, this would fetch data from a backend or database
  const items = [
    { id: '1', name: 'Apple', value: 10, imageUrl: 'https://example.com/apple.jpg' },
    { id: '2', name: 'Banana', value: 15, imageUrl: 'https://example.com/banana.jpg' },
    { id: '3', name: 'Orange', value: 20, imageUrl: 'https://example.com/orange.jpg' },
    { id: '4', name: 'Grapes', value: 25, imageUrl: 'https://example.com/grapes.jpg' },
    { id: '5', name: 'Strawberry', value: 30, imageUrl: 'https://example.com/strawberry.jpg' },
    { id: '6', name: 'Blueberry', value: 35, imageUrl: 'https://example.com/blueberry.jpg' },
    { id: '7', name: 'Cherry', value: 40, imageUrl: 'https://example.com/cherry.jpg' },
    { id: '8', name: 'Pineapple', value: 45, imageUrl: 'https://example.com/pineapple.jpg' },
    { id: '9', name: 'Watermelon', value: 50, imageUrl: 'https://example.com/watermelon.jpg' },
    { id: '10', name: 'Mango', value: 55, imageUrl: 'https://example.com/mango.jpg' },
    { id: '11', name: 'Kiwi', value: 60, imageUrl: 'https://example.com/kiwi.jpg' },
    { id: '12', name: 'Peach', value: 65, imageUrl: 'https://example.com/peach.jpg' },
    { id: '13', name: 'Plum', value: 70, imageUrl: 'https://example.com/plum.jpg' },
    { id: '14', name: 'Pear', value: 75, imageUrl: 'https://example.com/pear.jpg' },
    { id: '15', name: 'Lemon', value: 80, imageUrl: 'https://example.com/lemon.jpg' },
    { id: '16', name: 'Lime', value: 85, imageUrl: 'https://example.com/lime.jpg' },
    { id: '17', name: 'Coconut', value: 90, imageUrl: 'https://example.com/coconut.jpg' },
    { id: '18', name: 'Avocado', value: 95, imageUrl: 'https://example.com/avocado.jpg' },
    { id: '19', name: 'Blackberry', value: 100, imageUrl: 'https://example.com/blackberry.jpg' },
    { id: '20', name: 'Raspberry', value: 105, imageUrl: 'https://example.com/raspberry.jpg' },
    { id: '21', name: 'Nectarine', value: 110, imageUrl: 'https://example.com/nectarine.jpg' },
    { id: '22', name: 'Fig', value: 115, imageUrl: 'https://example.com/fig.jpg' },
    { id: '23', name: 'Date', value: 120, imageUrl: 'https://example.com/date.jpg' },
    { id: '24', name: 'Pomegranate', value: 125, imageUrl: 'https://example.com/pomegranate.jpg' },
    { id: '25', name: 'Dragonfruit', value: 130, imageUrl: 'https://example.com/dragonfruit.jpg' },
    { id: '26', name: 'Starfruit', value: 135, imageUrl: 'https://example.com/starfruit.jpg' },
    { id: '27', name: 'Lychee', value: 140, imageUrl: 'https://example.com/lychee.jpg' },
    { id: '28', name: 'Mangosteen', value: 145, imageUrl: 'https://example.com/mangosteen.jpg' },
    { id: '29', name: 'Guava', value: 150, imageUrl: 'https://example.com/guava.jpg' },
    { id: '30', name: 'Cantaloupe', value: 155, imageUrl: 'https://example.com/cantaloupe.jpg' },
    { id: '31', name: 'Honeydew', value: 160, imageUrl: 'https://example.com/honeydew.jpg' },
    { id: '32', name: 'Cucumber', value: 165, imageUrl: 'https://example.com/cucumber.jpg' },
    { id: '33', name: 'Tomato', value: 170, imageUrl: 'https://example.com/tomato.jpg' },
    { id: '34', name: 'Cauliflower', value: 175, imageUrl: 'https://example.com/cauliflower.jpg' },
    { id: '35', name: 'Broccoli', value: 180, imageUrl: 'https://example.com/broccoli.jpg' },
    { id: '36', name: 'Carrot', value: 185, imageUrl: 'https://example.com/carrot.jpg' },
    { id: '37', name: 'Spinach', value: 190, imageUrl: 'https://example.com/spinach.jpg' },
    { id: '38', name: 'Lettuce', value: 195, imageUrl: 'https://example.com/lettuce.jpg' },
    { id: '39', name: 'Cabbage', value: 200, imageUrl: 'https://example.com/cabbage.jpg' },
    { id: '40', name: 'Radish', value: 205, imageUrl: 'https://example.com/radish.jpg' },
    { id: '41', name: 'Onion', value: 210, imageUrl: 'https://example.com/onion.jpg' },
    { id: '42', name: 'Garlic', value: 215, imageUrl: 'https://example.com/garlic.jpg' },
    { id: '43', name: 'Ginger', value: 220, imageUrl: 'https://example.com/ginger.jpg' },
    { id: '44', name: 'Cilantro', value: 225, imageUrl: 'https://example.com/cilantro.jpg' },
    { id: '45', name: 'Parsley', value: 230, imageUrl: 'https://example.com/parsley.jpg' },
    { id: '46', name: 'Chives', value: 235, imageUrl: 'https://example.com/chives.jpg' },
    { id: '47', name: 'Mint', value: 240, imageUrl: 'https://example.com/mint.jpg' },
    { id: '48', name: 'Thyme', value: 245, imageUrl: 'https://example.com/thyme.jpg' },
    { id: '49', name: 'Oregano', value: 250, imageUrl: 'https://example.com/oregano.jpg' },
    { id: '50', name: 'Basil', value: 255, imageUrl: 'https://example.com/basil.jpg' },
  ];
  return items;
};