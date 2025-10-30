// Login.jsx
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
} from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (str) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      return Alert.alert('Invalid email', 'Please enter a valid email address.');
    }
    if (password.length < 6) {
      return Alert.alert('Weak password', 'Password must be at least 6 characters.');
    }
    // TODO: Call your auth login here
    Alert.alert('Login', `Logging in as ${email.trim()}`);
  };

  const handleCreateAccount = () => {
    if (!isValidEmail(email)) {
      return Alert.alert('Invalid email', 'Please enter a valid email address.');
    }
    if (password.length < 6) {
      return Alert.alert('Weak password', 'Password must be at least 6 characters.');
    }
    // TODO: Call your sign-up flow here
    Alert.alert('Create Account', `Creating account for ${email.trim()}`);
  };

  const loginDisabled =
    !email.trim() || !password || !isValidEmail(email) || password.length < 6;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Driver Tracker App</Text>
        <Text style={styles.subtitle}>Login</Text>

        {/* Email */}
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

        {/* Password */}
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

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, loginDisabled && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loginDisabled}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Create Account Button (secondary) */}
        <TouchableOpacity
          style={[styles.buttonOutline]}
          onPress={handleCreateAccount}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonOutlineText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 6,
    color: '#000',
  },
  subtitle: {
    fontWeight: '300', // must be a string
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
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
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
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
  buttonOutlineText: {
    color: '#0a84ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
