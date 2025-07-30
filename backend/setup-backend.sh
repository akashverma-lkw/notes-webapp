#!/bin/bash

echo "🔄 Removing node_modules, package-lock.json, and dist..."
rm -rf node_modules package-lock.json dist

echo "📦 Reinstalling all required packages..."
npm install express mongoose dotenv cors passport passport-google-oauth20 jsonwebtoken nodemailer express-session google-auth-library

echo "💻 Installing TypeScript and type definitions..."
npm install -D typescript ts-node @types/node @types/express @types/mongoose @types/jsonwebtoken @types/nodemailer @types/passport @types/passport-google-oauth20 @types/cors @types/express-session

echo "🧹 Cleaning dist folder (if any)..."
rm -rf dist

echo "🛠️ Building project with TypeScript..."
npx tsc

echo "✅ Setup complete! Run the project with:"
echo "npm start"
