// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   Platform,
//   TouchableOpacity
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import API from "../../api";

// export default function CrearReservaScreen({ navigation }) {
//   const [mesas, setMesas] = useState([]);
//   const [id_mesa, setIdMesa] = useState("");
//   const [nombre_cliente, setNombreCliente] = useState("");
//   const [telefono, setTelefono] = useState("");
//   const [fecha_reserva, setFechaReserva] = useState(new Date());
//   const [hora_reserva, setHoraReserva] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

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
//     if (!id_mesa || !nombre_cliente || !telefono) {
//       Alert.alert("Error", "Todos los campos son obligatorios");
//       return;
//     }

//     const fecha = fecha_reserva.toISOString().split("T")[0];
//     const hora = hora_reserva.toTimeString().split(" ")[0].slice(0,5);

//     try {
//       await API.post("/reservas", {
//         id_mesa,
//         nombre_cliente,
//         telefono,
//         fecha_reserva: fecha,
//         hora_reserva: hora,
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
//         <Picker selectedValue={id_mesa} onValueChange={setIdMesa}>
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
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowDatePicker(true)}
//       >
//         <Text>{fecha_reserva.toISOString().split("T")[0]}</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={fecha_reserva}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(Platform.OS === 'ios');
//             if (selectedDate) setFechaReserva(selectedDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Hora de reserva:</Text>
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowTimePicker(true)}
//       >
//         <Text>{hora_reserva.toTimeString().slice(0,5)}</Text>
//       </TouchableOpacity>
//       {showTimePicker && (
//         <DateTimePicker
//           value={hora_reserva}
//           mode="time"
//           is24Hour={true}
//           display="default"
//           onChange={(event, selectedTime) => {
//             setShowTimePicker(Platform.OS === 'ios');
//             if (selectedTime) setHoraReserva(selectedTime);
//           }}
//         />
//       )}

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
//   dateButton: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     backgroundColor: "#fff",
//     marginBottom: 15,
//   },
// });


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import API from "../../api";

// export default function CrearReservaScreen({ navigation }) {
//   const [mesas, setMesas] = useState([]);
//   const [id_mesa, setIdMesa] = useState("");
//   const [nombre_cliente, setNombreCliente] = useState("");
//   const [telefono, setTelefono] = useState("");

//   const [fecha_reserva, setFechaReserva] = useState(new Date());
//   const [hora_reserva, setHoraReserva] = useState(new Date());

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

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

//     // Convertir fecha y hora al formato correcto
//     const fecha = fecha_reserva.toISOString().split("T")[0]; // YYYY-MM-DD
//     const hora = hora_reserva.toTimeString().split(" ")[0];   // HH:MM:SS

//     try {
//       await API.post("/reservas", {
//         id_mesa,
//         nombre_cliente,
//         telefono,
//         fecha_reserva: fecha,
//         hora_reserva: hora,
//       });
//       Alert.alert("Éxito", "Reserva creada correctamente");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error al crear reserva:", error.response || error);
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
//       <Button
//         title={fecha_reserva.toISOString().split("T")[0]}
//         onPress={() => setShowDatePicker(true)}
//         color="#3b82f6"
//       />
//       {showDatePicker && (
//         <DateTimePicker
//           value={fecha_reserva}
//           mode="date"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(Platform.OS === "ios");
//             if (selectedDate) setFechaReserva(selectedDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Hora de reserva:</Text>
//       <Button
//         title={hora_reserva.toTimeString().split(" ")[0].slice(0,5)}
//         onPress={() => setShowTimePicker(true)}
//         color="#3b82f6"
//       />
//       {showTimePicker && (
//         <DateTimePicker
//           value={hora_reserva}
//           mode="time"
//           display={Platform.OS === "ios" ? "spinner" : "default"}
//           onChange={(event, selectedTime) => {
//             setShowTimePicker(Platform.OS === "ios");
//             if (selectedTime) setHoraReserva(selectedTime);
//           }}
//         />
//       )}

//       <View style={{ marginTop: 20 }}>
//         <Button title="Crear Reserva" onPress={handleCrearReserva} color="#10b981" />
//       </View>
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

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../../api";

export default function CrearReservaScreen({ navigation }) {
  const [mesas, setMesas] = useState([]);
  const [id_mesa, setIdMesa] = useState("");
  const [nombre_cliente, setNombreCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_reserva, setFechaReserva] = useState(new Date());
  const [hora_reserva, setHoraReserva] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Obtener mesas disponibles
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

  const handleCrearReserva = async () => {
    if (!id_mesa || !nombre_cliente || !telefono || !fecha_reserva || !hora_reserva) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Convertir fechas a formato correcto
    const fechaStr = fecha_reserva.toISOString().split("T")[0]; // YYYY-MM-DD
    const horaStr = hora_reserva.toTimeString().split(" ")[0]; // HH:MM:SS

    try {
      await API.post("/reservas", {
        id_mesa,
        nombre_cliente,
        telefono,
        fecha_reserva: fechaStr,
        hora_reserva: horaStr,
      });
      Alert.alert("Éxito", "Reserva creada correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al crear reserva:", error.response?.data || error);
      Alert.alert("Error", "No se pudo crear la reserva");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Crear Reserva</Text>

      <Text style={styles.label}>Selecciona una mesa:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={id_mesa} onValueChange={(value) => setIdMesa(value)}>
          <Picker.Item label="-- Selecciona una mesa --" value="" />
          {mesas.map((mesa) => (
            <Picker.Item
              key={mesa.id_mesa}
              label={`Mesa ${mesa.numero_mesa} (${mesa.estado})`}
              value={mesa.numero_mesa} // <- CORREGIDO: enviar numero_mesa
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Nombre del cliente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={nombre_cliente}
        onChangeText={setNombreCliente}
      />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 3123456789"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Text style={styles.label}>Fecha de reserva:</Text>
      <Button
        title={fecha_reserva.toISOString().split("T")[0]}
        onPress={() => setShowDatePicker(true)}
        color="#3b82f6"
      />
      {showDatePicker && (
        <DateTimePicker
          value={fecha_reserva}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            if (selectedDate) setFecha_reserva(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Hora de reserva:</Text>
      <Button
        title={hora_reserva.toTimeString().split(" ")[0]}
        onPress={() => setShowTimePicker(true)}
        color="#3b82f6"
      />
      {showTimePicker && (
        <DateTimePicker
          value={hora_reserva}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={(event, selectedTime) => {
            setShowTimePicker(Platform.OS === "ios");
            if (selectedTime) setHora_reserva(selectedTime);
          }}
        />
      )}

        <View style={styles.buttonContainer}>
            <Button title="Crear Reserva" onPress={handleCrearReserva} color="#10b981" />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e293b",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  buttonContainer: {
  marginTop: 30, // aumenta este valor si quieres más separación
  marginBottom: 20, // opcional, para dejar espacio abajo
},

});
