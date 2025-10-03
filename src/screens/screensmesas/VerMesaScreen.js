import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import API from "../../api"; // Ajusta la ruta según la ubicación real de api.js

export default function VerMesaScreen() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await API.get("/mesas");
        setMesas(res.data);
      } catch (error) {
        console.error("Error al obtener mesas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMesas();
  }, []);

  const renderMesa = ({ item }) => (
    <View
      style={[
        styles.mesaCard,
        item.estado === "ocupada" ? styles.ocupada : styles.disponible,
      ]}
    >
      <Text style={styles.mesaNumero}>Mesa {item.numero_mesa}</Text>
      <Text>Capacidad: {item.capacidad}</Text>
      <Text>Estado: {item.estado}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Cargando mesas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mesas Registradas</Text>
      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id_mesa.toString()}
        renderItem={renderMesa}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e293b",
  },
  listContainer: {
    paddingBottom: 20,
  },
  mesaCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  mesaNumero: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ocupada: {
    borderLeftWidth: 5,
    borderLeftColor: "#ef4444",
  },
  disponible: {
    borderLeftWidth: 5,
    borderLeftColor: "#10b981",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});