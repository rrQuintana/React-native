import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen1 = () => {
  const navigation = useNavigation();
  const image = {
    uri: "https://firebasestorage.googleapis.com/v0/b/swapper-stu.appspot.com/o/Assets%2Fproducts-banner-image.png?alt=media&token=387d9e84-f931-4bfa-b3a9-58c83a8ae221",
  };

  //Funciones para animar texto
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    "Intercambia",
    "Ahorra",
    "Recicla",
    "Cambia",
    "Adquiere",
    "Ofrece",
    "Encuentra",
  ];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(100);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="bg-slate-200 dark:bg-neutral-900">
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          className="h-screen"
        >
          <View>
            <Text style={styles.text}>
              Lo que necesitas para tus estudios en un solo lugar
            </Text>
            <Text style={styles.text2}>{text}</Text>
          </View>
        </ImageBackground>
        <View className="flex items-center espacios">
          <View className="w-11/12 md:w-10/12 xl:w-8/12">
            <View
              className="shadow-md p-3 items-center justify-center rounded-3xl"
              style={styles.ContenedorNegro}
            >
              <View className="w-9/12 md:w-10/12 xl:w-10/12 mt-5">
                <Text className="text-center text-2xl font-bold text-white mb-5">
                  Hola, como estás?
                </Text>
                <Text className="justify-center text-gray-200 font-semibold">
                  Bienvenido a nuestra página de trueques estudiantiles, donde
                  los estudiantes pueden compartir y obtener recursos de manera
                  eficiente y económica. Aquí, podrás intercambiar libros,
                  herramientas, y otros artículos útiles para tus estudios con
                  tus compañeros de clase y construir una comunidad más
                  colaborativa y sostenible. Únete a nosotros y descubre la
                  belleza de la economía compartida en el ámbito estudiantil.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex items-center">
          <View className="w-11/12 md:w-10/12 xl:w-8/12">
            <Text className="text-center font-bold text-2xl">Servicios</Text>
            <View className="d-flex m-3 flex-wrap justify-content-center align-items-center bg-black p-10">
              <View className="service-bx">
                <Text className="text-white">Icon</Text>
                <Text className="text-white">Cuentas de Usuasdfario</Text>
                <Text className="text-white">
                  Crea una cuenta personalizada donde guardes tus publicaciones,
                  intercambios.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    width: "100%",
    color: "black",
    fontSize: 70,
    lineHeight: 84,
    fontWeight: "bold",
    paddingTop: -30,
    maxWidth: 500,
    padding: 20,
  },
  text2: {
    width: "100%",
    color: "#666",
    fontSize: 50,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  ContenedorNegro: {
    backgroundColor: "#000000",
    padding: 30,
    marginTop: 80,
    marginBottom: 80,
  },
});

export default HomeScreen1;
