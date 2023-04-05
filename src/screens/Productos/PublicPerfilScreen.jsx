import {
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useColorScheme } from "nativewind";
import { useRoute } from "@react-navigation/native";
import Calificacion from "../Resourses/Calificacion";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { REACT_APP_SERVER_HOST } from '@env';

const PublicPerfilScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const route = useRoute();
  const _id = route.params._id;

  const [User, setUser] = React.useState([]);

  useEffect(() => {
    fetch(`http://${REACT_APP_SERVER_HOST}/api/usuarios/${_id}/publicaciones`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [_id]);

  return (
    <ScrollView className={"w-full bbg-gray-200 dark:bg-black p-5"}>
      <>
        {!User.usuario ? (
          <View className="flex justify-center items-center w-screen h-screen dark:bg-zinc-900 ">
            <ActivityIndicator size="large" className="mb-60" />
          </View>
        ) : (
          <>
            <>
              <View className="flex-row mb-3 justify-center items-center mt-5">
                <Image
                  source={{ uri: User.usuario.foto }}
                  className="w-20 h-20 rounded-full mr-1 self-center mb-2"
                />
                  <View className="flex">
                    <Text className="text-xl font-bold dark:text-white justify-center">
                      {" " +
                        User.usuario.nombre +
                        " " +
                        User.usuario.apellido +
                        " "}
                      <MaterialCommunityIcons
                        name="check-decagram"
                        className="text-black/60 dark:text-white/70"
                        size={20}
                      />
                    </Text>
                    <Calificacion
                      calificacion={User.usuario.calificacion}
                      size={18}
                      cl="ml-1"
                    />
                    <Text className=" dark:text-white ml-1 mt-1">
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        className="text-black/60 dark:text-white/70"
                        size={15}
                      />{" "}
                      {User.usuario.direccion}
                    </Text>
                  </View>
              </View>
              <Text className="text-sm font-bold dark:text-white self-center">
                {User.usuario.telefono}
              </Text>
              <Text className="text-sm font-bold dark:text-white self-center">
                {User.usuario.contacto}
              </Text>
              <Text className="text-3xl font-bold dark:text-white self-center mt-10">
                Productos
              </Text>
            </>
          </>
        )}
      </>
    </ScrollView>
  );
};

export default PublicPerfilScreen;
