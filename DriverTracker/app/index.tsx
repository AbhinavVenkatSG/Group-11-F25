// Login screen: collects the email and password, then asks the API to log the user in.
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
import { Link, router } from 'expo-router';

const Logo = require('../assets/DriverTrackerTempLogo.png');
import { postJson } from '../config/api';
import { useSession } from '../utils/session';
import { isValidEmail, MIN_PASSWORD_LENGTH } from '../utils/validation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { driver, setDriver } = useSession();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (driver) {
      router.replace('/Home');
    }
  }, [driver]);

  const handleLogin = async () => {
    if (loading) return;
    if (!isValidEmail(email)) {
      return Alert.alert('Login failed', 'Please enter a valid email.');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return Alert.alert('Login failed', `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }

    setLoading(true);
    try {
      const result = await postJson('/api/drivers/login', {
        emailAddress: email.trim(),
        password,
      });
      setDriver(result);
      Alert.alert('Welcome back!', `Signed in as ${result.name}.`);
      setPassword('');
      router.replace('/Home');
    } catch (error) {
      Alert.alert('Login failed', error.message ?? 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // KeyboardAvoidingView stops the keyboard from hiding the fields on mobile.
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

        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          returnKeyType="next"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>

        <Link href="/CreateAccount" asChild>
          <TouchableOpacity style={styles.buttonOutline} activeOpacity={0.85}>
            <Text style={styles.buttonOutlineText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
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
  buttonOutline: {
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
  buttonOutlineText: { color: '#0a84ff', fontWeight: '600', fontSize: 16 },
});
