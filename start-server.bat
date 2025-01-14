@echo off
:: Build Angular app
call npm run build
:: Start Deno server
deno run --allow-net --allow-read server/main.ts