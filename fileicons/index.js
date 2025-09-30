const fs = require("fs");
const path = require("path");
const base = require("./dist/material-icons.json");
const override = require("./dist/custom.json");

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== "object") {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const merged = deepMerge({ ...base }, override);

const distPath = path.resolve(__dirname, "./dist/star_constellation.json");
fs.writeFileSync(distPath, JSON.stringify(merged, null, 2), "utf8");

console.log("✅ 构建完成:", distPath);
