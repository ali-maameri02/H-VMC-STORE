FROM node:20

WORKDIR /app

COPY package*.json ./

# Clean install
RUN npm ci

# Explicitly install the correct rollup binary for Debian/amd64
RUN npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

# Build
RUN npm run build
