import React from 'react';
import { View, Text } from 'react-native';

interface ChatBubbleProps {
  text: string;
  sender: 'bot' | 'user';
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender }) => {
  const isBot = sender === 'bot';
  return (
    <View
      style={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        backgroundColor: isBot ? 'rgba(74, 44, 92, 0.1)' : '#FF6B35',
        padding: 16,
        borderRadius: 20,
        borderBottomLeftRadius: isBot ? 4 : 20,
        borderBottomRightRadius: isBot ? 20 : 4,
        marginBottom: 12,
        maxWidth: '80%',
      }}
    >
      <Text
        style={{
          color: isBot ? '#2D2D2D' : '#FFFFFF',
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
};
