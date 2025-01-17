FROM node:20.15.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20.15.0

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY google-cloud-key.json ./
COPY --from=build /app/dist ./dist

CMD ["node", "dist/main"]