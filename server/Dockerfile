# Etapa de compilación
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "build/index.js"]
