import { exec, spawn } from "child_process";
import net from 'net';
import { watch } from "fs";
const { platform } = process;

// Check if port is in use
function portInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port, () => {
      server.close();
      resolve(false); // Port is available
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(true); // Port is in use
      } else {
        reject(err);
      }
    });
  });
}

// Function to check if Deno is running
function isDenoRunning() {
  return new Promise((resolve) => {
    const command =
      platform === "win32"
        ? 'tasklist | findstr "deno.exe"'
        : 'pgrep -f "deno"';

    exec(command, (error, stdout) => {
      resolve(!!stdout);
    });
  });
}

// Function to kill Deno process
function killDeno() {
  return new Promise((resolve) => {
    const command =
      platform === "win32" ? "taskkill /F /IM deno.exe" : 'pkill -f "deno"';

    exec(command, () => resolve());
  });
}

// Function to run build command
function buildProject() {
  return new Promise((resolve, reject) => {
    const command = "npm run build";
    exec(command, (error, stdout, stderr) => {
      try {
        console.log("Build completed successfully");
        resolve();
      } catch (error) {
        console.error("Build failed:", error);
        reject(error);
        return;
      }
    });
  });
}

// Function to start Deno server
function startDenoServer() {
  const denoProcess = spawn(
    "deno",
    ["run", "--allow-net", "--allow-read", "server/main.ts"],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  denoProcess.on("error", (error) => {
    console.error("Failed to start Deno server:", error);
  });

  return denoProcess;
}

// Main function to orchestrate the startup
async function main() {
  try {
    // Check if Deno is already running on port 4200
    const checkPort = await portInUse(4200);

    console.log("🔥 Value of Check Port: ", checkPort);

    if (checkPort === true) {
        console.log("✅ Deno process already running...", checkPort);
    } else if (checkPort === false) {
        // Start Deno server
        console.log("✅ Starting Deno server...", checkPort);
        startDenoServer();
    }

    // Build the project
    console.log("🏭 Building project...");
    await buildProject();

  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
}

// Watch for changes if --watch flag is provided
if (process.argv.includes("--watch")) {
  // Watch both source and server directories
  const watchPaths = ["./src", "./server/main.ts"];

  watchPaths.forEach((path) => {
    watch(path, { recursive: true }, async (eventType, filename) => {
      console.log(`🕵🏻‍♂️ Changes detected in ${filename}`);
      await main();
    });
  });

  console.log("⏱️ Watching for changes...");
}

// Initial startup
main();
