import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import API from "../../api"; // Ajusta según tu estructura
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function BorrarMesaScreen() {
  const [mesas, setMesas] = useState([]);

  // Traer mesas existentes
  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await API.get("/mesas");
        setMesas(res.data);
      } catch (error) {
        console.error("Error al obtener mesas:", error);
      }
    };
    fetchMesas();
  }, []);

  // Función para borrar mesa
  const handleEliminar = (mesa) => {
    Alert.alert(
      "Eliminar Mesa",
      `¿Deseas eliminar la mesa ${mesa.numero_mesa}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          onPress: async () => {
            try {
              await API.delete(`/mesas/${mesa.id_mesa}`);
              setMesas(mesas.filter((m) => m.id_mesa !== mesa.id_mesa));
              Alert.alert("Éxito", "Mesa eliminada correctamente");
            } catch (error) {
              console.error("Error al eliminar mesa:", error.response || error);
              Alert.alert("Error", "No se pudo eliminar la mesa");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eliminar Mesas</Text>
      <FlatList
        data={mesas}
        keyExtractor={(item) => item.id_mesa.toString()}
        numColumns={2} // Grid de 2 columnas
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mesaCard}
            onPress={() => handleEliminar(item)}
          >
            <MaterialIcons name="delete" size={40} color="#ef4444" />
            <Text style={styles.mesaText}>Mesa {item.numero_mesa}</Text>
            <Text style={styles.mesaEstado}>{item.estado}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f5f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  mesaCard: {
    backgroundColor: "#fff",
    width: width * 0.43,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    padding: 10,
  },
  mesaText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#1e293b",
  },
  mesaEstado: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 3,
  },
});
