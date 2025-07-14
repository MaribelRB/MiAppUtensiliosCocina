import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet } from "react-native";
import PantallaExtras from "../screens/PantallaExtras";
import PantallaFormulario from "../screens/PantallaFormulario";
import PantallaInicio from "../screens/PantallaInicio";
import PantallaLista from "../screens/PantallaLista";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#C8102E",
        drawerLabelStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen 
      name="Home" 
      component={PantallaInicio} 
      options={{
        drawerIcon: (focused) => (
            <Image
              source={require("../assets/images/casa.png")}
              style={[styles.icon, focused && styles.iconFocused]}
            />
        ),
      }} />
      <Drawer.Screen
      name="Utensilios" 
      component={PantallaLista} 
      options={{
        drawerIcon: (focused) => (
            <Image
              source={require("../assets/images/categoria.png")}
              style={[styles.icon, focused && styles.iconFocused]}
            />
        ),
      }} />
      <Drawer.Screen 
      name="Recetas" 
      component={PantallaFormulario} 
      options={{
        drawerIcon: (focused) => (
            <Image
              source={require("../assets/images/detalles.png")}
              style={[styles.icon, focused && styles.iconFocused]}
            />
        ),
      }}/>
      <Drawer.Screen 
      name="Curiosidades" 
      component={PantallaExtras} 
      options={{
        drawerIcon: (focused) => (
            <Image
              source={require("../assets/images/curiosidades.png")}
              style={[styles.icon, focused && styles.iconFocused]}
            />
        ),
      }}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  iconFocused: {
    tintColor: "#882424", // color al estar activo
  },
});