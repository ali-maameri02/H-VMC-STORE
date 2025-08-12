FROM node:20 as builder
WORKDIR /app

# Copy only package.json to leverage Docker cache
COPY package.json package-lock.json ./

# Remove lock file & node_modules to force fresh install in container
RUN rm -f package-lock.json && rm -rf node_modules

# Fresh install
RUN npm install

# Copy the rest of the app
COPY . .

# Build
RUN npm run build

# Serve stage (optional)
FROM node:20
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
