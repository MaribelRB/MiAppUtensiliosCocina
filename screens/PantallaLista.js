import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator, FlatList,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const utensiliosIniciales = [
  { id: '1', nombre: 'Cuchillo de chef', favorito: true },
  { id: '2', nombre: 'Tabla para picar', favorito: false },
  { id: '3', nombre: 'Batidor de globo', favorito: true },
  { id: '4', nombre: 'Espátula de silicón', favorito: false },
  { id: '5', nombre: 'Rallador', favorito: false },
];

export default function PantallaInicio() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [utensilios, setUtensilios] = useState(utensiliosIniciales);

  const mostrarCarga = () => {
    setLoading(true);
    setTimeout(() => {
      setUtensilios(utensiliosIniciales); // recargar estado original si se desea
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const toggleFavorito = (id) => {
    setUtensilios(prev =>
      prev.map(item =>
        item.id === id ? { ...item, favorito: !item.favorito } : item
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C8102E" />
        <Text style={styles.loadingText}>Cargando utensilios...</Text>
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

      <Text style={styles.title}>Utensilios</Text>

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
        Aquí podrás encontrar información de los utensilios más utilizados dentro de las cocinas profesionales, sus categorías, detalles y curiosidades.
      </Text>

      <Text style={styles.flatListTitle}>Utensilios más comunes:</Text>

      <FlatList
        data={utensilios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.utensilioItem}>
            <Text style={styles.utensilioText}>{item.nombre}</Text>
            <Switch
              value={item.favorito}
              onValueChange={() => toggleFavorito(item.id)}
              trackColor={{ false: "#ccc", true: "#C8102E" }}
              thumbColor={item.favorito ? "#fff" : "#fff"}
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.botonModal} onPress={mostrarCarga}>
        <Text style={styles.botonTexto}>Recargar Lista</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerLeft}>Maribel Romero Bautista</Text>
        <Text style={styles.footerRight}>Aplicaciones Móviles</Text>
      </View>
    </View>
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
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
  },
  flatListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C8102E",
    marginBottom: 10,
    textAlign: "center",
  },
  utensilioItem: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#C8102E",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  utensilioText: {
    fontSize: 16,
    color: "#333",
  },
  modal: {
    width: "100%",
    height: 242,
    backgroundColor: "#C8102E",
    alignItems: "center",
    borderRadius: 31,
    marginTop: 20,
  },
  textcontmodal: {
    marginTop: 20,
  },
  inputLabel: {
    color: "#ffffff",
    textAlign: "center",
  },
  contmodalinput: {
    width: "80%",
    height: 150,
    marginTop: 15,
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    borderColor: "blue",
    backgroundColor: "#ffffff"
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
    textAlign: "center",
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
