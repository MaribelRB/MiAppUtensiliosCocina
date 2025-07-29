// screens/PantallaInicio.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BatteryStatus from "../components/BatteryStatus";

export default function PantallaInicio() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const cerrarModal = () => {
    setModalVisible(false);
    setNombre("");
  };

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
    };
    obtenerUsuario();
  }, []);
  
 
  return (
    <ScrollView contentContainerStyle={styles.containerpadre}>
      <View style={styles.container}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16 }}>
            {usuario
              ? `¡Hola: ${usuario.email}!`
              : "No hay usuario guardado"}
          </Text>
        </View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="menu" size={32} color="#C8102E" />
      </TouchableOpacity>
      <BatteryStatus />
      
      <Text style={styles.title}>MasterEnCocina</Text>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/cocina.jpg')}
              style={styles.imagecabecera}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>El mundo de la cocina desde las herramientas.</Text>
          </View>
      </View>

      <Text style={styles.description}>
        Aquí podrás encontrar información de los utensilios más utilizados dentro de las cocinas profesionales, podrás encontrar información sobre las categorías de estos mismos, así como los detalles y curiosidades de ellos.
      </Text>
      <View style={styles.modal}>
       <View style={styles.textcontmodal}>
         <Text style={styles.inputLabel}>Agrega un cometario de la app. ¡Sería de mucha ayuda!</Text>
       </View>
       <View style={styles.contmodalinput}>
            <TextInput
              style={styles.input}
              placeholder="Escribe aquí..."
              value={nombre}
              onChangeText={setNombre}
            />
        </View>
      </View>
      <TouchableOpacity style={styles.botonModal} onPress={() => setModalVisible(true)}>
         <Text style={styles.botonTexto}>Enviar</Text>
      </TouchableOpacity>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cerrarModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¡Gracias por tu comentario!</Text>
              <Pressable style={styles.buttonClose} onPress={cerrarModal}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
    width: 111,
    height: 74,
    borderTopLeftRadius: 160,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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
    width:"100%",
    height:"100%",
    textAlign: "center",
    borderColor: "blue",
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
    width: 111,
    height: 74,
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
