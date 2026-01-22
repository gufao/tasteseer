import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface UserState {
  preferences: UserPreferences;
  setName: (name: string) => void;
  setLocation: (location: UserPreferences['location']) => void;
  setAllergies: (allergies: string[]) => void;
  setDiets: (diets: string[]) => void;
  setCuisines: (cuisines: string[]) => void;
  setLikedIngredients: (ingredients: string[]) => void;
  setDislikedIngredients: (ingredients: string[]) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  reset: () => void;
}

const initialPreferences: UserPreferences = {
  name: '',
  location: null,
  allergies: [],
  diets: [],
  cuisines: [],
  likedIngredients: [],
  dislikedIngredients: [],
  onboardingCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      setName: (name) =>
        set((state) => ({
          preferences: { ...state.preferences, name, updatedAt: new Date().toISOString() },
        })),
      setLocation: (location) =>
        set((state) => ({
          preferences: { ...state.preferences, location, updatedAt: new Date().toISOString() },
        })),
      setAllergies: (allergies) =>
        set((state) => ({
          preferences: { ...state.preferences, allergies, updatedAt: new Date().toISOString() },
        })),
      setDiets: (diets) =>
        set((state) => ({
          preferences: { ...state.preferences, diets, updatedAt: new Date().toISOString() },
        })),
      setCuisines: (cuisines) =>
        set((state) => ({
          preferences: { ...state.preferences, cuisines, updatedAt: new Date().toISOString() },
        })),
      setLikedIngredients: (likedIngredients) =>
        set((state) => ({
          preferences: { ...state.preferences, likedIngredients, updatedAt: new Date().toISOString() },
        })),
      setDislikedIngredients: (dislikedIngredients) =>
        set((state) => ({
          preferences: { ...state.preferences, dislikedIngredients, updatedAt: new Date().toISOString() },
        })),
      setOnboardingCompleted: (onboardingCompleted) =>
        set((state) => ({
          preferences: { ...state.preferences, onboardingCompleted, updatedAt: new Date().toISOString() },
        })),
      reset: () => set({ preferences: initialPreferences }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
