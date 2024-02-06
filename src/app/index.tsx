import { Header } from "@/components/header";
import { View, Text } from "react-native";

const Home = () => {
  return (
    <View className="flex-1">
      <Header title="Faça seu pedido" amountOfItemsInTheCart={3} />
    </View>
  );
};

export default Home;
