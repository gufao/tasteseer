import React from 'react';
import { View, Image, Text } from 'react-native';
import { Card, Chip } from 'heroui-native';
import { Recommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  return (
    <Card 
      className="w-72 mr-4 overflow-hidden rounded-3xl" 
      variant="flat"
      style={{ width: 288, marginRight: 16, overflow: 'hidden', borderRadius: 24, backgroundColor: '#FFFFFF' }}
    >
      <Image
        source={{ uri: recommendation.imageUrl }}
        className="w-full h-40 bg-secondary/10"
        resizeMode="cover"
        style={{ width: '100%', height: 160, backgroundColor: '#f0f0f0' }}
      />
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground" numberOfLines={1}>
              {recommendation.dishName}
            </Text>
            <Text className="text-sm text-foreground/60" numberOfLines={1}>
              {recommendation.restaurant.name}
            </Text>
          </View>
          <Chip color="primary" variant="flat" size="sm">
            {recommendation.matchPercentage}% match
          </Chip>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-sm font-semibold text-primary">
            {recommendation.price}
          </Text>
          <Text className="text-xs text-foreground/40">
            {recommendation.restaurant.distance.toFixed(1)} km away
          </Text>
        </View>
      </View>
    </Card>
  );
};
