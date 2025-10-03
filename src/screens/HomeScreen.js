import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // expo install @expo/vector-icons

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sistema de Reservas</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Mesas")}
        >
          <MaterialIcons name="event-seat" size={50} color="#3b82f6" />
          <Text style={styles.cardText}>Mesas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Reserva")}
        >
          <MaterialIcons name="calendar-today" size={50} color="#10b981" />
          <Text style={styles.cardText}>Reservas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.logoutCard]}
          onPress={() => navigation.replace("Login")}
        >
          <MaterialIcons name="logout" size={50} color="#ef4444" />
          <Text style={styles.cardText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => alert("Otra sección")}
        >
          <MaterialIcons name="settings" size={50} color="#f59e0b" />
          <Text style={styles.cardText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: "center",
    color: "#1e293b",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#fff",
    width: width * 0.4,
    height: 140,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  logoutCard: {
    backgroundColor: "#fee2e2",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1e293b",
    textAlign: "center",
  },
});
