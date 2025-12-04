// app/VehicleSettings.jsx
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert,
} from 'react-native';
import { router } from 'expo-router';

export default function VehicleSettings() {
  const [carName, setCarName] = useState('');
  const [plate, setPlate] = useState('');
  const [vehicles, setVehicles] = useState([]);

  const handleAddVehicle = () => {
    if (!carName.trim() || !plate.trim()) {
      Alert.alert('Missing Info', 'Please enter both car name and license plate.');
      return;
    }

    const newVehicle = {
      id: Date.now().toString(),
      name: carName.trim(),
      plate: plate.trim(),
    };

    setVehicles((prev) => [...prev, newVehicle]);
    setCarName('');
    setPlate('');
    Alert.alert('Vehicle Added', `${newVehicle.name} (${newVehicle.plate}) has been added.`);
  };

  const handleDeleteVehicle = (vehicle) => {
    Alert.alert(
      'Delete Vehicle',
      `Remove ${vehicle.name} (${vehicle.plate}) from saved vehicles?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.vehicleItem}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteVehicle(item)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Settings</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Vehicle Settings</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Car Name</Text>
        <TextInput
          style={styles.input}
          value={carName}
          onChangeText={setCarName}
          placeholder="e.g., Work Van, Personal Car"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>License Plate</Text>
        <TextInput
          style={styles.input}
          value={plate}
          onChangeText={setPlate}
          autoCapitalize="characters"
          placeholder="e.g., SHWA 238"
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity style={styles.button} onPress={handleAddVehicle}>
          <Text style={styles.buttonText}>Add Vehicle</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Saved Vehicles</Text>
        {vehicles.length === 0 ? (
          <Text style={styles.emptyText}>No vehicles added yet.</Text>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 40 },
  header: { marginBottom: 24 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 2 },
  backText: { fontSize: 16, color: '#0a84ff', fontWeight: '600' },
  title: { fontSize: 28, fontWeight: '700', color: '#0a0a0a', marginTop: 8 },
  form: { marginTop: 16 },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a84ff',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  listContainer: { flex: 1, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#9ca3af' },
  vehicleItem: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleInfo: {
    flexShrink: 1,
  },
  vehicleName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  vehiclePlate: { fontSize: 14, color: '#4b5563', marginTop: 2 },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b91c1c',
  },
});
