import { Redirect } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

export default function Index() {
  const { preferences } = useUserStore();

  if (!preferences.onboardingCompleted) {
    return <Redirect href="/(onboarding)" />;
  }

  return <Redirect href="/(tabs)" />;
}
