// app/Settings.jsx

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { deleteJson } from '../config/api';
import { useSession } from '../utils/session';

export default function Settings() {
  const { driver, clear } = useSession();

  if (!driver) {
    router.replace('/');
    return null;
  }

  const handleViewAccountInfo = () => {
    router.push('/AccountInfo');
  };

  const handleUpdateAccountInfo = () => {
    router.push('/UpdateAccount');
  };

  const handleDeleteAccount = () => {
    if (!driver) {
      Alert.alert('Not logged in', 'Please log in again.');
      return;
    }

    Alert.alert(
      'Delete Account',
      'This will permanently delete your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteJson(`/api/drivers/${driver.driverId}`);
              clear();
              router.replace('/');
            } catch (error) {
              Alert.alert('Delete failed', error.message);
            }
          },
        },
      ],
    );
  };

  const handleVehicleSettings = () => {
    router.push('/VehicleSettings');
  };

  const handleLogOutSettings = () => {
    clear();
    Alert.alert('Logged Out', 'Successfully logged out.');
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
