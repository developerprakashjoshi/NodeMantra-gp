#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Get the path to the artisan.ts file
const artisanPath = path.join(__dirname, '..', '.node_mantra', 'sdk', 'artisan.ts');

// Get command line arguments (skip the first two: node and script path)
const args = process.argv.slice(2);

// Run the artisan.ts file with ts-node using simpler approach
const child = spawn('npx', ['ts-node', '--transpile-only', artisanPath, ...args], {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('error', (error) => {
  console.error('❌ Error running nodemantra command:', error.message);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code);
}); 