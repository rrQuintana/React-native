import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [registro, setRegistro] = useState(false);

  //Constructor para usuario default
  const Usuario = {
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "Sin asignar",
    contacto: "Sin asignar",
    foto: "",
    calificacion: "Sin calificación",
    reportes: 0,
    estatus: 1,
  };
  const [usuario, setUsuario] = useState(Usuario);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleLogin = () => {
    // Lógica de inicio de sesión
  };

  const handleRegister = () => {
    // Lógica de registro
  };

  return (
    <View style={styles.container} className="bg-white dark:bg-black">
      {registro ? (
        <View>
          <Text style={styles.title} className=" dark:text-white">
            Registrarse
          </Text>
          <TextInput
            id="usuario-nombre"
            name="nombre"
            placeholder="Correo electrónico"
            onChangeText={capturarDatos}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Apellido"
            name="apellido"
            onChangeText={capturarDatos}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Teléfono"
            name="telefono"
            onChangeText={capturarDatos}
            className="dark:bg-white"
            style={styles.input}
            maxLength={10}
          />
          <TextInput
            placeholder="Correo electrónico"
            name="email"
            onChangeText={capturarDatos}
            className="dark:bg-white"
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            name="password"
            secureTextEntry
            onChangeText={capturarDatos}
            style={styles.input}
            className="dark:bg-white"
          />
          <Button
            title="Registrarse"
            onPress={() => {
              console.log("Hola mundo!");
            }}
          />
          <Button
            title="Iniciar sesión"
            onPress={() => {
              setRegistro(!registro);
            }}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title} className=" dark:text-white">
            Iniciar sesión
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            className="dark:bg-white"
            onChangeText={capturarDatos}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            className="dark:bg-white"
            secureTextEntry
            onChangeText={capturarDatos}
          />
          <Button
            title="Iniciar sesión"
            onPress={() => {
              Alert.alert("Hola mundo!", "Estás apunto de hacer login");
            }}
          />
          <Button
            title="Registrarse"
            onPress={() => {
              setRegistro(!registro);
            }}
          />
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
