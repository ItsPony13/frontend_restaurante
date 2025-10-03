import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // expo install @expo/vector-icons

const { width } = Dimensions.get("window");

export default function MesasScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gestión de Mesas</Text>

      <View style={styles.grid}>
        {/* Ver Mesas */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("VerMesa")}
        >
          <MaterialIcons name="list" size={50} color="#3b82f6" />
          <Text style={styles.cardText}>Ver Mesas</Text>
        </TouchableOpacity>

        {/* Crear Mesa */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("CrearMesa")}
        >
          <MaterialIcons name="add-circle" size={50} color="#10b981" />
          <Text style={styles.cardText}>Crear Mesa</Text>
        </TouchableOpacity>

        {/* Modificar Mesa */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ModificarMesa")}
        >
          <MaterialIcons name="edit" size={50} color="#f59e0b" />
          <Text style={styles.cardText}>Modificar Mesa</Text>
        </TouchableOpacity>

        {/* Eliminar Mesa */}
        <TouchableOpacity
          style={[styles.card, styles.deleteCard]}
          onPress={() => navigation.navigate("BorrarMesa")}
        >
          <MaterialIcons name="delete" size={50} color="#ef4444" />
          <Text style={styles.cardText}>Eliminar Mesa</Text>
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
