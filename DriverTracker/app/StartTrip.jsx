// app/StartTrip.jsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function StartTrip() {
  const [selectedPlate, setSelectedPlate] = useState('SHWA 238');
  const [isTripActive, setIsTripActive] = useState(false);

  const handleStartTrip = () => {
    if (isTripActive) {
      Alert.alert('Trip Already Active', 'You already have an active trip.');
      return;
    }

    setIsTripActive(true);

    Alert.alert(
      'Trip Started',
      `Trip started for license plate: ${selectedPlate}`,
      [{ text: 'OK' }]
    );
  };

  const handleEndTrip = () => {
    if (!isTripActive) {
      Alert.alert('No Active Trip', 'There is no active trip to end.');
      return;
    }

    setIsTripActive(false);

    Alert.alert(
      'Trip Ended',
      `Trip ended for license plate: ${selectedPlate}`,
      [{ text: 'OK' }]
    );
  };

  const handleBackPress = () => {
    if (isTripActive) {
      Alert.alert(
        'Trip In Progress',
        'You must end the current trip before leaving this page.'
      );
      return;
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={[styles.backText, isTripActive && styles.backTextDisabled]}>
            ← Home
          </Text>
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
            enabled={!isTripActive} // lock plate selection during active trip
          >
            <Picker.Item label="SHWA 238" value="SHWA 238" />
          </Picker>
        </View>

        {/* Start Trip */}
        <TouchableOpacity
          style={[styles.button, isTripActive && styles.buttonDisabled]}
          onPress={handleStartTrip}
          activeOpacity={0.8}
          disabled={isTripActive}
        >
          <Text style={styles.buttonText}>Start A Trip</Text>
        </TouchableOpacity>

        {/* End Trip */}
        <TouchableOpacity
          style={[
            styles.buttonSecondary,
            !isTripActive && styles.buttonDisabled,
          ]}
          onPress={handleEndTrip}
          activeOpacity={0.8}
          disabled={!isTripActive}
        >
          <Text style={styles.buttonSecondaryText}>End Trip</Text>
        </TouchableOpacity>

        {/* Status text */}
        <Text style={styles.statusText}>
          Status: {isTripActive ? 'Trip in progress (page locked)' : 'No active trip'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 40 },
  header: { marginBottom: 24 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 2 },
  backText: { fontSize: 16, color: '#0a84ff', fontWeight: '600' },
  backTextDisabled: { color: '#9ca3af' },
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

  buttonSecondary: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#0a84ff',
    backgroundColor: '#fff',
  },

  buttonSecondaryText: {
    color: '#0a84ff',
    fontWeight: '600',
    fontSize: 16,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  statusText: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
