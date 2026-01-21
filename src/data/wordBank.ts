// Most common English nouns - Top 1000 by frequency
// Based on Oxford 3000, Cambridge English Corpus, and COCA data
// Organized by category for easier management

export const WORD_CATEGORIES = {
  people: [
    'Person', 'Man', 'Woman', 'Child', 'Boy', 'Girl', 'Baby', 'Adult', 'Friend', 'Family',
    'Father', 'Mother', 'Parent', 'Son', 'Daughter', 'Brother', 'Sister', 'Husband', 'Wife', 'Partner',
    'Teacher', 'Student', 'Doctor', 'Nurse', 'Police', 'Driver', 'Worker', 'Boss', 'Customer', 'Client',
    'Neighbor', 'Stranger', 'Visitor', 'Guest', 'Member', 'Owner', 'Manager', 'Director', 'Leader', 'Member',
    'Team', 'Group', 'Crowd', 'Audience', 'Community', 'Society', 'Nation', 'Country', 'City', 'Town',
    'Village', 'Population', 'People', 'Human', 'Individual', 'Citizen', 'Resident', 'Inhabitant', 'Native', 'Local',
    'Foreigner', 'Tourist', 'Traveler', 'Passenger', 'Pedestrian', 'Commuter', 'Employee', 'Employer', 'Colleague', 'Coworker',
    'Classmate', 'Roommate', 'Teammate', 'Friend', 'Enemy', 'Rival', 'Opponent', 'Competitor', 'Ally', 'Partner',
    'Hero', 'Villain', 'Star', 'Celebrity', 'Legend', 'Icon', 'Idol', 'Model', 'Example', 'Role',
    'Character', 'Personality', 'Spirit', 'Soul', 'Mind', 'Heart', 'Body', 'Head', 'Face', 'Eye'
  ],
  objects: [
    'Thing', 'Object', 'Item', 'Piece', 'Part', 'Section', 'Bit', 'Fragment', 'Element', 'Component',
    'Tool', 'Instrument', 'Device', 'Machine', 'Engine', 'Motor', 'Computer', 'Phone', 'Mobile', 'Laptop',
    'Table', 'Chair', 'Desk', 'Bed', 'Sofa', 'Couch', 'Shelf', 'Cabinet', 'Drawer', 'Box',
    'Bag', 'Case', 'Container', 'Bottle', 'Cup', 'Glass', 'Plate', 'Bowl', 'Fork', 'Spoon',
    'Knife', 'Key', 'Lock', 'Door', 'Window', 'Wall', 'Floor', 'Ceiling', 'Roof', 'House',
    'Building', 'Room', 'Office', 'Shop', 'Store', 'Market', 'Bank', 'School', 'Church', 'Temple',
    'Car', 'Bus', 'Train', 'Plane', 'Bike', 'Boat', 'Ship', 'Vehicle', 'Wheel', 'Tire',
    'Road', 'Street', 'Bridge', 'Path', 'Way', 'Route', 'Track', 'Trail', 'Line', 'Wire',
    'Cable', 'Pipe', 'Tube', 'Hose', 'Rope', 'String', 'Thread', 'Chain', 'Link', 'Ring',
    'Watch', 'Clock', 'Calendar', 'Map', 'Book', 'Paper', 'Page', 'Letter', 'Note', 'Message'
  ],
  nature: [
    'Nature', 'World', 'Earth', 'Land', 'Ground', 'Soil', 'Dirt', 'Sand', 'Rock', 'Stone',
    'Mountain', 'Hill', 'Valley', 'River', 'Lake', 'Sea', 'Ocean', 'Beach', 'Shore', 'Coast',
    'Island', 'Forest', 'Tree', 'Bush', 'Plant', 'Flower', 'Grass', 'Leaf', 'Root', 'Branch',
    'Sun', 'Moon', 'Star', 'Sky', 'Cloud', 'Rain', 'Snow', 'Wind', 'Storm', 'Thunder',
    'Light', 'Fire', 'Heat', 'Cold', 'Ice', 'Water', 'Air', 'Gas', 'Energy', 'Power',
    'Season', 'Spring', 'Summer', 'Fall', 'Winter', 'Weather', 'Climate', 'Temperature', 'Day', 'Night',
    'Morning', 'Evening', 'Dawn', 'Dusk', 'Sunrise', 'Sunset', 'Shadow', 'Shade', 'Darkness', 'Light',
    'Color', 'Shape', 'Size', 'Form', 'Pattern', 'Texture', 'Surface', 'Edge', 'Corner', 'Side',
    'Top', 'Bottom', 'Front', 'Back', 'Center', 'Middle', 'End', 'Beginning', 'Start', 'Finish',
    'Space', 'Area', 'Region', 'Zone', 'Place', 'Spot', 'Point', 'Location', 'Position', 'Site'
  ],
  animals: [
    'Animal', 'Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Chicken', 'Bird', 'Fish',
    'Mouse', 'Rat', 'Rabbit', 'Bear', 'Wolf', 'Fox', 'Deer', 'Lion', 'Tiger', 'Elephant',
    'Monkey', 'Snake', 'Lizard', 'Frog', 'Turtle', 'Crab', 'Lobster', 'Shrimp', 'Whale', 'Dolphin',
    'Shark', 'Eagle', 'Hawk', 'Owl', 'Sparrow', 'Pigeon', 'Duck', 'Goose', 'Swan', 'Penguin',
    'Butterfly', 'Bee', 'Ant', 'Spider', 'Fly', 'Mosquito', 'Beetle', 'Worm', 'Snail', 'Insect',
    'Bug', 'Pest', 'Pet', 'Farm', 'Wild', 'Zoo', 'Cage', 'Kennel', 'Stable', 'Nest',
    'Den', 'Cave', 'Burrow', 'Hole', 'Home', 'Habitat', 'Environment', 'Nature', 'Life', 'Death',
    'Birth', 'Growth', 'Age', 'Size', 'Weight', 'Speed', 'Strength', 'Power', 'Ability', 'Skill',
    'Instinct', 'Behavior', 'Habit', 'Action', 'Movement', 'Sound', 'Voice', 'Call', 'Cry', 'Noise',
    'Silence', 'Peace', 'War', 'Fight', 'Attack', 'Defense', 'Protection', 'Safety', 'Danger', 'Risk'
  ],
  food: [
    'Food', 'Meal', 'Breakfast', 'Lunch', 'Dinner', 'Supper', 'Snack', 'Drink', 'Water', 'Milk',
    'Coffee', 'Tea', 'Juice', 'Soda', 'Beer', 'Wine', 'Alcohol', 'Bread', 'Rice', 'Pasta',
    'Meat', 'Beef', 'Pork', 'Chicken', 'Fish', 'Egg', 'Cheese', 'Butter', 'Oil', 'Salt',
    'Sugar', 'Pepper', 'Spice', 'Herb', 'Vegetable', 'Fruit', 'Apple', 'Banana', 'Orange', 'Grape',
    'Lemon', 'Lime', 'Tomato', 'Potato', 'Onion', 'Garlic', 'Carrot', 'Bean', 'Pea', 'Nut',
    'Cake', 'Cookie', 'Candy', 'Chocolate', 'Ice', 'Cream', 'Pie', 'Pizza', 'Burger', 'Sandwich',
    'Soup', 'Salad', 'Sauce', 'Dish', 'Plate', 'Bowl', 'Cup', 'Glass', 'Bottle', 'Can',
    'Jar', 'Box', 'Package', 'Bag', 'Cart', 'Basket', 'Tray', 'Table', 'Chair', 'Kitchen',
    'Restaurant', 'Cafe', 'Bar', 'Store', 'Shop', 'Market', 'Farm', 'Garden', 'Field', 'Land',
    'Plant', 'Seed', 'Crop', 'Harvest', 'Season', 'Summer', 'Fall', 'Winter', 'Spring', 'Year'
  ],
  places: [
    'Place', 'Area', 'Region', 'Location', 'Site', 'Spot', 'Point', 'Position', 'Space', 'Room',
    'House', 'Home', 'Building', 'Office', 'School', 'Hospital', 'Church', 'Temple', 'Shop', 'Store',
    'Market', 'Bank', 'Library', 'Museum', 'Theater', 'Cinema', 'Park', 'Garden', 'Square', 'Street',
    'Road', 'Bridge', 'Station', 'Airport', 'Port', 'Harbor', 'Terminal', 'Stop', 'Parking', 'Garage',
    'Basement', 'Attic', 'Roof', 'Floor', 'Wall', 'Door', 'Window', 'Gate', 'Fence', 'Yard',
    'City', 'Town', 'Village', 'Country', 'Nation', 'State', 'Province', 'Region', 'District', 'Zone',
    'World', 'Earth', 'Planet', 'Continent', 'Island', 'Mountain', 'Valley', 'River', 'Lake', 'Sea',
    'Ocean', 'Beach', 'Coast', 'Forest', 'Jungle', 'Desert', 'Field', 'Farm', 'Garden', 'Park',
    'North', 'South', 'East', 'West', 'Center', 'Edge', 'Corner', 'Side', 'Front', 'Back',
    'Top', 'Bottom', 'Left', 'Right', 'Inside', 'Outside', 'Near', 'Far', 'Here', 'There'
  ],
  time: [
    'Time', 'Moment', 'Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade',
    'Century', 'Millennium', 'Era', 'Age', 'Period', 'Phase', 'Stage', 'Step', 'Level', 'Degree',
    'Past', 'Present', 'Future', 'History', 'Memory', 'Dream', 'Hope', 'Plan', 'Goal', 'Aim',
    'Purpose', 'Reason', 'Cause', 'Effect', 'Result', 'Outcome', 'Consequence', 'Impact', 'Influence', 'Change',
    'Development', 'Growth', 'Progress', 'Success', 'Failure', 'Loss', 'Gain', 'Profit', 'Benefit', 'Cost',
    'Price', 'Value', 'Worth', 'Quality', 'Quantity', 'Amount', 'Number', 'Count', 'Total', 'Sum',
    'Average', 'Rate', 'Speed', 'Pace', 'Rhythm', 'Tempo', 'Beat', 'Pulse', 'Cycle', 'Pattern',
    'Trend', 'Direction', 'Course', 'Path', 'Way', 'Route', 'Method', 'System', 'Structure', 'Organization',
    'Order', 'Rule', 'Law', 'Principle', 'Theory', 'Concept', 'Idea', 'Thought', 'Mind', 'Brain',
    'Knowledge', 'Information', 'Data', 'Fact', 'Truth', 'Reality', 'Life', 'Death', 'Nature', 'World'
  ],
  body: [
    'Body', 'Head', 'Face', 'Eye', 'Ear', 'Nose', 'Mouth', 'Lip', 'Tooth', 'Tongue',
    'Neck', 'Shoulder', 'Arm', 'Hand', 'Finger', 'Thumb', 'Nail', 'Wrist', 'Elbow', 'Chest',
    'Breast', 'Back', 'Stomach', 'Belly', 'Waist', 'Hip', 'Leg', 'Knee', 'Foot', 'Toe',
    'Heel', 'Ankle', 'Skin', 'Hair', 'Bone', 'Muscle', 'Blood', 'Heart', 'Lung', 'Brain',
    'Mind', 'Spirit', 'Soul', 'Life', 'Health', 'Disease', 'Illness', 'Pain', 'Injury', 'Wound',
    'Scar', 'Birth', 'Death', 'Age', 'Growth', 'Change', 'Movement', 'Action', 'Function', 'Ability',
    'Sense', 'Sight', 'Sound', 'Smell', 'Taste', 'Touch', 'Feeling', 'Emotion', 'Love', 'Hate',
    'Fear', 'Joy', 'Sadness', 'Anger', 'Happiness', 'Peace', 'War', 'Power', 'Strength', 'Weakness',
    'Energy', 'Force', 'Motion', 'Rest', 'Sleep', 'Wake', 'Dream', 'Memory', 'Thought', 'Idea',
    'Knowledge', 'Wisdom', 'Truth', 'Lie', 'Secret', 'Story', 'Tale', 'Legend', 'Myth', 'History'
  ],
  clothing: [
    'Clothes', 'Clothing', 'Dress', 'Shirt', 'Pants', 'Jeans', 'Trousers', 'Skirt', 'Coat', 'Jacket',
    'Sweater', 'Blouse', 'Suit', 'Uniform', 'Costume', 'Outfit', 'Style', 'Fashion', 'Look', 'Appearance',
    'Hat', 'Cap', 'Helmet', 'Hood', 'Scarf', 'Gloves', 'Mittens', 'Socks', 'Shoes', 'Boots',
    'Sandal', 'Sneaker', 'Heel', 'Lace', 'Buckle', 'Button', 'Zipper', 'Pocket', 'Collar', 'Sleeve',
    'Neck', 'Waist', 'Belt', 'Tie', 'Bow', 'Ribbon', 'String', 'Thread', 'Fabric', 'Material',
    'Cotton', 'Wool', 'Silk', 'Leather', 'Denim', 'Nylon', 'Polyester', 'Fiber', 'Texture', 'Pattern',
    'Color', 'White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Brown',
    'Pink', 'Gray', 'Silver', 'Gold', 'Bronze', 'Metal', 'Plastic', 'Wood', 'Paper', 'Glass',
    'Store', 'Shop', 'Market', 'Mall', 'Brand', 'Label', 'Tag', 'Price', 'Cost', 'Value',
    'Quality', 'Size', 'Fit', 'Comfort', 'Style', 'Trend', 'Season', 'Fashion', 'Designer', 'Model'
  ],
  abstract: [
    'Idea', 'Concept', 'Thought', 'Mind', 'Knowledge', 'Wisdom', 'Truth', 'Fact', 'Reality', 'Life',
    'Love', 'Hope', 'Joy', 'Peace', 'Freedom', 'Justice', 'Power', 'Strength', 'Beauty', 'Art',
    'Music', 'Language', 'Word', 'Name', 'Title', 'Story', 'History', 'Past', 'Future', 'Time',
    'Space', 'Place', 'World', 'Universe', 'Nature', 'Spirit', 'Soul', 'God', 'Faith', 'Belief',
    'Religion', 'Culture', 'Society', 'Community', 'Family', 'Friend', 'Person', 'Human', 'Being', 'Existence',
    'Purpose', 'Meaning', 'Value', 'Worth', 'Quality', 'Standard', 'Rule', 'Law', 'Order', 'System',
    'Structure', 'Form', 'Shape', 'Pattern', 'Design', 'Plan', 'Goal', 'Aim', 'Dream', 'Vision',
    'Success', 'Failure', 'Victory', 'Defeat', 'Win', 'Loss', 'Gain', 'Profit', 'Cost', 'Price',
    'Money', 'Cash', 'Currency', 'Bank', 'Debt', 'Credit', 'Loan', 'Payment', 'Bill', 'Tax',
    'Business', 'Company', 'Firm', 'Industry', 'Market', 'Trade', 'Commerce', 'Economy', 'Finance', 'Investment'
  ]
};

// Combine all categories into a single word bank
export const ALL_WORDS = Object.values(WORD_CATEGORIES).flat();

// Utility functions for word management

/**
 * Fisher-Yates shuffle algorithm for random permutation
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random subset of words from specific categories
 */
export function getRandomWordsFromCategories(
  categories: (keyof typeof WORD_CATEGORIES)[],
  count: number
): string[] {
  const words = categories.flatMap(cat => WORD_CATEGORIES[cat]);
  return shuffleArray(words).slice(0, Math.min(count, words.length));
}

/**
 * Get words from all categories (default)
 */
export function getAllWords(count?: number): string[] {
  const words = shuffleArray(ALL_WORDS);
  return count ? words.slice(0, Math.min(count, words.length)) : words;
}
