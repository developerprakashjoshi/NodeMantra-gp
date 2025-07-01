#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// Get the path to the artisan.ts file
const artisanPath = path.join(__dirname, '..', '.node_mantra', 'sdk', 'artisan.ts');

// Get command line arguments (skip the first two: node and script path)
const args = process.argv.slice(2);

// Create a temporary tsconfig for ts-node
const tsConfig = {
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "target": "ES2020",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true
  },
  "ts-node": {
    "esm": true
  }
};

// Write temporary tsconfig
const tempTsConfigPath = path.join(process.cwd(), '.temp-tsconfig.json');
fs.writeFileSync(tempTsConfigPath, JSON.stringify(tsConfig, null, 2));

// Run the artisan.ts file with ts-node
const child = spawn('npx', ['ts-node', '--project', tempTsConfigPath, artisanPath, ...args], {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('error', (error) => {
  console.error('❌ Error running nodemantra command:', error.message);
  // Clean up temp file
  if (fs.existsSync(tempTsConfigPath)) {
    fs.unlinkSync(tempTsConfigPath);
  }
  process.exit(1);
});

child.on('close', (code) => {
  // Clean up temp file
  if (fs.existsSync(tempTsConfigPath)) {
    fs.unlinkSync(tempTsConfigPath);
  }
  process.exit(code);
}); 