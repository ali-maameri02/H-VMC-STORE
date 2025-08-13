# Remove the nginx stage since you're using a separate nginx container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL=/fr/api  # Set default value
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# No need for the nginx stage since you have a dedicated nginx service