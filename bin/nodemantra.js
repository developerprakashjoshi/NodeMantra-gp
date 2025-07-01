#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Get command line arguments (skip the first two: node and script path)
const args = process.argv.slice(2);

// Run the artisan command using npm script
const child = spawn('npm', ['run', 'artisan', ...args], {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('error', (error) => {
  console.error('❌ Error running nodemantra command:', error.message);
  console.error('💡 Make sure you are in a NodeMantra project directory');
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code);
}); 