// app/TripHistory.jsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';

const SAMPLE_TRIPS = [
  {
    id: '1',
    date: '2025-11-28',
    startTime: '08:15',
    endTime: '09:05',
    plate: 'SHWA 238',
    distance: '24.3 km',
    scoreImpact: '+2',
    rating: 'Excellent',
  },
  {
    id: '2',
    date: '2025-11-27',
    startTime: '14:10',
    endTime: '14:45',
    plate: 'SHWA 238',
    distance: '12.8 km',
    scoreImpact: '+1',
    rating: 'Good',
  },
  {
    id: '3',
    date: '2025-11-26',
    startTime: '17:30',
    endTime: '18:20',
    plate: 'SHWA 238',
    distance: '31.6 km',
    scoreImpact: '0',
    rating: 'Neutral',
  },
];

export default function TripHistory() {
  const renderItem = ({ item }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripRow}>
        <Text style={styles.tripDate}>{item.date}</Text>
        <Text style={styles.tripPlate}>{item.plate}</Text>
      </View>

      <View style={styles.tripRow}>
        <Text style={styles.tripLabel}>Time</Text>
        <Text style={styles.tripValue}>
          {item.startTime} - {item.endTime}
        </Text>
      </View>

      <View style={styles.tripRow}>
        <Text style={styles.tripLabel}>Distance</Text>
        <Text style={styles.tripValue}>{item.distance}</Text>
      </View>

      <View style={styles.tripRow}>
        <Text style={styles.tripLabel}>Score Impact</Text>
        <Text
          style={[
            styles.tripValue,
            item.scoreImpact.startsWith('+') && styles.positiveScore,
            item.scoreImpact.startsWith('-') && styles.negativeScore,
          ]}
        >
          {item.scoreImpact}
        </Text>
      </View>

      <View style={styles.tripRow}>
        <Text style={styles.tripLabel}>Rating</Text>
        <Text style={styles.tripValue}>{item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Trip History</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Recent Trips</Text>

        <FlatList
          data={SAMPLE_TRIPS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 16,
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

  content: {
    flex: 1,
    marginTop: 8,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },

  listContent: {
    paddingBottom: 16,
  },

  tripCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },

  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  tripDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  tripPlate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },

  tripLabel: {
    fontSize: 13,
    color: '#6b7280',
  },

  tripValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },

  positiveScore: {
    color: '#16a34a',
  },

  negativeScore: {
    color: '#dc2626',
  },
});
