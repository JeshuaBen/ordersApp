import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { TProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { View, Text, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Cart: React.FC = () => {
  const { products, removeFromCart } = useCartStore();

  const total = formatCurrency(
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  const handleRemoveProduct = (product: TProductCartProps) => {
    Alert.alert(
      "Remover produto",
      `Deseja remover o produto ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
        },

        {
          text: "Remover",
          onPress: () => removeFromCart(product.id),
        },
      ]
    );
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {products.length > 0 ? (
              <View className="border-b border-slate-700">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleRemoveProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>

              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
};

export default Cart;
