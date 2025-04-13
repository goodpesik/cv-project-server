module.exports = {
  apps: [
    {
      name: 'cv-project-server',
      script: './dist/main.js',
      env: {
        FIREBASE_TYPE: 'service_account',
        FIREBASE_PROJECT_ID: 'cv-project-g',
        FIREBASE_PRIVATE_KEY_ID: 'eba7268c6705187f7153bf57aacdf495dbf2f754',
        FIREBASE_PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4eZW7ydsXhXHA\nAQu3NNlw6wuTf43u+wTooP71ia9QJ0sUXqW2wkfq9cDC2OAmP1JRhXFX7Vcp0dEY\nzLbKu+Dl64Xgl+btDVvdYX9uX/M2+XjixrwLzJoha5JEW0Llu18uYgyYg7gEnfuI\nPaxhFOM1UXSDAn539lQBJptc/tNKLjA60AyvJTmIEh02quM/gGyVKCVrRWfKOtNY\n/f5RDsqX7cHSNzuwVnaXV/2yYzNC5ZmJIQaVrWB1R8HHkQsQW4Yyl2CI7Fp2ujQU\nVmhb7OnAh5oXCzQtr9Waz0ACjoItRCmkqrX+QJF1Y3KREnwYeyPQmltlZ10U8kRw\nk5pZckJHAgMBAAECggEAFKCDvZu0g8zIC1ASn0mphpbBlJyOokovIlPeLlZW4/+A\nxaZPoT/YCs2v4Bmf9qbd7X+eTNadCHANkVhSmBip7QuIzLQvfhIgU4CzXwQbjeoX\nOkQ+gpM+KL5+fGY39LgezHDqN6OC0AFaPsGmpLRRM4UIIh4FRiSk//vxI1TbC1Au\nHDHsj5MHfjK+6lYrv5InaXdVtIVDjGMj7sM3uU7epai5LBcb4fHEcrPbkxEcZ2De\nBablR9ja4/XL5CAF+28L7tMJp9j1Jit/fKUPlZHfZBXMTsuBbs5o/ZuEEuBsAt6n\nIW9tLpjP+RgOWG8neTXOOKJTGsAkoeJyHjwQL8ecAQKBgQDpMT/AAw8PT3pyNbpP\nb/q4RPgW19zcuJqoXSmkSGhkbpqF0Xr8LFhw03tr7bRtBd004poNo09e32s6q6Hi\nuoFVLemU8ZUMjvdWo4xjutZpPJgwlgiky6BjIAJ0aVqUr6ZXqHaS1ZG5SH9jHzgW\nfe08EIYPIux+5MP4K6WQdzcZEQKBgQDKhIgrFS8SJKvkHmLzMNprzW/OcO3Z0soU\nAA0jYLvrl7154N2BtvBiZRvKihvJ2sConWmGZ8/vz2jUdPNGrW6dh4J1sPYmzyUK\n/Xx0m3KOR/IxcsNj+8cR640EG9cuNtDk/IiWX0A4zrTZNZLasQHoXSAvS95iB7Bk\n1uE85MDl1wKBgQCSuZ43HrWXGJcezZeQ7BCBaUQAe4pIhw8o6JWO/NBSgRVRJeGQ\nUgbD1w1Nd5+TCaGJ6RqtghgqxcEehWey1U8TXXQfd3IlGL+gEAABsEnApZPM3lpJ\n9qXQOQ/SV4fbDjpH5YPWF/M89dTRdY9A97MRnAP9+id8IEz+Fdhy8dAFQQKBgHzw\nptFtkEyxMxrZZFKEoTxA0ema4iKwWNtd7L0WwNjoFI1MnVuZcVRC7JJYAizWOGXO\nN3wkL7TTUOlB/ZRtCwFEyMezFSl8Qm41VMLb5CDDYjf/hWv5uSblG2qdgnOQfe/H\nnLyopwZlAE3BL4icC4E/csu7EseH1ttfdjYLKrahAoGBALCuPuFj7QAWQiQr7TJo\njbtqgx2v1ITGBXsWLx+VX0+ml9mWgwNfVv1pQGo1fwvcyVe43Xs1PqFwxXeEKIrW\nuuRwMtR2aHh+JK9qOCaYmDfkac2cp/J4f7SMYF0h9uDi/gCVIi29mWdrD13KSoDd\n6U+zXjL0CcLp4w3dog5byz6o\n-----END PRIVATE KEY-----\n",
        FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-fbsvc@cv-project-g.iam.gserviceaccount.com',
        FIREBASE_CLIENT_ID: '104431187616074576767',
        FIREBASE_AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
        FIREBASE_TOKEN_URI: 'https://oauth2.googleapis.com/token',
        FIREBASE_AUTH_PROVIDER_X509_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
        FIREBASE_CLIENT_X509_CERT_URL: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40cv-project-g.iam.gserviceaccount.com',
        FIREBASE_UNIVERSE_DOMAIN: 'googleapis.com',
        MONGODB_URI: "mongodb://localhost/cvproject",
        API_KEY: "c61a0c6d-1448-4302-b216-e00f980b7f23"
      }
    }
  ]
}
