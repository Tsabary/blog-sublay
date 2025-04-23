import forge from "node-forge";

export default function (rawData: string, publicKeyBase64: string) {
  // Decode the base64-encoded PEM string using node-forge
  const restoredPublicKeyPem = forge.util.decode64(publicKeyBase64);

  // Convert PEM to a public key object
  const restoredPublicKey = forge.pki.publicKeyFromPem(restoredPublicKeyPem);

  // Encrypt the raw data using RSA-OAEP
  const encryptedData = restoredPublicKey.encrypt(rawData, "RSA-OAEP");

  // Return the encrypted data as a base64-encoded string
  return forge.util.encode64(encryptedData);
}
