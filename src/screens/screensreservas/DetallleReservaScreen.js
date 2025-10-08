import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import API from "../../api";

export default function DetalleReservaScreen({ route, navigation }) {
  const { reserva } = route.params;

  const DetalleItem = ({ icon, label, value }) => (
    <View style={styles.itemContainer}>
      <MaterialIcons name={icon} size={24} color="#3b82f6" style={styles.icon} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Detalle de la Reserva</Text>

      <View style={styles.card}>
        <DetalleItem icon="confirmation-number" label="ID Reserva:" value={reserva.id_reserva} />
        <DetalleItem icon="event-seat" label="Mesa:" value={`Mesa ${reserva.id_mesa}`} />
        <DetalleItem icon="person" label="Cliente:" value={reserva.nombre_cliente} />
        <DetalleItem icon="phone" label="Teléfono:" value={reserva.telefono} />
        <DetalleItem icon="calendar-today" label="Fecha:" value={reserva.fecha_reserva} />
        <DetalleItem icon="access-time" label="Hora:" value={reserva.hora_reserva} />
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f5f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e293b",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
  },
  value: {
    fontSize: 16,
    color: "#0f172a",
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

