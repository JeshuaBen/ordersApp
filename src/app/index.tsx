import { useState, useRef } from "react";
import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, Text, FlatList, SectionList } from "react-native";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { Product } from "@/components/product";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0]
  );

  const sectionListRef = useRef<SectionList>(null);

  const handleSelectedCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
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

      <SectionList
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Product data={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ref={sectionListRef}
      />
    </View>
  );
};

export default Home;
