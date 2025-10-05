import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pantallas
import HomeScreen from "./src/screens/HomeScreen";
import MesasScreen from "./src/screens/MesasScreen";
import ReservasScreen from "./src/screens/ReservasScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegistroScreen from './src/screens/RegistroScreen';
import CrearMesaScreen from './src/screens/screensmesas/CrearMesaScreen';
import VerMesaScreen from './src/screens/screensmesas/VerMesaScreen';
import ModificarMesaScreen from './src/screens/screensmesas/ModificarMesaScreen';
import BorrarMesaScreen from './src/screens/screensmesas/BorrarMesaScreen';
import VerReservaScreen from './src/screens/screensreservas/VerReservaScreen';
// import CrearReservaScreen from './src/screens/screensreservas/CrearReservaScreen';
// import ModificarReservaScreen from './src/screens/screensreservas/ModificarReservaScreen';
// import BorrarReservaScreen from './src/screens/screensreservas/BorrarReservaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mesas" component={MesasScreen} />
        <Stack.Screen name="Reservas" component={ReservasScreen} />
        <Stack.Screen name="CrearMesa" component={CrearMesaScreen} />
        <Stack.Screen name="VerMesa" component={VerMesaScreen} />
        <Stack.Screen name="ModificarMesa" component={ModificarMesaScreen} />
        <Stack.Screen name="BorrarMesa" component={BorrarMesaScreen} />
        {/* reservas */}
        <Stack.Screen name="VerReserva" component={VerReservaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
