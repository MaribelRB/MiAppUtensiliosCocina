// screens/PantallaInicio.js
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { captureRef } from 'react-native-view-shot';
import { Video, Audio } from 'expo-av';
import BatteryStatus from "../components/BatteryStatus";



export default function PantallaInicio() {
  const recetaRef = useRef(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recetaDelDia, setRecetaDelDia] = useState(null);
  const [sound, setSound] = useState(null);

 const recetasPorDia = [
  {
    dia: "Domingo",
    titulo: "Chilaquiles Verdes",
    descripcion: "Crujientes totopos bañados en salsa verde y acompañados de crema, queso y cebolla.",
    ingredientes: [
      "Totopos de maíz",
      "Salsa verde",
      "Crema ácida",
      "Queso fresco",
      "Cebolla morada",
      "Aguacate (opcional)"
    ],
    preparacion: [
      "Calienta la salsa verde en una sartén.",
      "Agrega los totopos y mezcla con cuidado para que no se rompan.",
      "Sirve en un plato y agrega crema, queso y cebolla encima.",
      "Puedes decorar con aguacate al gusto."
    ],
    imagen: require("../assets/images/chilaquiles.jpg"),
    audio: require("../assets/multimedia/chilaquiles_audio.mp3"),
    video: require("../assets/multimedia/chilaquiles_video.mp4"),
  },
  {
    dia: "Lunes",
    titulo: "Ensalada César",
    descripcion: "Lechuga fresca, aderezo césar casero, crutones y queso parmesano.",
    ingredientes: [
      "Lechuga romana",
      "Aderezo César",
      "Crutones",
      "Queso parmesano rallado",
      "Pechuga de pollo a la plancha (opcional)"
    ],
    preparacion: [
      "Lava y corta la lechuga.",
      "Agrega crutones y queso parmesano.",
      "Vierte el aderezo y mezcla.",
      "Añade pollo si deseas una versión más completa."
    ],
    imagen: require("../assets/images/ensalada_cesar.jpg"),
    audio: require("../assets/multimedia/ensalada_cesar_audio.mp3"),
    video: require("../assets/multimedia/ensalada_cesar_video.mp4"),
  },
  {
    dia: "Martes",
    titulo: "Tacos de Carnitas",
    descripcion: "Tortillas de maíz rellenas con carnitas estilo Michoacán, cebolla y cilantro.",
    ingredientes: [
      "Carnitas de cerdo",
      "Tortillas de maíz",
      "Cebolla blanca picada",
      "Cilantro fresco picado",
      "Salsa al gusto",
      "Limón"
    ],
    preparacion: [
      "Calienta las carnitas.",
      "Sirve en tortillas calientes.",
      "Agrega cebolla, cilantro y salsa.",
      "Exprime un poco de limón al gusto."
    ],
    imagen: require("../assets/images/tacos_carnitas.jpg"),
    audio: require("../assets/multimedia/carnitas_audio.mp3"),
    video: require("../assets/multimedia/carnitas_video.mp4"),
  },
  {
    dia: "Miércoles",
    titulo: "Sopa de Lentejas",
    descripcion: "Caldo nutritivo con lentejas, zanahorias y papa.",
    ingredientes: [
      "Lentejas",
      "Zanahorias",
      "Papa",
      "Cebolla",
      "Ajo",
      "Caldo de verduras",
      "Especias al gusto"
    ],
    preparacion: [
      "Sofríe cebolla y ajo en una olla.",
      "Agrega las lentejas, zanahorias y papas.",
      "Vierte el caldo y cocina hasta que todo esté suave.",
      "Añade sal y especias al gusto."
    ],
    imagen: require("../assets/images/sopa_lentejas.jpg"),
    audio: require("../assets/multimedia/sopa_lentejas_audio.mp3"),
    video: require("../assets/multimedia/sopa_lentejas_video.mp4"),
  },
  {
    dia: "Jueves",
    titulo: "Pollo al Curry",
    descripcion: "Pechuga de pollo cocida en salsa de curry con arroz blanco.",
    ingredientes: [
      "Pechuga de pollo",
      "Curry en polvo",
      "Crema de coco o leche",
      "Cebolla",
      "Aceite",
      "Arroz blanco cocido"
    ],
    preparacion: [
      "Corta el pollo en cubos y fríe con cebolla.",
      "Agrega curry y crema de coco.",
      "Cocina a fuego lento hasta espesar.",
      "Sirve con arroz blanco."
    ],
    imagen: require("../assets/images/pollo_curry.jpg"),
    audio: require("../assets/multimedia/pollo_curry_audio.mp3"),
    video: require("../assets/multimedia/pollo_curry_video.mp4"),
  },
  {
    dia: "Viernes",
    titulo: "Pizza Margarita",
    descripcion: "Masa artesanal con salsa de tomate, mozzarella y albahaca fresca.",
    ingredientes: [
      "Masa para pizza",
      "Salsa de tomate",
      "Queso mozzarella",
      "Hojas de albahaca fresca",
      "Aceite de oliva",
      "Sal y pimienta"
    ],
    preparacion: [
      "Extiende la masa de pizza.",
      "Agrega salsa de tomate, queso y albahaca.",
      "Hornea a 200°C por 15 minutos.",
      "Rocía con aceite de oliva antes de servir."
    ],
    imagen: require("../assets/images/pizza_margarita.jpg"),
    audio: require("../assets/multimedia/pizza_margarita_audio.mp3"),
    video: require("../assets/multimedia/pizza_margarita_video.mp4"),
  },
  {
    dia: "Sábado",
    titulo: "Hamburguesa Casera",
    descripcion: "Pan artesanal con carne asada, queso, lechuga y tomate.",
    ingredientes: [
      "Pan para hamburguesa",
      "Carne molida de res",
      "Queso cheddar",
      "Lechuga",
      "Tomate",
      "Cebolla",
      "Mostaza, mayonesa o catsup"
    ],
    preparacion: [
      "Forma las hamburguesas y cocínalas.",
      "Tuesta los panes.",
      "Monta la hamburguesa con queso, lechuga, tomate y cebolla.",
      "Agrega salsas al gusto."
    ],
    imagen: require("../assets/images/hamburguesa_casera.jpg"),
    audio: require("../assets/multimedia/hamburguesa_audio.mp3"),
    video: require("../assets/multimedia/hamburguesa_video.mp4"),
  },
];

useEffect(() => {
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
}, []);



  const obtenerReceta = () => {
    const diaActual = new Date().getDay();
    return recetasPorDia[diaActual];
  };

  const Descargar = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para guardar en la galería');
        return;
      }

      const uri = await captureRef(recetaRef, {
        format: 'png',
        quality: 0.8,
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Éxito', 'La receta fue guardada en tu galería');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la receta');
    }
  };

  const RecargarReceta = () => {
    setLoading(true);
    setTimeout(() => {
      setRecetaDelDia(obtenerReceta());
      setLoading(false);
    }, 2000);
  };

 const reproducirAudio = async () => {
    try {
      if (!sound && recetaDelDia?.audio) {
        const { sound: newSound } = await Audio.Sound.createAsync(recetaDelDia.audio);
        setSound(newSound);
        await newSound.playAsync();
      } else if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.error("Error con el audio:", error);
    }
  };

  const detenerAudio = async () => {
    if (sound) {
      await sound.stopAsync();
    }
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
    const timer = setTimeout(() => {
      setRecetaDelDia(obtenerReceta());
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (loading || !recetaDelDia) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C8102E" />
        <Text style={styles.loadingText}>Cargando Receta del día...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerpadre}>
      <View ref={recetaRef} collapsable={false}>
        <View style={styles.container}>
          <View style={{ padding: 10, marginTop: 60 }}>
            <Text style={{ fontSize: 16 }}>
              {usuario ? `¡Hola: ${usuario.email}!` : "No hay usuario guardado"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Ionicons name="menu" size={32} color="#C8102E" />
          </TouchableOpacity>
          <BatteryStatus />

          <Text style={styles.title}>Receta del día: {recetaDelDia.titulo}</Text>

          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                source={recetaDelDia.imagen || require('../assets/images/cocina.jpg')}
                style={styles.imagecabecera}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{recetaDelDia.dia}</Text>
            </View>
          </View>

          <Text style={styles.description}>{recetaDelDia.descripcion}</Text>

          <Text style={styles.subtitle}>Ingredientes:</Text>
          {recetaDelDia.ingredientes?.map((ingrediente, index) => (
            <Text key={index} style={styles.listItem}>• {ingrediente}</Text>
          ))}

          <Text style={styles.subtitle}>Preparación:</Text>
          {recetaDelDia.preparacion?.map((paso, index) => (
            <Text key={index} style={styles.listItem}>{index + 1}. {paso}</Text>
          ))}

          {recetaDelDia.video && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitle}>Video:</Text>
              <Video
                source={recetaDelDia.video}
                useNativeControls
                resizeMode="contain"
                style={{ width: "100%", height: 200 }}
              />
            </View>
          )}

          <TouchableOpacity style={styles.botonModal} onPress={reproducirAudio}>
            <Text style={styles.botonTexto}>Escuchar Audio</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
            <TouchableOpacity onPress={reproducirAudio} style={[styles.botonModal, { marginHorizontal: 5 }]}>
              <Text style={styles.botonTexto}>▶️ Reproducir / Pausar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={detenerAudio} style={[styles.botonModal, { marginHorizontal: 5 }]}>
              <Text style={styles.botonTexto}>⏹️ Detener</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.botonModal} onPress={RecargarReceta}>
          <Text style={styles.botonTexto}>Recargar Receta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonModal} onPress={Descargar}>
          <Text style={styles.botonTexto}>Descargar Receta</Text>
        </TouchableOpacity>

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
  subtitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 16,
  marginBottom: 8,
  color: '#C8102E',
},
listItem: {
  fontSize: 16,
  marginBottom: 4,
  paddingLeft: 10,
  color: '#333',
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#C8102E",
  },
});
