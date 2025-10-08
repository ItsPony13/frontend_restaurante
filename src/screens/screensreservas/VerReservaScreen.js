// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import API from "../../api";

// export default function VerReservaScreen({ navigation }) {
//   const [reservas, setReservas] = useState([]);

//   const fetchReservas = async () => {
//     try {
//       const res = await API.get("/reservas");
//       setReservas(res.data);
//     } catch (error) {
//       console.error("Error al obtener reservas:", error);
//       Alert.alert("Error", "No se pudieron cargar las reservas");
//     }
//   };

//   useEffect(() => {
//     fetchReservas();
//     const focusHandler = navigation.addListener("focus", fetchReservas);
//     return focusHandler;
//   }, [navigation]);

//   const renderReserva = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate("BorrarReserva", { reserva: item })}
//     >
//       <Text style={styles.title}>Reserva #{item.id_reserva}</Text>
//       <Text>Mesa: {item.id_mesa}</Text>
//       <Text>Cliente: {item.nombre_cliente}</Text>
//       <Text>Tel: {item.telefono}</Text>
//       <Text>Fecha: {item.fecha_reserva}</Text>
//       <Text>Hora: {item.hora_reserva}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Reservas</Text>
//       <FlatList
//         data={reservas}
//         keyExtractor={(item) => item.id_reserva.toString()}
//         renderItem={renderReserva}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//     color: "#1e293b",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// });

import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  RefreshControl, 
  ScrollView 
} from "react-native";
import API from "../../api";

export default function VerReservaScreen({ navigation }) {
  const [reservas, setReservas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReservas();
    setRefreshing(false);
  };

  const renderReserva = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("DetalleReserva", { reserva: item })}
  >
    <Text style={styles.title}>Reserva #{item.id_reserva}</Text>
    <Text style={styles.info}>Mesa: {item.id_mesa}</Text>
    <Text style={styles.info}>Cliente: {item.nombre_cliente}</Text>
    <Text style={styles.info}>Tel: {item.telefono}</Text>
    <Text style={styles.info}>Fecha: {item.fecha_reserva}</Text>
    <Text style={styles.info}>Hora: {item.hora_reserva}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservas</Text>
      {reservas.length === 0 ? (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No hay reservas disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id_reserva.toString()}
          renderItem={renderReserva}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#1e293b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#0f172a" },
  info: { fontSize: 15, color: "#334155", marginBottom: 3 },
  noData: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  noDataText: { fontSize: 16, color: "#64748b" },
});
