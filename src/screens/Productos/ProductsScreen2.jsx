import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import Calificacion from "../Resourses/Calificacion";
import { AuthContext } from "../../AuthContext";
import { REACT_APP_SERVER_HOST } from "@env";

const ProductsScreen2 = (prps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const _id = route.params._id;
  const [publicacion, setPublicacion] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const { isUser } = useContext(AuthContext);
  const [lastCommentTime, setLastCommentTime] = useState(new Date());
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [idUsuario, setIdUsuario] = useState("Sin usuario");
  const [uriLink, setUriLink] = useState(
    "https://scontent.foax1-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_eui2=AeHRCG_9TRy9dX-Hm35n5nSiso2H55p0AlGyjYfnmnQCUbg31lqjTm2yCfT8j7X3uJ0hr1l-bogaiVyxaGQqK_M0&_nc_ohc=102P-6BNVGYAX_i5QuB&_nc_ht=scontent.foax1-1.fna&oh=00_AfA6APGIrvxYjRvtN6XI9FkUva_4Ls1XtV5WN_wKuQFEIA&oe=64555138"
  );
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (isUser) {
      setUriLink(isUser.foto);
      setIdUsuario(isUser._id);
    }
    fetch(`http://${REACT_APP_SERVER_HOST}/api/publicaciones/info/${_id}`)
      .then((response) => response.json())
      .then((data) => setPublicacion(data))
      .catch((error) => console.error(error));
  }, [_id]);

  async function reloadData() {
    fetch(`http://${REACT_APP_SERVER_HOST}/api/publicaciones/info/${_id}`)
      .then((response) => response.json())
      .then((data) => setPublicacion(data))
      .catch((error) => console.error(error));
  }

  async function handleDelete(_id) {
    try {
      fetch(`http://${REACT_APP_SERVER_HOST}/api/comentarios/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      reloadData();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleComent() {
    if (isUser) {
      try {
        // Verificar si el usuario ha alcanzado el límite de comentarios por cada 10 minutos
        const currentTime = new Date();
        const timeDifference =
          currentTime.getTime() - lastCommentTime.getTime();
        const minutesDifference = Math.floor(timeDifference / 1000 / 60);
        if (minutesDifference < 10 && commentsCount >= 3) {
          Alert.alert(
            "Limite de comentarios alcanzado",
            "Solo puedes hacer 3 comentarios cada 10 minutos"
          );
          return;
        }

        const response = await fetch(
          `http://${REACT_APP_SERVER_HOST}/api/comentarios`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contenido: comentarios,
              publicacion: _id,
              autor: isUser._id,
            }),
          }
        );
        const json = await response.json();

        // Actualizar la variable lastCommentTime con la hora actual
        setLastCommentTime(new Date());
        setCommentsCount(commentsCount + 1); // Incrementar la cuenta de comentarios del usuario

        Alert.alert("Comentario enviado");
        reloadData();
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert(
        "Debes iniciar sesión para comentar",
        "Crea una cuenta o inicia sesión en 'Perfil' para distrutar de Swapit"
      );
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-200 dark:bg-black">
      <View className="static bg-white dark:bg-black">
        <TouchableOpacity className="w-12" onPress={() => navigation.goBack()}>
        <Text className="dark:text-white ml-5 py-2">
          <MaterialCommunityIcons name="chevron-left-circle" size={25} />
        </Text>
      </TouchableOpacity>
      </View>
      
      <ScrollView className={" bg-white dark:bg-black"}>
        {!publicacion ? (
          <View className="flex justify-center items-center w-screen h-screen dark:bg-zinc-900 ">
            <ActivityIndicator size="large" className="mb-60" />
          </View>
        ) : (
          <>
            <View className="bg-black w-full">
              <Image
                source={{ uri: publicacion.publicacion.foto }}
                className="w-full h-72"
                style={{ resizeMode: "contain" }}
              />
              <View className="p-5 rounded-t-3xl bg-white dark:bg-zinc-900">
                <TouchableOpacity
                  className="flex-row mb-3"
                  onPress={() =>
                    navigation.navigate("Profile", {
                      _id: publicacion.autor._id,
                    })
                  }
                >
                  <Image
                    source={{ uri: publicacion.autor.foto }}
                    className="w-8 h-8 rounded-full mr-1"
                  />
                  <View className="flex">
                    <Text
                      className={
                        "text-sm font-bold dark:text-white justify-center"
                      }
                    >
                      {" " +
                        publicacion.autor.nombre +
                        publicacion.autor.apellido +
                        " "}
                      <MaterialCommunityIcons
                        name="check-decagram"
                        className="text-black/60 dark:text-white/70"
                        size={12}
                      />
                    </Text>
                    <Calificacion
                      calificacion={publicacion.autor.calificacion}
                    />
                  </View>
                </TouchableOpacity>

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
                        <View style={{ maxWidth: "50%", marginVertical: 5 }}>
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
                <View className="flex-row">
                  <Image
                    source={{ uri: uriLink }}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <TextInput
                    placeholder="Deja un comentario"
                    name="nombre"
                    className="dark:bg-white bg-gray-200 rounded-lg p-2 w-60 "
                    onChangeText={(text) => setComentarios(text)}
                  />
                  <TouchableOpacity
                    className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/50 p-2 w-8 ml-2"
                    onPress={handleComent}
                  >
                    <MaterialCommunityIcons
                      name="send"
                      color={isUser ? "#fff" : "#AAA"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>

                <View className="mt-5">
                  {publicacion.comentarios.map((comentario) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Profile", {
                          _id: comentario.autor._id,
                        })
                      }
                    >
                      <View className="flex-row mb-4" key={comentario._id}>
                        <Image
                          source={{ uri: comentario.autor.foto }}
                          className="w-8 h-8 rounded-full mr-1"
                        />
                        <View className="flex">
                          <Text
                            className={
                              "text-sm font-bold dark:text-white justify-center"
                            }
                          >
                            {" " +
                              comentario.autor.nombre +
                              comentario.autor.apellido +
                              "  "}
                          </Text>
                          <Text className="dark:text-white">
                            {" "}
                            {comentario.contenido}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            handleDelete(comentario._id);
                          }}
                        >
                          {comentario.autor._id === idUsuario && (
                            <MaterialCommunityIcons
                              name="delete"
                              color={"#c00"}
                              size={20}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen2;
