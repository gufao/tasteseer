import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'heroui-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { preferences, reset } = useUserStore();
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.replace('/(onboarding)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ flex: 1 }}>
      <ScrollView className="flex-1 p-6">
        <View className="items-center mb-8 mt-4">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-4xl text-white font-bold">
              {preferences.name ? preferences.name[0].toUpperCase() : 'T'}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-foreground">{preferences.name || 'Foodie'}</Text>
          <Text className="text-foreground/60">{preferences.location?.city || 'No location set'}</Text>
        </View>

        <View className="flex-row justify-around mb-8 bg-white p-6 rounded-3xl shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">0</Text>
            <Text className="text-xs text-foreground/50">Reviews</Text>
          </View>
          <View className="w-[1px] bg-gray-100" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">0</Text>
            <Text className="text-xs text-foreground/50">Favorites</Text>
          </View>
          <View className="w-[1px] bg-gray-100" />
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">0</Text>
            <Text className="text-xs text-foreground/50">Following</Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground mb-4">My Taste Profile</Text>
          
          <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
            <Text className="font-semibold text-foreground/70 mb-2">🚫 Allergies</Text>
            <View className="flex-row flex-wrap gap-2">
              {preferences.allergies.length > 0 ? (
                preferences.allergies.map(a => (
                  <View key={a} className="bg-red-50 px-3 py-1 rounded-full">
                    <Text className="text-red-500 text-sm">{a}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-foreground/40 italic">No allergies listed</Text>
              )}
            </View>
          </View>

          <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm">
            <Text className="font-semibold text-foreground/70 mb-2">🥗 Diets</Text>
            <View className="flex-row flex-wrap gap-2">
              {preferences.diets.length > 0 ? (
                preferences.diets.map(d => (
                  <View key={d} className="bg-green-50 px-3 py-1 rounded-full">
                    <Text className="text-green-600 text-sm">{d}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-foreground/40 italic">No specific diet</Text>
              )}
            </View>
          </View>

          <View className="bg-white p-5 rounded-3xl shadow-sm">
            <Text className="font-semibold text-foreground/70 mb-2">❤️ Favorites</Text>
            <Text className="text-foreground leading-6">
              {preferences.cuisines.join(', ') || 'No favorites yet'}
            </Text>
          </View>
        </View>

        <Button
          variant="flat"
          color="danger"
          onPress={handleReset}
          className="mb-8 w-full"
          size="lg"
        >
          Sign Out / Reset
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}