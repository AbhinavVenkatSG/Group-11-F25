// app/TripHistory.jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '../utils/session';
import { getJson } from '../config/api';

export default function TripHistory() {
  const { driver } = useSession();
  const [trips, setTrips] = useState([]);
  const [vehicleMap, setVehicleMap] = useState({});

  useEffect(() => {
    if (!driver) {
      router.replace('/');
      return;
    }

    const load = async () => {
      if (!driver) return;
      try {
        const [list, vehicles] = await Promise.all([
          getJson(`/api/trips/by-driver/${driver.driverId}`),
          getJson(`/api/vehicles/by-driver/${driver.driverId}`),
        ]);
        setTrips(list);
        const map = {};
        vehicles.forEach((v) => {
          map[v.vehicleId] = `${v.carName} (${v.plateNumber})`;
        });
        setVehicleMap(map);
      } catch (error) {
        Alert.alert('Trip error', error.message);
      }
    };
    load();
  }, [driver]);

  const renderItem = ({ item }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripRow}>
        <Text style={styles.tripDate}>{new Date(item.startTime).toLocaleDateString()}</Text>
        <Text style={styles.tripPlate}>{vehicleMap[item.vehicleId] ?? item.vehicleId}</Text>
      </View>

      <View style={styles.tripRow}>
        <Text style={styles.tripLabel}>Time</Text>
        <Text style={styles.tripValue}>
          {new Date(item.startTime).toLocaleTimeString()} - {new Date(item.endTime).toLocaleTimeString()}
        </Text>
      </View>
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
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Trip History</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Recent Trips</Text>

        {trips.length === 0 ? (
          <Text style={styles.emptyText}>No trips yet.</Text>
        ) : (
          <FlatList
            data={trips}
            keyExtractor={(item) => item.tripId}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 16,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 2,
  },

  backText: {
    fontSize: 16,
    color: '#0a84ff',
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#0a0a0a',
    marginTop: 8,
  },

  content: {
    flex: 1,
    marginTop: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },

  listContent: {
    paddingBottom: 16,
  },

  tripCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },

  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  tripDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  tripPlate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },

  tripLabel: {
    fontSize: 13,
    color: '#6b7280',
  },

  tripValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },

  positiveScore: {
    color: '#16a34a',
  },

  negativeScore: {
    color: '#dc2626',
  },
  emptyText: { fontSize: 14, color: '#6b7280' },
});
