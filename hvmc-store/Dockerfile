# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine AS production

# Copy built frontend files to nginx default html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy your nginx config if you want custom config baked in
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
