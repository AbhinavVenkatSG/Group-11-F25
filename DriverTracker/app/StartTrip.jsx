// app/StartTrip.jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { useSession } from '../utils/session';
import { getJson, postJson } from '../config/api';

export default function StartTrip() {
  const { driver } = useSession();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isTripActive, setIsTripActive] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [pollId, setPollId] = useState(null);
  const [tripSummary, setTripSummary] = useState(null);
  const [liveSamples, setLiveSamples] = useState([]);
  const [lastCoords, setLastCoords] = useState(null);

  useEffect(() => {
    if (!driver) {
      router.replace('/');
      return;
    }

    const loadVehicles = async () => {
      if (!driver) return;
      try {
        const list = await getJson(`/api/vehicles/by-driver/${driver.driverId}`);
        setVehicles(list);
        if (list.length > 0) {
          setSelectedVehicleId(list[0].vehicleId);
        }
      } catch (error) {
        Alert.alert('Vehicle error', error.message);
      }
    };
    loadVehicles();
  }, [driver]);

  useEffect(() => {
    return () => {
      if (pollId) {
        clearInterval(pollId);
      }
    };
  }, [pollId]);

  const handleStartTrip = async () => {
    if (isTripActive) {
      Alert.alert('Trip Already Active', 'You already have an active trip.');
      return;
    }

    if (!driver) {
      Alert.alert('Not logged in', 'Please log in again.');
      return;
    }

    if (!selectedVehicleId) {
      Alert.alert('No vehicle', 'Add a vehicle before starting a trip.');
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to track trips.');
        return;
      }

      const started = await postJson('/api/trips/start', {
        driverId: driver.driverId,
        vehicleId: selectedVehicleId,
        startTime: new Date().toISOString(),
      });
      setCurrentTrip(started);
      setIsTripActive(true);
      setLiveSamples([]);
      setLastCoords(null);

      startPolling(started.tripId);
      setTripSummary(null);
      Alert.alert('Trip Started', 'Tracking your trip every 5 seconds.');
    } catch (error) {
      Alert.alert('Trip error', error.message);
    }
  };

  const handleEndTrip = async () => {
    if (!isTripActive || !currentTrip) {
      Alert.alert('No Active Trip', 'There is no active trip to end.');
      return;
    }

    try {
      if (pollId) {
        clearInterval(pollId);
        setPollId(null);
      }

      const result = await postJson(`/api/trips/${currentTrip.tripId}/end`, {
        endTime: new Date().toISOString(),
      });

      setIsTripActive(false);
      setCurrentTrip(null);
      setTripSummary(result?.trip ?? { samples: [], avgSpeed: 0, durationSeconds: 0 });
      setLiveSamples([]);
      setLastCoords(null);
      Alert.alert('Trip Ended', `Driver Score: ${result.driverScore}`);
    } catch (error) {
      Alert.alert('End trip failed', error.message);
    }
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
        <Text style={styles.label}>Select Vehicle</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedVehicleId}
            onValueChange={setSelectedVehicleId}
            enabled={!isTripActive} // lock plate selection during active trip
          >
            {vehicles.map((v) => (
              <Picker.Item key={v.vehicleId} label={`${v.carName} (${v.plateNumber})`} value={v.vehicleId} />
            ))}
          </Picker>
        </View>
        {vehicles.length === 0 && (
          <Text style={styles.statusText}>Add a vehicle before starting a trip.</Text>
        )}

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

      {isTripActive && (
        <View style={styles.liveCard}>
          <Text style={styles.summaryTitle}>Live Samples (last 10)</Text>
          {liveSamples.length === 0 ? (
            <Text style={styles.statusText}>Waiting for first sample...</Text>
          ) : (
            <FlatList
              data={liveSamples}
              keyExtractor={(item) => item.sampleId}
              renderItem={({ item }) => (
                <View style={styles.sampleRow}>
                  <Text style={styles.sampleText}>{new Date(item.curTime).toLocaleTimeString()}</Text>
                  <Text style={styles.sampleText}>
                    {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                  </Text>
                  <Text style={styles.sampleText}>{item.calculatedSpeed} km/h</Text>
                </View>
              )}
            />
          )}
        </View>
      )}

      {tripSummary && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <Text>Avg Speed: {tripSummary.avgSpeed} km/h</Text>
          <Text>
              Duration: {Math.round(tripSummary.durationSeconds)} seconds
            </Text>
            <Text style={styles.summarySubtitle}>Telemetry Samples</Text>
            {tripSummary.samples.length === 0 ? (
              <Text style={styles.statusText}>No samples collected.</Text>
            ) : (
              <FlatList
                data={tripSummary.samples}
                keyExtractor={(item) => item.sampleId}
                renderItem={({ item }) => (
                  <View style={styles.sampleRow}>
                    <Text style={styles.sampleText}>
                      {new Date(item.curTime).toLocaleTimeString()}
                    </Text>
                    <Text style={styles.sampleText}>
                      {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                    </Text>
                    <Text style={styles.sampleText}>{item.calculatedSpeed} km/h</Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );

  function startPolling(tripId) {
    // Send an immediate first sample so the trip has data even before the interval fires.
    sendSample(tripId);

    const poll = setInterval(async () => {
      sendSample(tripId);
    }, 5000);

    setPollId(poll);
  }

  async function sendSample(tripId) {
    try {
      // Ensure permission is still granted
      const perm = await Location.getForegroundPermissionsAsync();
      if (perm.status !== 'granted') {
        const req = await Location.requestForegroundPermissionsAsync();
        if (req.status !== 'granted') {
          console.warn('telemetry error', 'Location permission not granted.');
          return;
        }
      }

      // Try current position; fall back to last known to avoid hard failure.
      let location = null;
      try {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      } catch (innerErr) {
        location = await Location.getLastKnownPositionAsync();
      }

      if (!location) {
        console.warn('telemetry error', 'No location available (emulator may need a mock location).');
        return;
      }

      let { latitude, longitude } = location.coords;

      // If the emulator/device is not moving, add a tiny jitter so speed can be calculated in this POC.
      if (lastCoords && Math.abs(latitude - lastCoords.latitude) < 0.000001 && Math.abs(longitude - lastCoords.longitude) < 0.000001) {
        const jitter = () => (Math.random() - 0.5) * 0.0002; // ~20m jitter
        latitude += jitter();
        longitude += jitter();
      }

      setLastCoords({ latitude, longitude });
      const sample = await postJson(`/api/telemetry/trip/${tripId}`, {
        latitude,
        longitude,
        curTime: new Date().toISOString(),
      });

      // Track live samples (latest first, capped at 10)
      setLiveSamples((prev) => {
        const updated = [sample, ...prev];
        return updated.slice(0, 10);
      });
    } catch (error) {
      console.warn('telemetry error', error?.message ?? error);
    }
  }
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
  summaryCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  liveCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f0f9ff',
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  summarySubtitle: { marginTop: 8, fontWeight: '600' },
  sampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sampleText: { fontSize: 12, color: '#111827' },
});
