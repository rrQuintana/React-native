import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilScreen from '../screens/Perfil/PerfilScreen';
import AddProductScreen from '../screens/Perfil/AddProductScreen';
import AddServiceScreen from '../screens/Perfil/AddServiceScreen';

const ProfileStackScreen = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <ProfileStack.Screen name="Profile" component={PerfilScreen} />
      <ProfileStack.Screen name="AddProduct" component={AddProductScreen} />
      <ProfileStack.Screen name="AddService" component={AddServiceScreen} />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackScreen