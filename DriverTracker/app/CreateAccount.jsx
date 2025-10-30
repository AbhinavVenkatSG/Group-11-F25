// App/CreateAccount.jsx
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const handleCreate = async () => {
    if (!isValidEmail(email)) return Alert.alert('Invalid email');
    if (password.length < 6) return Alert.alert('Password too short');
    if (password !== confirm) return Alert.alert('Passwords do not match');

    // TODO: POST to /api/auth/register; on success you can router.replace('/home')
    Alert.alert('Account created!', email);
    router.back();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}
                          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Driver Tracker App</Text>
        <Text style={styles.subtitle}>Create Account</Text>

        <TextInput style={styles.input} value={email} onChangeText={setEmail}
                   placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} value={password} onChangeText={setPassword}
                   placeholder="Password" secureTextEntry autoCapitalize="none" />
        <TextInput style={styles.input} value={confirm} onChangeText={setConfirm}
                   placeholder="Confirm password" secureTextEntry autoCapitalize="none" />

        <TouchableOpacity style={styles.button} onPress={handleCreate} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonGhost} onPress={() => router.back()} activeOpacity={0.8}>
          <Text style={styles.buttonGhostText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 28, marginBottom: 6, color: '#000' },
  subtitle: { fontWeight: '300', fontSize: 16, marginBottom: 24, color: '#333' },
  input: { width: '100%', height: 48, marginVertical: 8, borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 12, borderRadius: 10, fontSize: 16 },
  button: { width: '100%', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12, backgroundColor: '#0a84ff' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  buttonGhost: { marginTop: 8, padding: 10 },
  buttonGhostText: { color: '#0a84ff', fontWeight: '600' },
});
