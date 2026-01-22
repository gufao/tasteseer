export interface Recommendation {
  id: string;
  dishName: string;
  restaurant: {
    name: string;
    distance: number;
    address: string;
    rating: number;
  };
  matchPercentage: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  ingredients: string[];
  imageUrl: string;
  price: string;
}

export interface UserPreferences {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
  } | null;
  allergies: string[];
  diets: string[];
  cuisines: string[];
  likedIngredients: string[];
  dislikedIngredients: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
