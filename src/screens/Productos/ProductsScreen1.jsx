import {
  View,
  Text,
  Button,  
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import ProductList from "./ProductList";

const ProductsScreen1 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-200 dark:bg-black">      
      <ProductList />
      <StatusBar barStyle={"dark"} />
    </SafeAreaView>
  );
};

export default ProductsScreen1;
