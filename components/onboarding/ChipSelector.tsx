import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from 'heroui-native';

interface ChipSelectorProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  selectedOptions,
  onToggle,
}) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        return (
          <Chip
            key={option}
            variant={isSelected ? 'solid' : 'bordered'}
            color={isSelected ? 'primary' : 'default'}
            onPress={() => onToggle(option)}
            className="mb-2"
            style={isSelected ? { backgroundColor: '#FF6B35', borderWidth: 0 } : { borderWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ color: isSelected ? '#FFFFFF' : '#2D2D2D' }}>{option}</Text>
          </Chip>
        );
      })}
    </View>
  );
};
