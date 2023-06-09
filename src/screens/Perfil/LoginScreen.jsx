import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, Switch } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "../../firebase.config";
import { AuthContext } from "../../AuthContext";
import { useColorScheme } from "nativewind";
import { REACT_APP_SERVER_HOST } from '@env';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  const [registro, setRegistro] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { isUser } = useContext(AuthContext);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //Constructor para usuario default
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email.text, password.text)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert(
          `Bienvenido a Swapit!`,
          `Hola ${nombre.text}, ahora puedes usar Swapit para intercambiar artículos y servicios con tus compañeros universitarios, a continuación inicia sesión`
        );
        setRegistro(!registro);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  //Función para guardar los datos del usuario en mongo
  const guardarData = async (e) => {
    try {
      //Enviar una solicitud POST para guardar los datos en la base de datos
      fetch(`http://${REACT_APP_SERVER_HOST}/api/usuarios`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.text,
          apellido: apellido.text,
          telefono: telefono.text,
          email: email.text,
          direccion: direccion.text,
          contacto: "Sin asignar",
          foto: "https://scontent.foax1-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_eui2=AeHRCG_9TRy9dX-Hm35n5nSiso2H55p0AlGyjYfnmnQCUbg31lqjTm2yCfT8j7X3uJ0hr1l-bogaiVyxaGQqK_M0&_nc_ohc=102P-6BNVGYAX_i5QuB&_nc_ht=scontent.foax1-1.fna&oh=00_AfA6APGIrvxYjRvtN6XI9FkUva_4Ls1XtV5WN_wKuQFEIA&oe=64555138",
          calificacion: 0,
          reportes: 0,
          estatus: 1,
        }),
      });
      handleCreateAccount();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email.text, password.text)
      .then(() => {
        CargarDatos();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  //Cargar datos del usuario a todos los componentes
  async function CargarDatos() {
    try {
      const campoBuscado = email.text; //Correo del usuario
      fetch(`http://${REACT_APP_SERVER_HOST}/api/usuarios/get/${campoBuscado}`, {
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);          
          Alert.alert("Bienvenido a Swapit!", `Hola ${data.nombre}, ahora puedes usar Swapit para intercambiar artículos y servicios con tus compañeros universitarios.`);
          navigation.navigate("Profile", {
            _id: data._id
          })
        });      
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  return (
    <View style={styles.container} className="bg-white dark:bg-black">
      <Switch
        value={colorScheme === "dark"}
        onChange={toggleColorScheme}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />

      <Text className="text-base text-slate-500 self-center mb-5">
        Modo oscuro
      </Text>
      {registro ? (
        <View>
          <Text style={styles.title} className=" dark:text-white">
            Registrarse
          </Text>
          <TextInput
            placeholder="Correo electrónico"
            name="email"
            onChangeText={(text) => setEmail({ text })}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            name="password"
            onChangeText={(text) => setPassword({ text })}
            style={styles.input}
            className="mt-3 dark:bg-white"
          />
          <TextInput
            placeholder="Nombre"
            name="nombre"
            onChangeText={(text) => setNombre({ text })}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Apellido"
            name="apellido"
            onChangeText={(text) => setApellido({ text })}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Telefono"
            name="telefono"
            onChangeText={(text) => setTelefono({ text })}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Institución educativa"
            name="direccion"
            onChangeText={(text) => setDireccion({ text })}
            className="dark:bg-white"
            style={styles.input}
          />

          <Button title="Registrarse" onPress={guardarData} />

          <Text className="dark:text-white text-center mt-3">
            Ya tienes cuenta?{" "}
            <Text
              onPress={() => {
                setRegistro(!registro);
              }}
              className="text-blue-500"
            >
              Inicia seción
            </Text>{" "}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title} className=" dark:text-white">
            Iniciar sesión
          </Text>
          <TextInput
            onChangeText={(text) => setEmail({ text })}
            style={styles.input}
            placeholder="Correo electrónico"
            className="dark:bg-white"
          />
          <TextInput
            onChangeText={(text) => setPassword({ text })}
            style={styles.input}
            placeholder="Contraseña"
            className="dark:bg-white"
            secureTextEntry
          />
          <Button
            className="mt-5 "
            title="Iniciar sesión"
            onPress={handleLogin}
          />
          <Text className="mt-3 dark:text-white text-center">
            No tienes cuenta?{" "}
            <Text
              onPress={() => {
                setRegistro(!registro);
              }}
              className="text-blue-500 mt-5"
            >
              Regístrate
            </Text>{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    minWidth: "80%",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
