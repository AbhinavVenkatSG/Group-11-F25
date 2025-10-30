// App/CreateAccount.jsx
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { router } from 'expo-router';

import Logo from '../assets/DriverTrackerTempLogo.png'

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

        <Image source={Logo} style={styles.logo} resizeMode="contain" accessibilityLabel="Driver Tracker logo" />

        <Text style={styles.title}>Create Account</Text>

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
          <Text style={styles.buttonGhostText }>Back to Login</Text>
        </TouchableOpacity>
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
