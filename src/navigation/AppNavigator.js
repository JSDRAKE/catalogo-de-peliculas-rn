import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"; // Importar para íconos

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// Importar funciones de Firebase para cerrar sesión (si es necesario)
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase"; // Asegúrate de tener esta configuración

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Función para manejar el log out
const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      // Redirigir al Login Screen después de cerrar sesión
      alert("Sesión cerrada");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión");
    });
};

const HomeNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerIcon: () => <Ionicons name="home" size={22} />,
      }}
    />
    <Drawer.Screen
      name="Favorites"
      component={FavoriteScreen}
      options={{
        drawerIcon: () => <Ionicons name="heart" size={22} />,
      }}
    />
    {/* <Drawer.Screen
      name="Log Out"
      component={() => null}
      options={{
        drawerIcon: () => <Ionicons name="log-out" size={22} />,
        drawerLabel: "Log Out",
        drawerOnPress: handleLogOut,
      }}
    /> */}
  </Drawer.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        {/* Usamos HomeNavigator para Home, Details y Favorites */}
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
