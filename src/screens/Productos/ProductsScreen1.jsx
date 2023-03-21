import {
  View,
  Text,
  Button,
  Switch,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import ProductList from "./ProductList";

const ProductsScreen1 = () => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-200 dark:bg-black">
      <View className="flex-row w-full gap-5 items-center">
        <Text className="dark:text-white font-bold">NewCollection</Text>

        <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
      </View>
      <ProductList />
      <Button
        onPress={() => navigation.navigate("Producto")}
        title="Ir a Product2"
      />
      <StatusBar barStyle={"dark"} />
    </SafeAreaView>
  );
};

export default ProductsScreen1;
