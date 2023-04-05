import {
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";
import LoginScreen from "./LoginScreen";
import Calificacion from "../Resourses/Calificacion";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PerfilScreen = () => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { isUser } = useContext(AuthContext);

  const User = isUser;

  return (
    <>
      {isUser ? (
        <ScrollView className={"w-full bbg-gray-200 dark:bg-black p-5"}>
          <Text className="text-sm text-slate-500 mt-5">
            {" " + User.email}
          </Text>
          <View className="flex mb-3 justify-center items-center mt-10">
            <Switch
              value={colorScheme === "dark"}
              onChange={toggleColorScheme}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />

            <Text className="text-base text-slate-500 self-center mb-5">
              Modo oscuro
            </Text>
            <Image
              source={{ uri: User.foto }}
              className="w-36 h-36 rounded-full mr-1 self-center mb-2"
            />

            <Calificacion
              calificacion={User.calificacion}
              size={25}
              cl="self-center"
            />
            <View className="flex mt-3">
              <Text className="text-3xl font-bold dark:text-white justify-center mb-2">
                {" " + User.nombre + " " + User.apellido + "  "}
              </Text>
              <Text className=" dark:text-white self-center">
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  className="text-black/60 dark:text-white/70"
                  size={15}
                />{" "}
                {User.direccion}
              </Text>
            </View>
          </View>
          <Text className="text-sm font-bold dark:text-white self-center">
            {User.telefono}
          </Text>
          <Text className="text-sm font-bold dark:text-white self-center">
            {User.contacto}
          </Text>
          <Text className="text-3xl font-bold dark:text-white self-center mt-10">
            Agregar
          </Text>
          <View className="flex-row mb-3 mt-5 justify-center items-center">
            <TouchableOpacity onPress={() => navigation.navigate("AddProduct")} className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 px-10 py-5 mt-2 mx-2">
              <Text className="text-white dark:text-black font-bold">
                Artículo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 px-10 py-5 mt-2 mx-2">
              <Text className="text-white dark:text-black font-bold">
                Servicio
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default PerfilScreen;
