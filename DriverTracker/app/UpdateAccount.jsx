// app/UpdateAccount.jsx
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { putJson } from '../config/api';
import { useSession } from '../utils/session';
import { isValidEmail } from '../utils/validation';

export default function UpdateAccount() {
  const { driver, setDriver } = useSession();
  const [name, setName] = useState(driver?.name ?? '');
  const [email, setEmail] = useState(driver?.emailAddress ?? '');

  const handleSave = async () => {
    if (!driver) {
      return Alert.alert('Not logged in', 'Please log in again.');
    }

    if (email && !isValidEmail(email)) {
      return Alert.alert('Invalid email', 'Please enter a valid email.');
    }

    try {
      const updated = await putJson(`/api/drivers/${driver.driverId}`, {
        name: name?.trim() || undefined,
        emailAddress: email?.trim() || undefined,
        password: undefined,
      });
      setDriver(updated);
      Alert.alert('Account Updated', 'Your account details have been saved.');
      router.back();
    } catch (error) {
      Alert.alert('Update failed', error.message);
    }
  };

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
        <Text style={styles.title}>Update Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
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
});
