import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="name" />
      <Stack.Screen name="location" />
      <Stack.Screen name="allergies" />
      <Stack.Screen name="diets" />
      <Stack.Screen name="cuisines" />
      <Stack.Screen name="ingredients" />
      <Stack.Screen name="dislikes" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
