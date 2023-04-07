import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native";

const AddProductScreen = () => {
  const route = useRoute();
  const _id = route.params._id;

  return (
    <View>
      <Text>AddProductScreen: {_id}</Text>
    </View>
  )
}

export default AddProductScreen