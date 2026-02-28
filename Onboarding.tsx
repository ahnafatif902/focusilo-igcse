import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, SafeAreaView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Spec-Sync Vault',
    description: '1:1 mapped flashcards with official Edexcel IGCSE specification points. No junk data.',
  },
  {
    id: '2',
    title: 'Mark-Scheme AI',
    description: 'Upload any PDF or link. Instantly convert it into Edexcel-style questions enforcing command words.',
  },
  {
    id: '3',
    title: 'Active Recall Engine',
    description: 'Spaced-repetition quizzes that track mastery per spec point, forcing you to confront weak areas.',
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // Handle completion
    }
  };

  const handleSkip = () => {
    // Handle skip
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-zinc-400 font-medium text-base">Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 items-center justify-center px-8">
            <View className="w-full aspect-square bg-zinc-900 rounded-3xl mb-12 border border-zinc-800 items-center justify-center">
              <Text className="text-[#CCFF00] font-bold text-2xl opacity-50">Focusilo</Text>
            </View>
            <Text className="text-white text-3xl font-bold text-center mb-4 tracking-tight">
              {item.title}
            </Text>
            <Text className="text-zinc-400 text-base text-center leading-relaxed">
              {item.description}
            </Text>
          </View>
        )}
      />

      <View className="px-8 pb-12 pt-6">
        <View className="flex-row justify-center space-x-2 mb-8">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-8 bg-[#CCFF00]' : 'w-2 bg-zinc-800'
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          className="w-full bg-[#CCFF00] py-4 rounded-xl items-center justify-center"
        >
          <Text className="text-black font-bold text-lg">
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
