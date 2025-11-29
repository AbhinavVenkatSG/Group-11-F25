// app/StartTrip.jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function StartTrip() {
  const [selectedPlate, setSelectedPlate] = useState('SHWA 238');

  const handleStartTrip = () => {
    // Show popup / notification
    Alert.alert(
      'Trip Started',
      `Trip started for license plate: ${selectedPlate}`,
      [{ text: 'OK' }]
    );

    // Later you can also navigate or save state here if needed
    // e.g. router.push('/SomeNextScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Start Trip</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Select License Plate</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPlate}
            onValueChange={setSelectedPlate}
          >
            <Picker.Item label="SHWA 238" value="SHWA 238" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStartTrip}>
          <Text style={styles.buttonText}>Start A Trip</Text>
        </TouchableOpacity>
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
  content: { marginTop: 16 },
  label: { fontSize: 16, fontWeight: '500', color: '#0a0a0a', marginBottom: 8 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#0a84ff',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
