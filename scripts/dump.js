import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const MONGO_CONTAINER = "6c465043ec79";
const DUMP_NAME = "dump.archive";
const LOCAL_DUMP_PATH = `~/tmp/${DUMP_NAME}`;
const GDRIVE_REMOTE = "goodpesyk-drive:MongoBackups";
const today = new Date();
async function dumpMongo() {
  console.log(`${today}`, "📦 Creating MongoDB dump...");

  await execAsync(`docker exec ${MONGO_CONTAINER} mongodump --archive=/tmp/${DUMP_NAME}`);
  await execAsync(`docker cp ${MONGO_CONTAINER}:/tmp/${DUMP_NAME} ${LOCAL_DUMP_PATH}`);
  await execAsync(`docker exec ${MONGO_CONTAINER} rm /tmp/${DUMP_NAME}`);

  console.log(`${today}`,"✅ Dump created successfully.");
}

async function uploadToDrive() {
  console.log(`${today}`, "☁️ Uploading dump to Google Drive...");

  await execAsync(`rclone copy ${LOCAL_DUMP_PATH} ${GDRIVE_REMOTE}`);
  
  console.log(`${today}`,"✅ Upload complete.");
}

async function runJob() {
  try {
    await dumpMongo();
    await uploadToDrive();
  } catch (err) {
    console.error(`${today}`, "❌ Error:", err.message);
  }
}

async function startLoop() {
  while (true) {
    console.log(`${today}`, "🕒 Starting daily backup job...");
    await runJob();
    console.log(`${today}`, "💤 Waiting 24 hours...");
    await new Promise(res => setTimeout(res, 24 * 60 * 60 * 1000));
  }
}

startLoop();
