// App/index.jsx (inside your Login component)

import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, Image
} from 'react-native';

import Logo from '../assets/DriverTrackerTempLogo.png';

import { Link, router } from 'expo-router';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const handleLogin = () => {
    // basic fake validation for now
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing info', 'Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    // TODO: replace this with real auth later
    // If login "succeeds", go to Home:
    router.replace('/Home'); // <-- MUST match your Home.jsx route name
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {/* your existing layout */}
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>DriverTracker</Text>
      </View>

      {/* inputs... */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* link to CreateAccount (you probably already have this) */}
      <TouchableOpacity style={styles.buttonOutline}>
        <Link href="/CreateAccount">
          <Text style={styles.buttonOutlineText}>Create an Account</Text>
        </Link>
      </TouchableOpacity>
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
  // add this if needed:
  // marginBottom: 8,
},

buttonGhost: {
  marginTop: 20,          
  paddingVertical: 8,
  paddingHorizontal: 6,
},

buttonGhostText: {
  color: '#0a84ff',
  fontWeight: '600',
}

});
