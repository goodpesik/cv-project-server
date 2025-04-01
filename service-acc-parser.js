const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey.json not found!');
  process.exit(1);
}

const raw = fs.readFileSync(serviceAccountPath, 'utf-8');
const json = JSON.parse(raw);

const escapeNewLines = (key) => key.replace(/\n/g, '\\n');

const envLines = [
`FIREBASE_TYPE=${json.type}`,
`FIREBASE_PROJECT_ID=${json.project_id}`,
`FIREBASE_PRIVATE_KEY_ID=${json.private_key_id}`,
`FIREBASE_PRIVATE_KEY="${escapeNewLines(json.private_key)}"`,
`FIREBASE_CLIENT_EMAIL=${json.client_email}`,
`FIREBASE_CLIENT_ID=${json.client_id}`,
`FIREBASE_AUTH_URI=${json.auth_uri}`,
`FIREBASE_TOKEN_URI=${json.token_uri}`,
`FIREBASE_AUTH_PROVIDER_X509_CERT_URL=${json.auth_provider_x509_cert_url}`,
`FIREBASE_CLIENT_X509_CERT_URL=${json.client_x509_cert_url}`,
`FIREBASE_UNIVERSE_DOMAIN=${json.universe_domain}`,
];

const output = envLines.join('\n');

const outPath = path.resolve(__dirname, '.env');
fs.writeFileSync(outPath, output, 'utf-8');

console.log(`✅ .env.firebase generated at ${outPath}`);
console.log('\n--- Preview ---\n');
console.log(output);
