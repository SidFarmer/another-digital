#!/usr/bin/env node
/**
 * Simple i18n check: ensure all locales share the same keys.
 * Reads packages/i18n/src/messages.json and compares keys against en-US.
 */
const fs = require("fs");
const path = require("path");

const messagesPath = path.join(__dirname, "..", "packages", "i18n", "src", "messages.json");
const raw = fs.readFileSync(messagesPath, "utf8");
const catalogs = JSON.parse(raw);

const base = catalogs["en-US"];
if (!base) {
  console.error("Missing base locale en-US");
  process.exit(1);
}
const baseKeys = new Set(Object.keys(base));
let hasMismatch = false;

for (const [locale, messages] of Object.entries(catalogs)) {
  const keys = new Set(Object.keys(messages));
  const missing = [...baseKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !baseKeys.has(k));
  if (missing.length || extra.length) {
    hasMismatch = true;
    if (missing.length) {
      console.error(`[i18n] ${locale} missing keys: ${missing.join(", ")}`);
    }
    if (extra.length) {
      console.error(`[i18n] ${locale} has extra keys: ${extra.join(", ")}`);
    }
  }
}

if (hasMismatch) {
  process.exit(1);
} else {
  console.log("[i18n] Locale keys are consistent across catalogs.");
}
