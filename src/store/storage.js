/**
 * Secure Local Storage using Web Crypto API.
 * Uses AES-GCM for encryption.
 * Note: Check browser compatibility.
 */

const STORAGE_KEY_PREFIX = 'antigravity_data_';
const IV_LENGTH = 12;

// Helper to generate a key (In a real app without auth, we might derive this from a user pin)
// For this demo, we'll generate a random key and store it in session storage (so it clears on close) 
// or let the user re-generate. But the requirement says "never store key on server".
// We will store the key in localStorage for usability in this prototype, 
// effectively obfuscating the data from casual eyes, but acknowledging that 
// client-side only security without user-input password is limited.
const getOrGenerateKey = async () => {
    let keyJwk = localStorage.getItem(STORAGE_KEY_PREFIX + 'key');
    let key;
    if (keyJwk) {
        key = await window.crypto.subtle.importKey(
            "jwk",
            JSON.parse(keyJwk),
            { name: "AES-GCM" },
            true,
            ["encrypt", "decrypt"]
        );
    } else {
        key = await window.crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
        const exported = await window.crypto.subtle.exportKey("jwk", key);
        localStorage.setItem(STORAGE_KEY_PREFIX + 'key', JSON.stringify(exported));
    }
    return key;
};

export const secureSave = async (keyName, data) => {
    try {
        const key = await getOrGenerateKey();
        const encoded = new TextEncoder().encode(JSON.stringify(data));
        const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));

        const encrypted = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encoded
        );

        const packed = {
            iv: Array.from(iv),
            data: Array.from(new Uint8Array(encrypted))
        };

        localStorage.setItem(STORAGE_KEY_PREFIX + keyName, JSON.stringify(packed));
        return true;
    } catch (e) {
        console.error("Encryption failed", e);
        return false;
    }
};

export const secureLoad = async (keyName) => {
    try {
        const packedStr = localStorage.getItem(STORAGE_KEY_PREFIX + keyName);
        if (!packedStr) return null;

        const packed = JSON.parse(packedStr);
        const key = await getOrGenerateKey();

        const iv = new Uint8Array(packed.iv);
        const data = new Uint8Array(packed.data);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            data
        );

        return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (e) {
        console.error("Decryption failed", e);
        return null;
    }
};

export const clearAllData = () => {
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith(STORAGE_KEY_PREFIX)) {
            localStorage.removeItem(k);
        }
    });
};
