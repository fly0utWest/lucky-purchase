FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 7777

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
