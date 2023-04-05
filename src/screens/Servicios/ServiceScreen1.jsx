import {
  View,
  Text,
  Button,
  Switch,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import ServiceList from "./ServiceList";

const ServiceScreen1 = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-200 dark:bg-black">
      <ServiceList />
      <Button
        onPress={() => navigation.navigate("Producto")}
        title="Ir a Product2"
      />
      <StatusBar barStyle={"dark"} />
    </SafeAreaView>
  )
}

export default ServiceScreen1