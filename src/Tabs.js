import { View, Text, Platform } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeStackScreen from "./stacks/HomeStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProductsStackScreen from "./stacks/ProductsStackScreen";
import ServicesStackScreen from "./stacks/ServicesStackScreen";
import ProfileStackScreen from "./stacks/ProfileStackScreen";
import { useColorScheme } from "nativewind";

const Tabs = () => {
  const Tab = ChooseTab();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  function ChooseTab() {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      return createMaterialBottomTabNavigator();
    } else {
      return createMaterialTopTabNavigator();
    }
  }

  const barBackgroundColor = colorScheme === 'dark' ? 'black' : 'white';


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#e91e63"
        inactiveColor="#aaa"
        barStyle={{ backgroundColor: barBackgroundColor  }}
        className="bg-white black:bg-black"
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Productos"
          component={ProductsStackScreen}
          options={{
            tabBarLabel: "Artículos",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="charity" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Servicios"
          component={ServicesStackScreen}
          options={{
            tabBarLabel: "Servicios",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="card-account-mail"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
