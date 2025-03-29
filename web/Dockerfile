FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 10000

CMD ["npx", "next", "start", "-p", "10000"]