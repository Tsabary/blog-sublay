const fs = require("fs");
const path = require("path");

const filePath = path.join(
  ".open-next",
  "server-functions",
  "default",
  "handler.mjs.meta.json"
);

if (!fs.existsSync(filePath)) {
  console.error("Meta JSON file not found. Did you run the build?");
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const inputs = meta.inputs;

if (!inputs || typeof inputs !== "object") {
  console.error("No inputs found in meta file.");
  process.exit(1);
}

// Group inputs by base package/folder
const grouped = {};

for (const inputPath in inputs) {
  let groupKey;

  if (inputPath.startsWith("node_modules/")) {
    // Get the package name (handle scoped packages too)
    const parts = inputPath.split("/");
    groupKey = parts[1].startsWith("@") ? `${parts[1]}/${parts[2]}` : parts[1];
  } else {
    // Other app files
    groupKey = inputPath.split("/")[0];
  }

  grouped[groupKey] = grouped[groupKey] || 0;

  if (inputs[inputPath].bytes) {
    grouped[groupKey] += inputs[inputPath].bytes;
  }
}

// Sort by total size
const sorted = Object.entries(grouped)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

console.log("\nTop contributors to bundle size:\n");
sorted.forEach(([pkg, size]) => {
  console.log(`${(size / 1024).toFixed(2)} KB\t${pkg}`);
});
