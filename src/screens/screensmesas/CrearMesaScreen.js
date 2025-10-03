import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import API from "../../api";

export default function CrearMesaScreen({ route, navigation }) {
  const { mesa } = route.params || {};
  const [numero_mesa, setNumero] = useState(mesa ? String(mesa.numero_mesa) : "");
  const [capacidad, setCapacidad] = useState(mesa ? String(mesa.capacidad) : "");
  const [estado, setEstado] = useState(mesa ? mesa.estado : "disponible");
  const [mesasExistentes, setMesasExistentes] = useState([]);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await API.get("/mesas");
        setMesasExistentes(res.data);
      } catch (error) {
        console.error("Error al obtener mesas:", error);
      }
    };
    fetchMesas();
  }, []);

  const handleGuardar = async () => {
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

    if (!mesa) {
      const existe = mesasExistentes.some(m => m.numero_mesa === numeroMesaNum);
      if (existe) {
        Alert.alert("Error", "Ya existe una mesa con ese número");
        return;
      }
    }

    try {
      if (mesa) {
        await API.put(`/mesas/${mesa.id_mesa}`, {
          numero_mesa: numeroMesaNum,
          capacidad: capacidadNum,
          estado,
        });
        Alert.alert("Éxito", "Mesa actualizada correctamente");
      } else {
        await API.post("/mesas", {
          numero_mesa: numeroMesaNum,
          capacidad: capacidadNum,
          estado,
        });
        Alert.alert("Éxito", "Mesa creada correctamente");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error en guardar mesa:", error.response || error);
      Alert.alert("Error", error.response?.data?.error || "No se pudo guardar la mesa");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mesa ? "Editar Mesa" : "Crear Mesa"}</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#1e293b",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#334155",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});