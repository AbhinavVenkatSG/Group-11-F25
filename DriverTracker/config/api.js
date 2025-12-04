// Simple helpers for talking to the C# API.
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const DEFAULT_DEV_PORT = 5086;
const ANDROID_LOOPBACK = '10.0.2.2';

/**
 * Expo Go runs on a device/emulator, so "localhost" often points at the device
 * instead of your computer. Grab the dev-server host if Expo exposed it,
 * otherwise fall back to reasonable platform defaults.
 */
function resolveDevHost() {
  const expoHost =
    Constants.expoConfig?.hostUri ??
    Constants.expoConfig?.debuggerHost ??
    Constants.manifest2?.extra?.expoGo?.developerServerHost ??
    Constants.manifest?.debuggerHost;

  if (expoHost) {
    return expoHost.replace('exp://', '').split(':')[0];
  }

  if (Platform.OS === 'android') {
    // Android emulators map the host machine to 10.0.2.2 by default.
    return ANDROID_LOOPBACK;
  }

  return 'localhost';
}

function buildDevBaseUrl() {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:${DEFAULT_DEV_PORT}`;
  }

  return `http://${resolveDevHost()}:${DEFAULT_DEV_PORT}`;
}

// Allow overriding the backend URL via EXPO_PUBLIC_API_BASE_URL, which is useful for staging/prod.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ||
  buildDevBaseUrl() ||
  `http://${ANDROID_LOOPBACK}:${DEFAULT_DEV_PORT}`;

// Surface the base URL in logs to help diagnose connectivity issues.
console.log('API_BASE_URL', API_BASE_URL);

async function sendJson(path, method, body) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    throw new Error(networkError?.message ?? 'Network request failed.');
  }

  const text = await response.text();
  const hasContent = text.length > 0;
  const data = hasContent ? safeParseJson(text) : null;

  if (!response.ok) {
    const message = (data?.message ?? text) || 'Something went wrong.';
    throw new Error(message);
  }

  return data;
}

export const postJson = (path, body) => sendJson(path, 'POST', body);
export const putJson = (path, body) => sendJson(path, 'PUT', body);
export const deleteJson = (path) => sendJson(path, 'DELETE');
export const getJson = (path) => sendJson(path, 'GET');

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
