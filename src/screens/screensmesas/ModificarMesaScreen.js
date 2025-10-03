import React, { useEffect, useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons"; // 👈 para íconos
import API from "../../api";

export default function ModificarMesaScreen({ navigation }) {
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [numero_mesa, setNumero] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado, setEstado] = useState("disponible");

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

  const handleSelectMesa = (mesa) => {
    setSelectedMesa(mesa);
    setNumero(String(mesa.numero_mesa));
    setCapacidad(String(mesa.capacidad));
    setEstado(mesa.estado);
  };

  const handleGuardar = async () => {
    if (!selectedMesa) {
      Alert.alert("Error", "Selecciona una mesa para modificar");
      return;
    }
    if (!numero_mesa || !capacidad) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const numeroMesaNum = Number(numero_mesa);
    const capacidadNum = Number(capacidad);

    if (isNaN(numeroMesaNum) || isNaN(capacidadNum)) {
      Alert.alert("Error", "Número de mesa y capacidad deben ser números válidos");
      return;
    }

    try {
      await API.put(`/mesas/${selectedMesa.id_mesa}`, {
        numero_mesa: numeroMesaNum,
        capacidad: capacidadNum,
        estado,
      });
      Alert.alert("Éxito", "Mesa actualizada correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al modificar mesa:", error.response || error);
      Alert.alert(
        "Error",
        error.response?.data?.error || "No se pudo modificar la mesa"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Modificar Mesa</Text>

      <Text style={styles.subheader}>Selecciona una mesa:</Text>
      {mesas.length === 0 ? (
        <Text style={styles.noMesas}>No hay mesas disponibles.</Text>
      ) : (
        <FlatList
          data={mesas}
          keyExtractor={(item) => item.id_mesa.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.mesaCard,
                selectedMesa?.id_mesa === item.id_mesa && styles.mesaSelected,
              ]}
              onPress={() => handleSelectMesa(item)}
            >
              <MaterialIcons name="table-restaurant" size={28} color="#3b82f6" />
              <Text style={styles.mesaText}>
                Mesa {item.numero_mesa} ({item.estado})
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}

      {selectedMesa && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Número de Mesa:</Text>
          <TextInput
            style={styles.input}
            value={numero_mesa}
            onChangeText={setNumero}
            keyboardType="numeric"
            placeholder="Ej. 1"
          />

          <Text style={styles.label}>Capacidad:</Text>
          <TextInput
            style={styles.input}
            value={capacidad}
            onChangeText={setCapacidad}
            keyboardType="numeric"
            placeholder="Ej. 4"
          />

          <Text style={styles.label}>Estado:</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={estado} onValueChange={setEstado}>
              <Picker.Item label="Disponible" value="disponible" />
              <Picker.Item label="Reservada" value="reservada" />
              <Picker.Item label="Ocupada" value="ocupada" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f5f9" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#1e293b" },
  subheader: { fontSize: 18, marginBottom: 10, color: "#334155" },
  noMesas: { textAlign: "center", marginVertical: 20, fontSize: 16, color: "#64748b" },
  mesaCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  mesaSelected: {
    borderColor: "#3b82f6",
    borderWidth: 2,
    backgroundColor: "#e0f2fe",
  },
  mesaText: { marginTop: 5, fontSize: 16, fontWeight: "600", color: "#1e293b" },
  formContainer: { marginTop: 20, padding: 15, backgroundColor: "#fff", borderRadius: 12, shadowOpacity: 0.1, elevation: 3 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#334155" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f8fafc",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f8fafc",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
