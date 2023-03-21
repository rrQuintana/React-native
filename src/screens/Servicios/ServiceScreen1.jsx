import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ServiceScreen1 = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>Esta es la página de servicios</Text>
      <Button
        onPress={() => navigation.navigate('Servicio')}
        title="Ir a Service2"
      />
    </View>
  )
}

export default ServiceScreen1