import {
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";
import LoginScreen from "./LoginScreen";
import Calificacion from "../Resourses/Calificacion";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../firebase.config";
import { REACT_APP_SERVER_HOST } from "@env";

const PerfilScreen = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { setUser } = useContext(AuthContext);
  const { isUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);
  const User = isUser;
  const route = useRoute();
  const _id = route.params._id;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  //Peticion asincrona get a http://192.168.0.4:4000/api/usuarios/${User._id}/publicaciones
  useEffect(() => {
    fetch(`http://${REACT_APP_SERVER_HOST}/api/publicaciones/usuario/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
      });
  }, []);

  return (
    <>
      {isUser ? (
        <ScrollView className={"w-full bbg-gray-200 dark:bg-black p-5"}>
          <Text className="text-sm text-slate-500 mt-5">
            {" " + User.email}
          </Text>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className="flex flex-col justify-center items-center h-full w-full">
              <View className="flex flex-col justify-center items-center bg-white dark:bg-black/90 rounded-xl p-5">
                <Text className="text-2xl font-bold dark:text-white">
                  Configuración
                </Text>
                <View className="m-2 rounded-xl bg-zinc-200 p-7 py-3">
                  <Text className="text-black font-bold self-center">
                    Modo oscuro
                  </Text>
                  <Switch
                    className="self-center"
                    value={colorScheme === "dark"}
                    onChange={toggleColorScheme}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={handleSignOut}
                    className="flex-row justify-center rounded-xl bg-zinc-200 p-4 py-3 mt-2 mx-2"
                  >
                    <Text className="text-black dark:text-black font-bold">
                      Cerrar sesión{" "}
                      <MaterialCommunityIcons
                        name="logout"
                        className="text-black/60 dark:text-white"
                        size={15}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-center items-center mt-5">
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    className="flex-row justify-center rounded-xl bg-black/90 dark:bg-white p-4 py-3 mt-2 mx-2"
                  >
                    <Text className="text-white dark:text-black font-bold">
                      Aceptar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View className="flex-row  mb-3 mt-5 justify-between">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-row mt-2 mx-2"
            >
              <Text className="text-black dark:text-white font-bold ">
                <MaterialCommunityIcons
                  name="sort-variant"
                  className="text-black/60 dark:text-white/70"
                  size={25}
                />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddProduct", {
                  _id: User._id,
                })
              }
              className="flex-row mt-2 mx-2 border-solid border-2 border-black dark:border-white rounded-xl px-2 pb-1"
            >
              <Text className="text-xl text-black dark:text-white font-bold">
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex mb-3 justify-center items-center mt-10">
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
          <Text className="text-3xl font-bold dark:text-white self-center mt-12 mb-5">
            Mis publicaciones
          </Text>
          {publicaciones ? (
            <>
              {publicaciones.map((publicacion) => (
                <View
                  key={publicacion._id}
                  className="flex flex-col justify-center items-center m-2 bg-white dark:bg-white/10 rounded-xl px-5 pb-5 pt-2 mb-10"
                >
                  <View className="flex justify-between items-center w-full">
                    <View className="flex w-full mb-3 items-center border-2 border-transparent border-b-zinc-700">
                      <Text className="text-sm font-bold mb-1 dark:text-white">
                        {publicacion.tipo}
                      </Text>
                    </View>

                    <View className="flex-row w-full">
                      <View className="flex w-8/12">
                        <Text
                          numberOfLines={1}
                          className="text-xl self-start font-bold dark:text-white"
                        >
                          {publicacion.titulo}
                        </Text>
                        <Text className="text-sm self-start mb-2 font-bold dark:text-white">
                          {publicacion.categoria}
                        </Text>
                      </View>
                      <View className="flex-row ml-8 w-4/12">
                        <TouchableOpacity
                        className="mr-2 mt-2"
                          onPress={() =>
                            navigation.navigate("EditProduct", {
                              _id: publicacion._id,
                            })
                          }
                        >
                          <Text className="text-black/60 dark:text-white/70">
                            <MaterialCommunityIcons name="pencil" size={30} />
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        className="mt-2"
                          onPress={() =>
                            navigation.navigate("EditProduct", {
                              _id: publicacion._id,
                            })
                          }
                        >
                          <Text className="text-black/60 dark:text-white/70">
                            <MaterialCommunityIcons name="delete" size={30} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="flex-row w12/12">
                      <View className="w-5/12">
                        <Image
                          source={{ uri: publicacion.foto }}
                          className="w-16 h-16 rounded-full mr-1 self-center mb-2"
                        />
                      </View>
                      <View className="w-7/12">
                        <Text className="text-sm font-bold dark:text-white">
                          {publicacion.precio.length > 3 ? (
                            <>
                              {publicacion.precio.slice(0, 2).map((p) => (
                                <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 px-1 py-0.5">
                                  <Text
                                    className={
                                      "text-sm font-semibold dark:text-zinc-300"
                                    }
                                  >
                                    {p}
                                  </Text>
                                </View>
                              ))}
                              <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 px-1 py-0.5">
                                <Text
                                  className={
                                    "text-sm font-semibold dark:text-zinc-300"
                                  }
                                >
                                  ...
                                </Text>
                              </View>
                            </>
                          ) : (
                            publicacion.precio.map((p) => (
                              <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 px-1 py-0.5">
                                <Text
                                  className={
                                    "text-sm font-semibold dark:text-zinc-300 mt-2"
                                  }
                                >
                                  {p}
                                </Text>
                              </View>
                            ))
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex flex-row justify-center items-center w-full">
                    <Text
                      numberOfLines={5}
                      className="text-sm font-bold dark:text-white"
                    >
                      {publicacion.contenido}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text
              className="text-2xl text-black/40 dark:text-white
                /40  self-center"
            >
              Sin publicaciones
            </Text>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="flex flex-col justify-center items-center h-full w-full"
        />
      )}
    </>
  );
};

export default PerfilScreen;
