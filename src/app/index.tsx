import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, Text, FlatList } from "react-native";
import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0]
  );

  const handleSelectedCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <View className="flex-1">
      <Header title="Faça seu pedido" amountOfItemsInTheCart={3} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handleSelectedCategory(item)}
            isSelected={selectedCategory === item}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
