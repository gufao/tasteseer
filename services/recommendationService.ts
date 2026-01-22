import { Recommendation, UserPreferences } from '@/types';

// Expanded mock database of dishes
const ALL_DISHES: Recommendation[] = [
  // Breakfast
  {
    id: '1',
    dishName: 'Avocado Toast',
    restaurant: { name: 'Healthy Cafe', distance: 0.8, address: '1st Ave', rating: 4.2 },
    matchPercentage: 90,
    mealType: 'breakfast',
    ingredients: ['Avocado', 'Bread', 'Egg', 'Chili Flakes'],
    imageUrl: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=800&auto=format&fit=crop&q=60',
    price: '$12.00'
  },
  {
    id: '5',
    dishName: 'Eggs Benedict',
    restaurant: { name: 'Brunch Spot', distance: 1.1, address: '5th Ave', rating: 4.4 },
    matchPercentage: 88,
    mealType: 'breakfast',
    ingredients: ['Egg', 'Ham', 'English Muffin', 'Hollandaise Sauce'],
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=60',
    price: '$13.50'
  },
  {
    id: '6',
    dishName: 'Acai Bowl',
    restaurant: { name: 'Berry Good', distance: 0.5, address: 'Broadway', rating: 4.6 },
    matchPercentage: 92,
    mealType: 'breakfast',
    ingredients: ['Acai', 'Granola', 'Banana', 'Honey', 'Berries'],
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop&q=60',
    price: '$11.00'
  },
  
  // Lunch
  {
    id: '2',
    dishName: 'Beef Burger',
    restaurant: { name: 'Burger Joint', distance: 1.5, address: '2nd St', rating: 4.5 },
    matchPercentage: 85,
    mealType: 'lunch',
    ingredients: ['Beef', 'Cheese', 'Lettuce', 'Tomato', 'Brioche Bun'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
    price: '$14.00'
  },
  {
    id: '4',
    dishName: 'Salmon Salad',
    restaurant: { name: 'Sea Food', distance: 3.2, address: '4th St', rating: 4.7 },
    matchPercentage: 80,
    mealType: 'lunch',
    ingredients: ['Salmon', 'Lettuce', 'Cucumber', 'Lemon Dressing'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60',
    price: '$16.00'
  },
  {
    id: '7',
    dishName: 'Vegan Buddha Bowl',
    restaurant: { name: 'Green Earth', distance: 2.0, address: 'Park Ln', rating: 4.8 },
    matchPercentage: 96,
    mealType: 'lunch',
    ingredients: ['Quinoa', 'Chickpeas', 'Sweet Potato', 'Kale', 'Tahini'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
    price: '$13.00'
  },

  // Dinner
  {
    id: '3',
    dishName: 'Vegetarian Pizza',
    restaurant: { name: 'Pizza Place', distance: 2.1, address: '3rd Ave', rating: 4.0 },
    matchPercentage: 95,
    mealType: 'dinner',
    ingredients: ['Cheese', 'Tomato', 'Bell Pepper', 'Mushroom', 'Dough'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=60',
    price: '$18.00'
  },
  {
    id: '8',
    dishName: 'Chicken Tikka Masala',
    restaurant: { name: 'Spice Route', distance: 3.5, address: 'Elm St', rating: 4.6 },
    matchPercentage: 89,
    mealType: 'dinner',
    ingredients: ['Chicken', 'Yogurt', 'Tomato', 'Spices', 'Rice'],
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60',
    price: '$17.50'
  },
  {
    id: '9',
    dishName: 'Pasta Carbonara',
    restaurant: { name: 'Little Italy', distance: 1.8, address: 'Roma Way', rating: 4.3 },
    matchPercentage: 82,
    mealType: 'dinner',
    ingredients: ['Pasta', 'Egg', 'Cheese', 'Pancetta', 'Black Pepper'],
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-982e9dfaa7b7?w=800&auto=format&fit=crop&q=60',
    price: '$15.00'
  }
];

export const getRecommendations = async (preferences: UserPreferences): Promise<Recommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // If no preferences set (e.g. freshly reset), return all
  if (!preferences) return ALL_DISHES;

  let filtered = ALL_DISHES.filter(dish => {
    // 1. Filter by allergies (Strict)
    if (preferences.allergies && preferences.allergies.length > 0) {
      const hasAllergy = dish.ingredients.some(ing => 
        preferences.allergies.some(all => ing.toLowerCase().includes(all.toLowerCase()))
      );
      if (hasAllergy) return false;
    }

    // 2. Filter by diet (Basic logic)
    if (preferences.diets && preferences.diets.length > 0) {
      if (preferences.diets.includes('Vegetarian') && dish.ingredients.some(ing => ['beef', 'chicken', 'ham', 'pancetta', 'salmon'].includes(ing.toLowerCase()))) {
        return false;
      }
      if (preferences.diets.includes('Vegan') && dish.ingredients.some(ing => ['beef', 'chicken', 'ham', 'pancetta', 'salmon', 'egg', 'cheese', 'milk', 'yogurt', 'honey'].includes(ing.toLowerCase()))) {
        return false;
      }
    }

    // 3. Filter by Dislikes (Strict)
    if (preferences.dislikedIngredients && preferences.dislikedIngredients.length > 0) {
      const hasDislike = dish.ingredients.some(ing => 
        preferences.dislikedIngredients.some(dis => ing.toLowerCase().includes(dis.toLowerCase()))
      );
      if (hasDislike) return false;
    }

    return true;
  });

  // If filtering resulted in too few items, relax constraints (fallback)
  if (filtered.length < 2) {
    console.log("Too few results, showing all non-allergic options");
    filtered = ALL_DISHES.filter(dish => {
       if (preferences.allergies && preferences.allergies.length > 0) {
        const hasAllergy = dish.ingredients.some(ing => 
          preferences.allergies.some(all => ing.toLowerCase().includes(all.toLowerCase()))
        );
        if (hasAllergy) return false;
      }
      return true;
    });
  }

  return filtered.map(dish => {
    // Calculate match percentage
    let score = 75; // Base score
    
    // Boost if cuisine matches
    if (preferences.cuisines && preferences.cuisines.some(c => dish.dishName.includes(c) || dish.restaurant.name.includes(c))) {
      score += 10;
    }

    // Boost if ingredients match liked
    if (preferences.likedIngredients) {
      const likedCount = dish.ingredients.filter(ing => 
        preferences.likedIngredients.some(liked => ing.toLowerCase().includes(liked.toLowerCase()))
      ).length;
      score += likedCount * 5;
    }

    return {
      ...dish,
      matchPercentage: Math.min(Math.max(score, 60), 99)
    };
  });
};