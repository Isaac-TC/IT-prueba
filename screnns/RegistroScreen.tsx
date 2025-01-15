import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set } from 'firebase/database';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [usuario, setusuario] = useState('');
  const [celular, setcelular] = useState('');

  function registro() {
    // Validar que todos los campos estén completos
    if (!correo || !contrasenia || !usuario || !celular) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Crear usuario con Firebase Authentication
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;

        // Guardar datos adicionales en Realtime Database
        set(ref(db, `usuarios/${user.uid}`), {
          usuario: usuario,
          celular: celular,
        })
          .then(() => {
            Alert.alert(
              "Registro exitoso",
              "Datos guardados correctamente. Redirigiendo a inicio de sesión.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Loging"), // Redirigir a la pantalla de inicio de sesión
                },
              ]
            );
          })
          .catch((error) => {
            Alert.alert("Error", "No se pudieron guardar los datos: " + error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        let mensaje;

        switch (errorCode) {
          case "auth/email-already-in-use":
            mensaje = "El correo ya está en uso. Intenta con otro.";
            break;
          case "auth/weak-password":
            mensaje = "La contraseña debe tener al menos 6 caracteres.";
            break;
          default:
            mensaje = "Error al registrar. Verifica los datos ingresados.";
            break;
        }

        Alert.alert("Error", mensaje);
      });
  }

  function limpiar() {
    setcorreo('');
    setContrasenia('');
    setusuario('');
    setcelular('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese Correo"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese Contraseña"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry={true}
        autoCapitalize="none"
        value={contrasenia}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese Usuario"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setusuario(texto)}
        autoCapitalize="none"
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Celular"
        placeholderTextColor="#aaa"
        onChangeText={(texto) => setcelular(texto)}
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={celular}
      />

      <TouchableOpacity style={styles.button} onPress={registro}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Loging")}>
        <Text style={styles.registerText}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontSize: 16,
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
});
