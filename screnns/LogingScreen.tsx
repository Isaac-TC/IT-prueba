import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ver, setver] = useState(false);
    const [correoRestablecer, setcorreoRestablecer] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('operaciones');
            })
            .catch((error) => {
                const errorCode = error.code;
                let titulo;
                let mensaje;
                console.log(errorCode);
                //console.log(errorMessage);

                
                switch (errorCode) {
                    case 'auth/missing-password':
                        titulo = 'Error en la contraseña';
                        mensaje = 'Contraseña incorrecta. Por favor, verifica los datos ingresados.';
                        break;
                    case 'auth/invalid-email':
                        titulo = 'Usuario no encontrado';
                        mensaje = 'Por favor verifica el email ingresado.';
                        break;
                    default:
                        titulo = 'Error';
                        mensaje = 'Verifica tus credenciales.';
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    function restablecer() {
        const auth = getAuth();
        sendPasswordResetEmail(auth, correoRestablecer)
            .then(() => {
                Alert.alert('Mensaje', 'Se ha enviado un correo para restablecer la contraseña.');
            })
            .catch((error) => {
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#aaa"
                onChangeText={(texto) => setcorreo(texto)}
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                onChangeText={(texto) => setContrasenia(texto)}
                secureTextEntry={true}
                autoCapitalize="none"
                value={contrasenia}
            />

            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setver(!ver)}>
                <Text style={styles.registerText}>¿Olvidaste la contraseña? Haz clic aquí</Text>
            </TouchableOpacity>

            <Modal visible={ver} transparent={true}>
    <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Restablecer Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu correo"
                placeholderTextColor="#aaa"
                onChangeText={(texto) => setcorreoRestablecer(texto)}
                value={correoRestablecer}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={restablecer}>
                    <Text style={styles.modalButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setver(!ver)}
                >
                    <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    input: {
        height: 50,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    registerText: {
        marginTop: 15,
        fontSize: 16,
        color: '#4CAF50',
        textDecorationLine: 'underline',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
   
    buttonContainer: {
        flexDirection: 'row', // Organiza botones en fila
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    modalButton: {
        flex: 1, // Distribuye espacio entre botones
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: 'red', // Estilo diferente para el botón de cerrar
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});