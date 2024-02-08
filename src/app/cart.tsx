import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { TProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "5583998932212";

const Cart: React.FC = () => {
  const [adress, setAdress] = useState<string>("");

  const { products, removeFromCart, clearCart } = useCartStore();

  const navigation = useNavigation();

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

  const handleSendOrder = () => {
    if (adress.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const cartProducts = products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
     🍔 NOVO PEDIDO 🍔

      \n Entregar em: ${adress}

      ${cartProducts}

      \n Valor total: ${total}
    `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    clearCart();
    navigation.goBack();
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

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
              onChangeText={setAdress}
              blurOnSubmit
              onSubmitEditing={handleSendOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleSendOrder}>
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
