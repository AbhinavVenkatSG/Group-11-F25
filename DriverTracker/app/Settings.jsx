// app/Settings.jsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

export default function Settings() {
  const handleViewAccountInfo = () => {
    Alert.alert('View Account Info', 'This will show the user’s account details.');
    // later: router.push('/AccountInfo');
  };

  const handleUpdateAccountInfo = () => {
    Alert.alert('Update Account Info', 'This will let the user edit their account details.');
    // later: router.push('/UpdateAccount');
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'This will start the account deletion flow.');
    // later: router.push('/DeleteAccount');
  };

  const handleVehicleSettings = () => {
    Alert.alert('Vehicle Settings', 'This will open vehicle-related settings.');
    // later: router.push('/VehicleSettings');
  };

    const handleLogOutSettings = () => {
     Alert.alert('Logged Out Settings', 'Successfully Logged Out.');
     router.replace('/'); // Go to Login Page
    };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()} // or router.replace('/Home')
        >
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Options list */}
      <View style={styles.list}>
        <TouchableOpacity style={styles.item} onPress={handleViewAccountInfo}>
          <Text style={styles.itemText}>View Account Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleUpdateAccountInfo}>
          <Text style={styles.itemText}>Update Account Info</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleVehicleSettings}>
          <Text style={styles.itemText}>Vehicle Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleLogOutSettings}>
          <Text style={styles.itemText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
          <Text style={[styles.itemText, styles.dangerText]}>Delete Account</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    marginBottom: 24,
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

  list: {
    marginTop: 16,
  },

  item: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },

  itemText: {
    fontSize: 16,
    color: '#0a0a0a',
    fontWeight: '500',
  },

  dangerText: {
    color: '#dc2626', // red for delete account
  },
});