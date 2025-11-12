// app/Home.jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // built-in with Expo
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Settings icon top-left */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => { router.push('/Settings')
          console.log('Settings pressed');
        }}
      >
        <Ionicons name="settings-outline" size={24} color="#0a0a0a" />
      </TouchableOpacity>

      {/* Basic content in the middle */}
      <View style={styles.centerContent}>
        <Text style={styles.welcome}>Welcome to DriverTracker</Text>
        <Text style={styles.subtext}>You are now logged in.</Text>
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
  },
});