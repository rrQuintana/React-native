import { View, Text, Image, TouchableOpacity } from "react-native";
import * as React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const ProductCart = ({ _id, foto, categoria, titulo, contenido, precio }) => {
  const navigation = useNavigation();

  return (
    <View className={"w-full bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5"}>
      <Text
        className={"text-sm font-bold text-black/60 dark:text-white/70 mb-4"}
      >
        {categoria}
      </Text>
      <View className="bg-white rounded-xl">
        <Image
          source={{ uri: foto }}
          className={"w-full h-72"}
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="mt-5">
        <Text className={"text-lg font-bold dark:text-white"}>{titulo}</Text>
        <Text
          numberOfLines={2}
          className={"text-base text-black/60 dark:text-white/70 mt-2"}
        >
          {contenido}
        </Text>
        {
          // View que pone todo en el centro
        }
        <View className="justify-center items-center mt-2">
          <Text
            className={
              "text-sm text-black/60 dark:text-white/70 pt-1 mx-1 mt-2"
            }
          >
            <MaterialCommunityIcons
              name="account-sync"
              className="text-black/60 dark:text-white/70"
              size={26}
            />
            <Text className="text-black/60 dark:text-white/70">
              {" "}
              Intercambio por:
            </Text>
          </Text>
          <View className="flex-row items-center mt-4">
            {precio.length > 3 ? (
              <>
                {precio.slice(0, 2).map((p) => (
                  <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 pb-2 px-2 mx-1">
                    <Text
                      className={
                        "text-md font-semibold dark:text-zinc-300 mt-2"
                      }
                    >
                      {p}
                    </Text>
                  </View>
                ))}
                <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 pb-2 px-2 mx-1">
                  <Text
                    className={"text-md font-semibold dark:text-zinc-300 mt-2"}
                  >
                    ...
                  </Text>
                </View>
              </>
            ) : (
              precio.map((p) => (
                <View className="flex-row items-center rounded-full bg-stone-200 dark:bg-stone-600 pb-2 px-2 mx-1">
                  <Text
                    className={"text-md font-semibold dark:text-zinc-300 mt-2"}
                  >
                    {p}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
        <TouchableOpacity
          className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 p-3 w-10/12 self-center mt-5"
          onPress={() => navigation.navigate("ServiceDetails", { _id: _id })}
        >
          <Text className="text-white dark:text-black font-bold">Ver más</Text>
        </TouchableOpacity>
        {/*
          <TouchableOpacity className="flex-row justify-center rounded-full bg-black/90 dark:bg-white/90 p-3 self-center mt-5 mx-1">
            <Text className="text-white dark:text-black font-bold">
              <MaterialCommunityIcons
                name="cards-heart"
                color={"#F00"}
                size={26}
              />
            </Text>
          </TouchableOpacity>
            */}
      </View>
    </View>
  );
};

export default ProductCart;
