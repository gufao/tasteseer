import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'heroui-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useUserStore } from '@/stores/userStore';
import { ChatBubble } from '@/components/onboarding/ChatBubble';
import { ChipSelector } from '@/components/onboarding/ChipSelector';

type Step = 'WELCOME' | 'NAME' | 'LOCATION' | 'ALLERGIES' | 'DIETS' | 'CUISINES' | 'INGREDIENTS' | 'DISLIKES' | 'COMPLETE';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const ALLERGY_OPTIONS = ['Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat/Gluten', 'Soy', 'Fish', 'Shellfish', 'Sesame'];
const DIET_OPTIONS = ['Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Halal', 'Kosher', 'Low-carb'];
const CUISINE_OPTIONS = ['Italian', 'Mexican', 'Japanese', 'Chinese', 'Indian', 'Thai', 'Mediterranean', 'American', 'Brazilian', 'Korean'];
const INGREDIENT_OPTIONS = ['Garlic', 'Onion', 'Tomato', 'Basil', 'Cheese', 'Chicken', 'Beef', 'Salmon', 'Avocado', 'Pasta'];
const DISLIKE_OPTIONS = ['Cilantro', 'Olives', 'Eggplant', 'Anchovies', 'Pickles', 'Liver', 'Okra', 'Tofu', 'Beets', 'Brussels Sprouts'];

export default function OnboardingChat() {
  const router = useRouter();
  const { setName, setLocation, setAllergies, setDiets, setCuisines, setLikedIngredients, setDislikedIngredients, setOnboardingCompleted } = useUserStore();
  
  const [step, setStep] = useState<Step>('WELCOME');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender }]);
  };

  useEffect(() => {
    // Initial bot message
    if (step === 'WELCOME') {
      addMessage("Hi! I'm Tasteseer, your personal food oracle 🔮", 'bot');
      setTimeout(() => {
        addMessage("I'll help you find the perfect dish based on what you love.", 'bot');
        setTimeout(() => {
          addMessage("First things first, what should I call you?", 'bot');
          setStep('NAME');
        }, 1000);
      }, 1000);
    }
  }, [step]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendText = () => {
    if (!inputText.trim()) return;
    
    addMessage(inputText, 'user');
    const value = inputText.trim();
    setInputText('');

    if (step === 'NAME') {
      setName(value);
      setTimeout(() => {
        addMessage(`Nice to meet you, ${value}! 👋`, 'bot');
        setTimeout(() => {
          addMessage("To find the best spots near you, I'll need your location.", 'bot');
          setStep('LOCATION');
        }, 800);
      }, 600);
    }
  };

  const handleLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        addMessage("Permission denied. I'll default to a generic location.", 'bot');
      } else {
        const location = await Location.getCurrentPositionAsync({});
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        const city = reverseGeocode[0]?.city || 'Unknown City';
        
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          city,
        });
        addMessage(`📍 Located: ${city}`, 'user');
      }
    } catch (error) {
      addMessage("Couldn't get location.", 'user');
    } finally {
      setLoading(false);
      proceedToAllergies();
    }
  };

  const proceedToAllergies = () => {
    setTimeout(() => {
      addMessage("Do you have any food allergies I should know about?", 'bot');
      setStep('ALLERGIES');
    }, 1000);
  };

  const handleChipSelection = (option: string) => {
    setSelectedChips(prev => 
      prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option]
    );
  };

  const submitChips = () => {
    const selectionText = selectedChips.length > 0 ? selectedChips.join(', ') : 'None';
    addMessage(selectionText, 'user');
    
    if (step === 'ALLERGIES') {
      setAllergies(selectedChips);
      setSelectedChips([]);
      setTimeout(() => {
        addMessage("Got it. Are you following any specific diet?", 'bot');
        setStep('DIETS');
      }, 800);
    } else if (step === 'DIETS') {
      setDiets(selectedChips);
      setSelectedChips([]);
      setTimeout(() => {
        addMessage("Noted! What types of cuisine do you enjoy? 🌎", 'bot');
        setStep('CUISINES');
      }, 800);
    } else if (step === 'CUISINES') {
      setCuisines(selectedChips);
      setSelectedChips([]);
      setTimeout(() => {
        addMessage("Yum! Based on that, pick some ingredients you love: ✨", 'bot');
        setStep('INGREDIENTS');
      }, 800);
    } else if (step === 'INGREDIENTS') {
      setLikedIngredients(selectedChips);
      setSelectedChips([]);
      setTimeout(() => {
        addMessage("Almost done! Any ingredients you'd rather avoid? 🤢", 'bot');
        setStep('DISLIKES');
      }, 800);
    } else if (step === 'DISLIKES') {
      setDislikedIngredients(selectedChips);
      setSelectedChips([]);
      setTimeout(() => {
        addMessage("Perfect! I'm ready to find your next favorite meal 🍽️", 'bot');
        setStep('COMPLETE');
      }, 800);
    }
  };

  const handleComplete = () => {
    setOnboardingCompleted(true);
    router.replace('/(tabs)');
  };

  const renderInputArea = () => {
    if (step === 'NAME') {
      return (
        <View className="flex-row items-center gap-2">
          <TextInput
            style={{ flex: 1, backgroundColor: '#FFF', padding: 12, borderRadius: 20, fontSize: 16 }}
            placeholder="Type your name..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendText}
            returnKeyType="send"
          />
          <Button size="md" onPress={handleSendText} color="primary" isDisabled={!inputText.trim()}>Send</Button>
        </View>
      );
    }

    if (step === 'LOCATION') {
      return (
        <Button className="w-full" size="lg" color="primary" onPress={handleLocation} isLoading={loading}>
          Allow Location Access
        </Button>
      );
    }

    if (['ALLERGIES', 'DIETS', 'CUISINES', 'INGREDIENTS', 'DISLIKES'].includes(step)) {
      let options: string[] = [];
      if (step === 'ALLERGIES') options = ALLERGY_OPTIONS;
      if (step === 'DIETS') options = DIET_OPTIONS;
      if (step === 'CUISINES') options = CUISINE_OPTIONS;
      if (step === 'INGREDIENTS') options = INGREDIENT_OPTIONS;
      if (step === 'DISLIKES') options = DISLIKE_OPTIONS;

      return (
        <View>
          <View className="max-h-48 mb-2">
            <ScrollView nestedScrollEnabled>
              <ChipSelector
                options={options}
                selectedOptions={selectedChips}
                onToggle={handleChipSelection}
              />
            </ScrollView>
          </View>
          <Button className="w-full" size="lg" color="primary" onPress={submitChips}>
            {selectedChips.length > 0 ? 'Confirm' : 'None / Skip'}
          </Button>
        </View>
      );
    }

    if (step === 'COMPLETE') {
      return (
                  <Button className="w-full" size="lg" color="primary" onPress={handleComplete}>
                    Let&apos;s Eat!
                  </Button>      );
    }

    return null;
  };

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </ScrollView>
        <View className="p-4 bg-background border-t border-secondary/10">
          {renderInputArea()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}