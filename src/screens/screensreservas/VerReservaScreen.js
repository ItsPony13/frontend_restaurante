import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import API from "../../api";

export default function VerReservaScreen({ navigation }) {
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    try {
      const res = await API.get("/reservas");
      setReservas(res.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      Alert.alert("Error", "No se pudieron cargar las reservas");
    }
  };

  useEffect(() => {
    fetchReservas();
    const focusHandler = navigation.addListener("focus", fetchReservas);
    return focusHandler;
  }, [navigation]);

  const renderReserva = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BorrarReserva", { reserva: item })}
    >
      <Text style={styles.title}>Reserva #{item.id_reserva}</Text>
      <Text>Mesa: {item.id_mesa}</Text>
      <Text>Cliente: {item.nombre_cliente}</Text>
      <Text>Tel: {item.telefono}</Text>
      <Text>Fecha: {item.fecha_reserva}</Text>
      <Text>Hora: {item.hora_reserva}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservas</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id_reserva.toString()}
        renderItem={renderReserva}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1e293b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});