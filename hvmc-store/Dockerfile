# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install dependencies (legacy peer deps if needed)
RUN npm install

# Copy the rest of the application
COPY . .

# Define and use build-time environment variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine AS production

# Copy built files from builder
COPY --from=builder /app/dist /app/dist 