import { View, Text } from 'react-native'
import React from 'react'
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen