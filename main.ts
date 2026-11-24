// One-line AI excuse for breaking production.
// Writes exactly one original line (no trailing newline) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).
// Guards: 1-180 code points, not whitespace-only, no newline inside.
const fs = require("node:fs");
const path = require("node:path");

const ENTRY =
  "I thought production was staging with better lighting, so I tested the delete button there \u2014 it worked beautifully.";

const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 180) {
  throw new Error("entry must be 1-180 code points, got " + codePoints);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = path.join(outDir, "entry.txt");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, ENTRY, "utf8");

// Round-trip: read back and validate the written file itself.
const roundTrip = fs.readFileSync(outFile, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip check failed");
}
if ([...roundTrip].length < 1 || [...roundTrip].length > 180) {
  throw new Error("written entry out of length range");
}
