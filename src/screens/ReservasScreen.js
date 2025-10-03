import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // expo install @expo/vector-icons

const { width } = Dimensions.get("window");

export default function ReservasScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gestión de reservas</Text>

      <View style={styles.grid}>
        {/* Ver reservas */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("VerReserva")}
        >
          <MaterialIcons name="list" size={50} color="#3b82f6" />
          <Text style={styles.cardText}>Ver reservaciones</Text>
        </TouchableOpacity>

        {/* Crear reserva */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("CrearReserva")}
        >
          <MaterialIcons name="add-circle" size={50} color="#10b981" />
          <Text style={styles.cardText}>Crear reservacion</Text>
        </TouchableOpacity>

        {/* Modificar reserva */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ModificarReserva")}
        >
          <MaterialIcons name="edit" size={50} color="#f59e0b" />
          <Text style={styles.cardText}>Modificar reservacion</Text>
        </TouchableOpacity>

        {/* Eliminar reserva */}
        <TouchableOpacity
          style={[styles.card, styles.deleteCard]}
          onPress={() => navigation.navigate("BorrarReserva")}
        >
          <MaterialIcons name="delete" size={50} color="#ef4444" />
          <Text style={styles.cardText}>Eliminar reservacion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
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
  deleteCard: {
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
