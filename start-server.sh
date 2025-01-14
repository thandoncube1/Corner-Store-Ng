#!/bin/bash
# Build Angular app
npm run build
# Start Deno server
deno run --allow-net --allow-read server/main.ts