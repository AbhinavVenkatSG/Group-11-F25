// app/AccountInfo.jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function AccountInfo() {
  // Later you can pull real user data from context / API
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Driver',
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
        <Text style={styles.title}>Account Info</Text>
      </View>

      {/* Content */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{mockUser.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{mockUser.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{mockUser.role}</Text>
        </View>
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
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  row: {
    marginBottom: 12,
  },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 2 },
  value: { fontSize: 16, color: '#111827', fontWeight: '500' },
});
