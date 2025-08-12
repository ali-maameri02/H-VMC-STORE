# Use Debian-based Node to avoid Alpine musl optional deps issue
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Clean install without using existing node_modules
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build
