// IBAN encryption utilities using Web Crypto API (AES-256-GCM)
// Used for encrypting sensitive bank account data at rest

/**
 * Encrypt IBAN using AES-256-GCM
 * @param {string} iban - The IBAN to encrypt
 * @param {string} keyHex - 32-byte hex-encoded encryption key
 * @returns {Promise<string>} Base64-encoded encrypted data (iv:ciphertext:tag)
 */
export async function encryptIBAN(iban, keyHex) {
  // Convert hex key to Uint8Array
  const keyBytes = hexToBytes(keyHex);

  // Import key for AES-GCM
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt']);

  // Generate random 12-byte IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the IBAN
  const encoder = new TextEncoder();
  const plaintext = encoder.encode(iban);

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);

  // Combine IV and ciphertext, encode as base64
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return bytesToBase64(combined);
}

/**
 * Decrypt IBAN using AES-256-GCM
 * @param {string} encrypted - Base64-encoded encrypted data
 * @param {string} keyHex - 32-byte hex-encoded encryption key
 * @returns {Promise<string>} The decrypted IBAN
 */
export async function decryptIBAN(encrypted, keyHex) {
  // Convert hex key to Uint8Array
  const keyBytes = hexToBytes(keyHex);

  // Import key for AES-GCM
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']);

  // Decode base64 and extract IV and ciphertext
  const combined = base64ToBytes(encrypted);
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  // Decrypt
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);

  const decoder = new TextDecoder();
  return decoder.decode(plaintext);
}

// Helper: Convert hex string to Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

// Helper: Convert Uint8Array to base64
function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper: Convert base64 to Uint8Array
function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
