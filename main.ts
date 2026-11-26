// The Funniest Sick-Day Excuse — make.fun entry (u-zeroxfive-the-funniest-sick-day-excuse-37423a36).
// Writes one funny sick-day excuse: a single line of 1–200 characters, to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Can't come in today — my bed filed a restraining order this morning, so I'm legally not allowed within ten feet of my desk.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (!/^[^.!?]+[.!?]$/.test(LINE)) {
  throw new Error("entry line must be a single sentence");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry line must not contain a line break");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}

console.log(LINE);
console.log(`(${LINE.length} characters)`);
