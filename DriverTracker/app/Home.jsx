// app/Home.jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // built-in with Expo
import { router } from 'expo-router';
import { useSession } from '../utils/session';
import { getJson } from '../config/api';

export default function Home() {
  const { driver } = useSession();
  const [driverScore, setDriverScore] = useState(null);

  useEffect(() => {
    if (!driver) {
      router.replace('/');
      return;
    }

    const loadScore = async () => {
      if (!driver) return;
      try {
        const data = await getJson(`/api/analytics/${driver.driverId}`);
        setDriverScore(data.driverScore);
      } catch (error) {
        Alert.alert('Analytics error', error.message);
      }
    };
    loadScore();
  }, [driver]);

  const handleStartTrip = () => {
    router.push('/StartTrip');
  };

  const handleTripHistory = () => {
    router.push('/TripHistory'); // create app/TripHistory.jsx to handle this
  };

  return (
    <View style={styles.container}>
      {/* Settings icon top-left */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          router.push('/Settings');
        }}
      >
        <Ionicons name="settings-outline" size={24} color="#0a0a0a" />
      </TouchableOpacity>

      {/* Basic content in the middle */}
      <View style={styles.centerContent}>
        <Text style={styles.welcome}>Welcome {driver?.name ?? 'Driver'}</Text>
        <Text style={styles.subtext}>You are now logged in.</Text>

        {/* Driver Score card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Driver Score</Text>
          <Text style={styles.scoreValue}>{driverScore ?? '--'}</Text>
          <Text style={styles.scoreSubtext}>Based on your recent trips</Text>
        </View>

        {/* Start Trip button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleStartTrip}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start a Trip</Text>
        </TouchableOpacity>

        {/* Trip History button */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={handleTripHistory}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonOutlineText}>View Trip History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  settingsButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcome: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0a0a0a',
  },

  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },

  // Driver score card styles
  scoreCard: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },

  scoreLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },

  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  scoreSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  button: {
    width: '70%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#0a84ff',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  buttonOutline: {
    width: '70%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#0a84ff',
    backgroundColor: 'transparent',
  },

  buttonOutlineText: {
    color: '#0a84ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
