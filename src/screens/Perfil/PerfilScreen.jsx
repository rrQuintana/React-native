import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PerfilScreen = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>PerfilScreen</Text>
      <Button
        onPress={() => navigation.navigate('AddProduct')}
        title="Añadir Producto"
      />
      <Button
        onPress={() => navigation.navigate('AddService')}
        title="Añadir Servicio"
      />
    </View>
  )
}

export default PerfilScreen