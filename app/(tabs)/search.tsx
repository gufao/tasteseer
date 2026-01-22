import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

const CATEGORIES = ['Italian', 'Mexican', 'Japanese', 'Burgers', 'Vegan', 'Dessert'];

const MOCK_RESULTS = [
  { id: '1', name: 'Margherita Pizza', place: 'Pizza & Co', rating: 4.8, price: '$14', image: '🍕' },
  { id: '2', name: 'Sushi Platter', place: 'Sushi Zen', rating: 4.9, price: '$24', image: '🍣' },
  { id: '3', name: 'Vegan Burger', place: 'Green Eats', rating: 4.5, price: '$16', image: '🍔' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ flex: 1 }}>
      <View className="p-6 pb-2">
        <Text className="text-3xl font-bold text-foreground mb-6">Search</Text>
        <View className="flex-row items-center bg-secondary/10 rounded-2xl px-4 py-3 mb-6">
          <IconSymbol name="paperplane.fill" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-lg text-foreground"
            placeholder="Dishes, restaurants, or cuisines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-lg font-semibold text-foreground mb-4">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              className="bg-primary/10 px-6 py-3 rounded-full mr-3"
            >
              <Text className="text-primary font-medium">{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-lg font-semibold text-foreground mb-4">Trending Near You</Text>
        {MOCK_RESULTS.map((item) => (
          <View key={item.id} className="flex-row bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
            <View className="w-16 h-16 bg-secondary/10 rounded-xl items-center justify-center mr-4">
              <Text className="text-3xl">{item.image}</Text>
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-lg font-bold text-foreground">{item.name}</Text>
              <Text className="text-foreground/60">{item.place}</Text>
            </View>
            <View className="items-end justify-center">
              <Text className="text-primary font-bold">{item.price}</Text>
              <Text className="text-xs text-foreground/40">⭐ {item.rating}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}