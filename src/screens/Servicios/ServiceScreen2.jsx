import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import Calificacion from "../Resourses/Calificacion";

const ProductsScreen2 = () => {
  const route = useRoute();
  const _id = route.params._id;
  const [publicacion, setPublicacion] = useState(null);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    fetch(`http://192.168.0.6:4000/api/publicaciones/info/${_id}`)
      .then((response) => response.json())
      .then((data) => setPublicacion(data))
      .catch((error) => console.error(error));
  }, [_id]);

  return (
    <ScrollView className={"w-full bbg-gray-200 dark:bg-black p-5"}>
      {!publicacion ? (
        <View className="flex  justify-center items-center w-screen h-screen dark:bg-zinc-900 ">
          <ActivityIndicator size="large" className="mb-60" />
        </View>
      ) : (
        <>
          <View className="bg-white">
            <Image
              source={{ uri: publicacion.publicacion.foto }}
              className="w-full h-72"
              style={{ resizeMode: "contain" }}
            />
          </View>
          <View className="mt-5 mb-32">
            <View className="flex-row mb-3">
              <Image
                source={{ uri: publicacion.autor.foto }}
                className="w-8 h-8 rounded-full mr-1"
              />
              <View className="flex">
                <Text
                  className={"text-sm font-bold dark:text-white justify-center"}
                >
                  {" " +
                    publicacion.autor.nombre +
                    " " +
                    publicacion.autor.apellido +
                    "  "}
                </Text>
                <Calificacion calificacion={publicacion.autor.calificacion} />
              </View>
            </View>

            <Text className={"text-3xl font-bold dark:text-white"}>
              {publicacion.publicacion.titulo}
            </Text>
            <Text className={"text-sm font-bold dark:text-white"}>
              {publicacion.publicacion.categoria}
            </Text>

            <Text
              numberOfLines={8}
              className={"text-base text-black/60 dark:text-white/70 mt-2"}
            >
              {publicacion.publicacion.contenido}
            </Text>
            <View className="mt-2">
              <Text className="text-black/60 dark:text-white/70">
                <MaterialCommunityIcons
                  name="account-sync"
                  className="text-black/60 dark:text-white/70"
                  size={26}
                />{" "}
                Intercambio por:
              </Text>
              <Text
                className={
                  "text-sm text-black/60 dark:text-white/70 pt-1 mx-1 mt-2"
                }
              >
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap" }}
                  className="mt-5"
                >
                  {publicacion.publicacion.precio.slice(0, 6).map((p) => (
                    <View style={{marginVertical: 5 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#E5E7EB",
                          borderRadius: 999,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          marginStart: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#374151",
                          }}
                        >
                          {p}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Text>
            </View>
            <Text className="my-3 text-xl font-bold dark:text-white">
              Comentarios
            </Text>
            <TextInput
              placeholder="Deja un comentario"
              name="nombre"
              className="dark:bg-white bg-gray-200 rounded-lg p-2"
            />
            <TouchableOpacity className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 p-3 w-5/12 mt-2">
              <Text className="text-white dark:text-black font-bold">
                Publicar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProductsScreen2;
