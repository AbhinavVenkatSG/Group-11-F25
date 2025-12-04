// Registration screen: creates a brand-new driver account by calling the API.
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { router } from 'expo-router';

const Logo = require('../assets/DriverTrackerTempLogo.png');
import { postJson } from '../config/api';
import { useSession } from '../utils/session';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/validation';

export default function CreateAccount() {
  const { driver, setDriver } = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  React.useEffect(() => {
    if (driver) {
      router.replace('/Home');
    }
  }, [driver]);

  const handleCreate = async () => {
    if (loading) return;

    if (!name.trim()) {
      return Alert.alert('Account error', 'Please enter your name.');
    }

    if (!isValidEmail(email)) {
      return Alert.alert('Account error', 'Please enter a valid email.');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return Alert.alert(
        'Account error',
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
    }

    if (password !== confirm) {
      return Alert.alert('Account error', 'Passwords do not match.');
    }

    try {
      setLoading(true);
      const created = await postJson('/api/drivers/register', {
        name: name.trim(),
        emailAddress: email.trim(),
        password,
      });
      setDriver(created);
      Alert.alert('Account created!', `Welcome aboard, ${created.name}!`);
      setPassword('');
      setConfirm('');
      router.replace('/Home');
    } catch (error) {
      Alert.alert('Account error', error.message ?? 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Keep the form visible while the on-screen keyboard is open.
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Image
          source={Logo}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Driver Tracker logo"
        />

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full name"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm password"
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleCreate} activeOpacity={0.85} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Create Account'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonGhost} onPress={() => router.back()} activeOpacity={0.85}>
          <Text style={styles.buttonGhostText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 150, height: 150, marginBottom: 12 },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#0a0a0a',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
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
  buttonGhost: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  buttonGhostText: {
    color: '#0a84ff',
    fontWeight: '600',
  },
});
