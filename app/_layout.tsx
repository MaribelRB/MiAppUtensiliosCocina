import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "../AuthContext";
import PantallaExtras from "../screens/PantallaExtras";
import PantallaFormulario from "../screens/PantallaFormulario";
import PantallaInicio from "../screens/PantallaInicio";
import PantallaLista from "../screens/PantallaLista";
import PantallaLogin from "../screens/PantallaLogin";
import PantallaNuevoUs from "../screens/PantallaNuevoUs";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerMenu() {

  const { logout } = useAuth();
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#C8102E",
        drawerLabelStyle: { fontWeight: "bold" },
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Cerrar sesión"
            onPress={logout}
            icon={({ color, size }) => (
              <Image
                source={require("../assets/images/curiosidades.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            )}
          />
        </DrawerContentScrollView>
      )}
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

function AppNavigator() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <DrawerMenu />
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={PantallaLogin} />
      <Stack.Screen name="PantallaNuevoUs" component={PantallaNuevoUs} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
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