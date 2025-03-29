FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN mkdir -p static/items

EXPOSE 7777

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]
