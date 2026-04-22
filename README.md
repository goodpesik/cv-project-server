# CV Project — Backend

NestJS backend for the CV builder. Handles authentication (Firebase Admin SDK), CV document CRUD (MongoDB), photo uploads, and PDF generation (Puppeteer + Chromium).

- **Framework:** NestJS
- **Database:** MongoDB (via Mongoose)
- **Auth:** Firebase Admin SDK
- **PDF:** Puppeteer
- **Port:** `3003`

---

## Prerequisites

### 1. Node.js and npm

You need **Node.js 20+** and npm.

**macOS (via Homebrew — recommended):**
```bash
brew install node
```

Or use [nvm](https://github.com/nvm-sh/nvm):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20
```

**Windows:**

Download the installer from [nodejs.org](https://nodejs.org/) (LTS version). It installs both `node` and `npm`.

Or use [nvm-windows](https://github.com/coreybutler/nvm-windows):
```powershell
nvm install 20
nvm use 20
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install nodejs
```

Verify:
```bash
node --version   # v20.x.x or higher
npm --version
```

---

### 2. MongoDB

The server requires a running MongoDB instance.

**macOS (via Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

MongoDB will run on `mongodb://localhost:27017` by default.

**Windows:**

1. Download the Community Server installer from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
2. Run the installer — select "Complete" setup and check **Install MongoDB as a Service**.
3. MongoDB starts automatically on boot. To start/stop manually, use **Services** (Win+R → `services.msc`) or:
```powershell
net start MongoDB
net stop MongoDB
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod   # start on boot
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
mongosh --eval "db.runCommand({ connectionStatus: 1 })"
```

---

### 3. Chromium (for PDF generation)

PDF export uses Puppeteer, which expects Chromium at `/usr/bin/chromium-browser`.

**macOS:**

Puppeteer downloads Chromium automatically during `npm install`. No extra steps needed.

> If PDF generation fails on macOS, check that the Puppeteer-bundled Chrome path is used. You may need to update `PdfService` to use the path returned by `puppeteer.executablePath()`.

**Windows:**

Puppeteer downloads Chromium automatically during `npm install`. No extra steps needed.

> On Windows the Chromium binary path differs — if PDF generation fails, update `PdfService` to use `puppeteer.executablePath()` instead of the hardcoded `/usr/bin/chromium-browser`.

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y chromium-browser
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install chromium
# Chromium may be installed as 'chromium', not 'chromium-browser'
# Create a symlink if needed:
sudo ln -s /usr/bin/chromium /usr/bin/chromium-browser
```

---

## Setup

### 1. Install dependencies

```bash
cd cv-project-server
npm install
```

### 2. Create the environment file

Create a `.env` file inside the `cv-project-server/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/cv-project

API_KEY=your_static_api_key_here

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `API_KEY` | Static key for the public CV view route — must match `NEXT_PUBLIC_API_KEY` in the frontend |
| `FIREBASE_*` | Firebase Admin SDK service account credentials (see Firebase Setup below) |

### 3. Start the dev server

```bash
npm run start:dev
```

Server runs at [http://localhost:3003](http://localhost:3003).

---

## Firebase Admin SDK Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Project Settings → Service accounts**.
2. Click **Generate new private key** — this downloads a JSON file.
3. Copy each field from the JSON into the corresponding `FIREBASE_*` variable in `.env`.

> **Important:** The `FIREBASE_PRIVATE_KEY` value contains literal `\n` characters. When placing it in `.env`, keep it as a single quoted string with `\n` preserved — do not expand it to actual newlines.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Start with file watching (development) |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Start compiled production build |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run test` | Run Jest unit tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:cov` | Jest with coverage report |
| `npm run test:e2e` | Run end-to-end tests |

To run a single test file:
```bash
npx jest path/to/file.spec.ts
```

---

## Notes

- Uploaded CV photos are stored in the `uploads/` folder and served as static files at `/uploads/`.
- A nightly cron job (runs at 03:00) automatically cleans up orphaned files in `uploads/` that are no longer referenced by any CV document.
- The frontend must be running and accessible for PDF generation to work — Puppeteer navigates to the CV view URL, renders it, and returns the PDF.
