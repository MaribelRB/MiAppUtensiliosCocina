import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../config/firebase";

export default function PantallaRegistro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = async () => {
    try {
      console.log("Intentando registrar usuario:", email);
      //Alert.alert("Intentando registrar usuario:", email);
      if (email==='' || password==='') {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registro exitoso", "¡Usuario creado!");
      login();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.containerpadre}>
          <View style={styles.container}>
                
            <Text style={styles.title}>MasterEnCocina</Text>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                  <Image
                    source={require('../assets/images/cocina.jpg')}
                    style={styles.imagecabecera}
                  />
              </View>
            </View>
            <View>
              <Text style={styles.text}>Ingresa un correo y contraseña válida.</Text>
            </View>
            <View>
              <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} autoCapitalize="none" />
              <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            </View>
                  
            
              
            <TouchableOpacity style={styles.botonModal} onPress={handleRegistro}>
                <Text style={styles.botonTexto}>Registrarme</Text>
            </TouchableOpacity>
            <View style={{ height: 180 }} />
            <View style={styles.footer}>
              <Text style={styles.footerLeft}>Maribel Romero Bautista</Text>
              <Text style={styles.footerRight}>Aplicaciones Móviles</Text>
            </View>
          </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
    containerpadre: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#C8102E",
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  imageContainer: {
    marginTop:40,
    width: '100%',
    height: 100,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    borderBottomRightRadius: 160,
    borderBottomLeftRadius: 160,
    overflow: "hidden", 
  },
  modal:{
    width: "100%",
    height: 242,
    backgroundColor:"#C8102E",
    alignItems: "center",
    borderRadius:31,
  },
  textcontmodal:{
    marginTop: 20,
  },
  inputLabel:{
  color: "#ffffff",
   textAlign: "center",
  },
  contmodalinput:{
  width:"80%",
  height:150,
  marginTop:15,
  },
  input:{
    marginTop: 15,
    paddingLeft: 10,
    width: "100%",
    height: 40,
    textAlign: "left",
    borderWidth: 1,            
    borderColor: "#b0b0b0",
    borderRadius: 8, 
    backgroundColor: "#ffffff"
  },

  textContainer:{
    marginTop:40,
    paddingLeft:10,
    paddingTop:10,
    width: 221,
    height: 74,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 160,
    borderBottomRightRadius: 160,
    borderBottomLeftRadius: 0,
    borderWidth: 2,          // grosor del borde
    borderColor: "#C8102E",
  },
  text:{
    fontSize: 16,
    color: "#555",
    alignItems:'center',
  },
  imagecabecera:{
    width: '100%',
    height: 100,
    resizeMode: "cover",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom:60,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    marginTop:40,
  },
  footerLeft: {
    fontSize: 14,
    color: "#555",
  },
  footerRight: {
    fontSize: 14,
    color: "#555",
  },
    row: {
    marginTop:20,
    marginBottom:60,
    flexDirection: 'row',      // Alinea horizontalmente
    textAlign: 'center',      // Centra verticalmente imagen y texto
  },
   botonModal: {
    backgroundColor: "#C8102E",     // Fondo rojo
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems:"center",            // Borde blanco
  },
  botonTexto: {
    color: "#ffffff",               // Letras blancas
    fontWeight: "bold",
    fontSize: 16,
    textAlign:"center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",  // Fondo oscuro semitransparente
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#C8102E",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
