// screens/PantallaInicio.js
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BatteryStatus from "../components/BatteryStatus";

const curiosidadesData = [
  {
    title: "Utensilios Básicos",
    data: [
      "El cuchillo de chef es una herramienta esencial y versátil.",
      "Las cucharas de madera no rayan los sartenes antiadherentes.",
    ],
  },
  {
    title: "Curiosidades Históricas",
    data: [
      "La espátula existe desde hace más de 500 años.",
      "Los primeros moldes para hornear eran de barro cocido.",
    ],
  },
  {
    title: "Materiales Innovadores",
    data: [
      "Algunos utensilios modernos están hechos con silicona resistente al calor.",
      "Existen peladores de frutas con diseños ergonómicos para zurdos.",
    ],
  },
];

export default function PantallaInicio() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const mostrarCarga = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C8102E" />
          <Text style={styles.loadingText}>Cargando curiosidades...</Text>
        </View>
      );
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={32} color="#C8102E" />
        </TouchableOpacity>
        <BatteryStatus />

        <Text style={styles.title}>Curiosidades</Text>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/images/cocina.jpg")} style={styles.imagecabecera} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>El mundo de la cocina y sus curiosidades.</Text>
          </View>
        </View>

        <SectionList
          sections={curiosidadesData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text style={styles.item}>{`\u2022 ${item}`}</Text>}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        <TouchableOpacity style={styles.botonModal} onPress={mostrarCarga}>
          <Text style={styles.botonTexto}>Recargar lista</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerLeft}>Maribel Romero Bautista</Text>
          <Text style={styles.footerRight}>Aplicaciones Móviles</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  containerpadre: { padding: 10 },
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
  row: {
    marginTop: 20,
    marginBottom: 60,
    flexDirection: 'row',
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 40,
    width: 111,
    height: 74,
    borderTopLeftRadius: 160,
    borderBottomLeftRadius: 160,
    overflow: "hidden",
  },
  imagecabecera: {
    width: 111,
    height: 74,
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: 40,
    paddingLeft: 10,
    paddingTop: 10,
    width: 221,
    height: 74,
    borderTopRightRadius: 160,
    borderBottomRightRadius: 160,
    borderWidth: 2,
    borderColor: "#C8102E",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#C8102E",
    marginTop: 10,
    borderRadius: 10,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontSize: 16,
    color: "#333",
  },
  botonModal: {
    backgroundColor: "#C8102E",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
  botonTexto: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    marginTop: 40,
  },
  footerLeft: {
    fontSize: 14,
    color: "#555",
  },
  footerRight: {
    fontSize: 14,
    color: "#555",
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
