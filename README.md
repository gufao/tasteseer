# Tasteseer - Your Personal Food Oracle 🔮

Tasteseer is a mobile app that recommends what to eat at restaurants based on your ingredient preferences. Using a friendly, conversational onboarding flow, it learns about your taste, allergies, and dietary restrictions to provide personalized meal recommendations for Breakfast, Lunch, and Dinner.

## 🚀 Features

- **Chat-based Onboarding**: A conversational interface to set up your profile.
- **Time-Aware Recommendations**: Highlighting the best spots for your current meal (Breakfast, Lunch, or Dinner).
- **Personalized Matching**: Dishes ranked by how well they match your unique taste profile.
- **Dietary Safeguards**: Automatically filters out dishes containing ingredients you're allergic to or avoid.

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev) / React Native
- **UI Library**: [HeroUI Native](https://heroui.com)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Navigation**: Expo Router
- **Styling**: Tailwind CSS via [Uniwind](https://uniwind.dev)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the project:
   ```bash
   npm run ios # or android / web
   ```

## 📂 Project Structure

- `app/(onboarding)`: Chat-based setup flow.
- `app/(tabs)`: Main application tabs (Home, Search, Profile).
- `components/`: Reusable UI components.
- `stores/`: Zustand state management for user preferences.
- `services/`: Recommendation and logic services.

---
Created with ❤️ for food lovers.