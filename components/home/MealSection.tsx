import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Recommendation } from '@/types';
import { RecommendationCard } from './RecommendationCard';

interface MealSectionProps {
  title: string;
  icon: string;
  recommendations: Recommendation[];
  isActive?: boolean;
}

export const MealSection: React.FC<MealSectionProps> = ({
  title,
  icon,
  recommendations,
  isActive,
}) => {
  return (
    <View className={`mb-8 ${isActive ? 'opacity-100' : 'opacity-60'}`} style={{ marginBottom: 32, opacity: isActive ? 1 : 0.6 }}>
      <View className="flex-row items-center mb-4 px-6" style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 24 }}>
        <Text className="text-2xl mr-2" style={{ fontSize: 24, marginRight: 8 }}>{icon}</Text>
        <Text className={`text-xl font-bold ${isActive ? 'text-primary' : 'text-foreground'}`} style={{ fontSize: 20, fontWeight: 'bold', color: isActive ? '#FF6B35' : '#2D2D2D' }}>
          {title}
        </Text>
        {isActive && (
          <View className="ml-3 bg-primary/10 px-2 py-0.5 rounded-full" style={{ marginLeft: 12, backgroundColor: 'rgba(255, 107, 53, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 }}>
            <Text className="text-xs text-primary font-bold" style={{ fontSize: 12, color: '#FF6B35', fontWeight: 'bold' }}>CURRENT</Text>
          </View>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))
        ) : (
          <View className="w-72 h-56 bg-secondary/5 rounded-3xl items-center justify-center border border-dashed border-secondary/20 mr-4">
            <Text className="text-foreground/40">No matches found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
