// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import API from "../../api";

// export default function CrearReservaScreen({ navigation }) {
//   const [mesas, setMesas] = useState([]);
//   const [id_mesa, setIdMesa] = useState("");
//   const [nombre_cliente, setNombreCliente] = useState("");
//   const [telefono, setTelefono] = useState("");
//   const [fecha_reserva, setFechaReserva] = useState("");
//   const [hora_reserva, setHoraReserva] = useState("");

//   // Obtener mesas disponibles
//   useEffect(() => {
//     const fetchMesas = async () => {
//       try {
//         const res = await API.get("/mesas");
//         setMesas(res.data);
//       } catch (error) {
//         console.error("Error al obtener mesas:", error);
//       }
//     };
//     fetchMesas();
//   }, []);

//   const handleCrearReserva = async () => {
//     if (!id_mesa || !nombre_cliente || !telefono || !fecha_reserva || !hora_reserva) {
//       Alert.alert("Error", "Todos los campos son obligatorios");
//       return;
//     }

//     try {
//       await API.post("/reservas", {
//         id_mesa,
//         nombre_cliente,
//         telefono,
//         fecha_reserva,
//         hora_reserva,
//       });
//       Alert.alert("Éxito", "Reserva creada correctamente");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error al crear reserva:", error);
//       Alert.alert("Error", "No se pudo crear la reserva");
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Crear Reserva</Text>

//       <Text style={styles.label}>Selecciona una mesa:</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={id_mesa}
//           onValueChange={(value) => setIdMesa(value)}
//         >
//           <Picker.Item label="-- Selecciona una mesa --" value="" />
//           {mesas.map((mesa) => (
//             <Picker.Item
//               key={mesa.id_mesa}
//               label={`Mesa ${mesa.numero_mesa} (${mesa.estado})`}
//               value={mesa.id_mesa}
//             />
//           ))}
//         </Picker>
//       </View>

//       <Text style={styles.label}>Nombre del cliente:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Ej. Juan Pérez"
//         value={nombre_cliente}
//         onChangeText={setNombreCliente}
//       />

//       <Text style={styles.label}>Teléfono:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Ej. 3123456789"
//         keyboardType="phone-pad"
//         value={telefono}
//         onChangeText={setTelefono}
//       />

//       <Text style={styles.label}>Fecha de reserva:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="YYYY-MM-DD"
//         value={fecha_reserva}
//         onChangeText={setFechaReserva}
//       />

//       <Text style={styles.label}>Hora de reserva:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="HH:MM"
//         value={hora_reserva}
//         onChangeText={setHoraReserva}
//       />

//       <Button title="Crear Reserva" onPress={handleCrearReserva} color="#10b981" />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f1f5f9",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#1e293b",
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//     marginBottom: 5,
//     color: "#334155",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     marginBottom: 15,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     marginBottom: 15,
//   },
// });