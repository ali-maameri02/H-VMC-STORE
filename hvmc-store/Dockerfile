FROM node:20-alpine

WORKDIR /app

# Install build tools for native deps
RUN apk add --no-cache python3 make g++ bash

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Force clean install to match Alpine's musl env
RUN npm install --no-optional && npm rebuild && npm cache clean --force

# Now copy the rest of the app
COPY . .

# Build
RUN npm run build
