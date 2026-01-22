import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/stores/userStore';
import { MealSection } from '@/components/home/MealSection';
import { Recommendation } from '@/types';
import { getRecommendations } from '@/services/recommendationService';

export default function HomeScreen() {
  const { preferences } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchRecommendations = useCallback(async () => {
    try {
      const data = await getRecommendations(preferences);
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [preferences]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRecommendations();
  }, [fetchRecommendations]);

  const currentMealType = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    return 'dinner';
  }, []);

  const breakfastRecs = useMemo(() => recommendations.filter(r => r.mealType === 'breakfast'), [recommendations]);
  const lunchRecs = useMemo(() => recommendations.filter(r => r.mealType === 'lunch'), [recommendations]);
  const dinnerRecs = useMemo(() => recommendations.filter(r => r.mealType === 'dinner'), [recommendations]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']} style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
      <ScrollView
        className="flex-1"
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mb-8 px-6 pt-4" style={{ marginBottom: 32, paddingHorizontal: 24, paddingTop: 16 }}>
          <Text className="text-foreground/60 text-lg">📍 {preferences.location?.city || 'Your Location'}</Text>
          <Text className="text-3xl font-bold text-foreground mt-2" style={{ fontSize: 30, fontWeight: 'bold', marginTop: 8 }}>
            Hey, {preferences.name || 'Friend'}! 👋
          </Text>
        </View>

        {loading && !refreshing ? (
          <View className="flex-1 items-center justify-center py-20" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80 }}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text className="mt-4 text-foreground/50 italic">Consulting the oracle...</Text>
          </View>
        ) : (
          <>
            <View className="px-6 mb-8" style={{ paddingHorizontal: 24, marginBottom: 32 }}>
              <View className="bg-secondary rounded-3xl p-6 flex-row items-center overflow-hidden relative" style={{ backgroundColor: '#4A2C5C', borderRadius: 24, padding: 24, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                <View className="flex-1 z-10" style={{ flex: 1, zIndex: 10 }}>
                  <Text className="text-white font-bold text-xl mb-2" style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>Try Something New</Text>
                  <Text className="text-white/80 mb-4" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>Discover hidden gems based on your taste.</Text>
                  <View className="bg-white/20 self-start px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 }}>
                    <Text className="text-white font-bold text-xs" style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Surprise Me</Text>
                  </View>
                </View>
                <Text className="text-8xl absolute -right-4 -bottom-4 opacity-50" style={{ fontSize: 96, position: 'absolute', right: -16, bottom: -16, opacity: 0.5 }}>🍱</Text>
              </View>
            </View>

            <MealSection
              title="Breakfast"
              icon="🌅"
              recommendations={breakfastRecs}
              isActive={currentMealType === 'breakfast'}
            />

            <MealSection
              title="Lunch"
              icon="☀️"
              recommendations={lunchRecs}
              isActive={currentMealType === 'lunch'}
            />

            <MealSection
              title="Dinner"
              icon="🌙"
              recommendations={dinnerRecs}
              isActive={currentMealType === 'dinner'}
            />
          </>
        )}
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
