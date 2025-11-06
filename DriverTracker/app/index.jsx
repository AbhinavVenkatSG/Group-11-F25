// App/index.jsx
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { Link, router } from 'expo-router';

import Logo from '../assets/DriverTrackerTempLogo.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const handleLogin = async () => {
    if (!isValidEmail(email)) return Alert.alert('Invalid email');
    if (password.length < 6) return Alert.alert('Password too short');
    // TODO: call your C# API, save tokens, then router.replace('/home') when you add it
    Alert.alert('Logged in!', email);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}
                          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>

        <Image source={Logo} style={styles.logo} resizeMode="contain" accessibilityLabel="Driver Tracker logo" />
        
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

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Expo Router link to /create-account */}
        <Link href="/CreateAccount" asChild>
          <TouchableOpacity style={styles.buttonOutline} activeOpacity={0.8}>
            <Text style={styles.buttonOutlineText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', paddingHorizontal:20, alignItems:'center', justifyContent:'center' },
  logo: { width: 150, height: 150, marginBottom: 12 },
  title:{ fontWeight:'bold', fontSize:28, marginBottom:6, color:'#000' },
  subtitle:{ fontWeight:'300', fontSize:16, marginBottom:24, color:'#333' },
  input: { width: '100%', height: 48, marginVertical: 8, borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 12, borderRadius: 10, fontSize: 16 },
  button: { width: '100%', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12, backgroundColor: '#0a84ff' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  buttonOutline: { width: '100%', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12, borderWidth: 1.5, borderColor: '#0a84ff', backgroundColor: '#fff' },
  buttonOutlineText: { color: '#0a84ff', fontWeight: '600', fontSize: 16 },

  title: {
  fontSize: 28,           
  lineHeight: 34,
  fontWeight: '700',
  color: '#0a0a0a',       
  textAlign: 'center',
  letterSpacing: 0.2,
  marginTop: 4,
  marginBottom: 8,
}

});
