FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential python3

COPY package*.json ./

RUN npm ci

# Remove manual rollup install
# RUN npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

RUN npm run build
