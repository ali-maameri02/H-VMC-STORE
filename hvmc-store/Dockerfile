FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# We won't serve in this container — just produce files for nginx
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
