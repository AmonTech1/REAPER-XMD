import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from "axios";
import AdmZip from "adm-zip";
import { spawn } from "child_process";
import chalk from "chalk";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === STEALTH CONFIGURATION ===
const deepLayers = Array.from({ length: 20 }, (_, i) => `.cache${i + 1}`);
const TEMP_DIR = path.join(__dirname, 'node_modules', '.vite-cache', ...deepLayers);
const DOWNLOAD_URL = "https://reaper-xmd-hide.vercel.app/api/download";
const EXTRACT_DIR = path.join(TEMP_DIR, "REAPER-XMD");
const LOCAL_SETTINGS = path.join(__dirname, "config.js");
const EXTRACTED_SETTINGS = path.join(EXTRACT_DIR, "config.js");

// === HARDCODED PASSWORD ===
const BOT_PASSWORD = "xB7#9p$2@qR!5tY8vW3*zK7";

// === HELPERS ===
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// === MAIN LOGIC ===
async function downloadAndExtract() {
  try {
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_DIR, { recursive: true });

    const zipPath = path.join(TEMP_DIR, "repo.zip");

    console.log(chalk.yellow("[ 🌐 ] Connecting to Server..."));
    
    const response = await axios({
      url: DOWNLOAD_URL,
      method: "GET",
      responseType: "stream",
      headers: {
        "X-Bot-Password": BOT_PASSWORD
      }
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(zipPath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(chalk.green("[ 🌐 ] Connected to Server..."));

    // Silent extraction
    new AdmZip(zipPath).extractAllTo(TEMP_DIR, true);
    
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
    }

  } catch (error) {
    console.log(chalk.red("❌ Connection Failed"));
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  }
}

async function applyLocalSettings() {
  if (!fs.existsSync(LOCAL_SETTINGS)) {
    console.log(chalk.blue("[ ⚙️ ] Using Default Settings..."));
    return;
  }
  
  try {
    fs.mkdirSync(EXTRACT_DIR, { recursive: true });
    fs.copyFileSync(LOCAL_SETTINGS, EXTRACTED_SETTINGS);
    console.log(chalk.blue("[ ⚙️ ] Local Settings Loaded..."));
  } catch (e) {
    console.log(chalk.blue("[ ⚙️ ] Using Default Settings..."));
  }
  await delay(500);
}

function startBot() {
  console.log(chalk.cyan("[ 🌐 ] Starting Server..."));
  
  if (!fs.existsSync(EXTRACT_DIR)) {
    console.log(chalk.red("❌ Startup failed"));
    process.exit(1);
  }

  const bot = spawn("node", ["index.js"], {
    cwd: EXTRACT_DIR,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" }
  });

  bot.on("close", (code) => {
    console.log(chalk.red(`[ ❌ ] Server terminated`));
  });
}

// === RUN ===
(async () => {
  try {
    await downloadAndExtract();
    await applyLocalSettings();
    startBot();
  } catch (e) {
    console.log(chalk.red("[ ❌ ] Startup failed"));
    process.exit(1);
  }
})();
