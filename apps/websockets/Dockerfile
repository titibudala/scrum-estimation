# syntax=docker.io/docker/dockerfile:1.18.0-labs

FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/websockets/package.json ./apps/websockets/
COPY packages/shared/package.json ./packages/shared/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/websockets/node_modules ./apps/websockets/node_modules
COPY --exclude=./apps/web . .
RUN npm run build --workspace ./packages/shared/
RUN npm run build --workspace ./apps/websockets/

FROM base AS runner
WORKDIR /app
COPY --from=builder ./app .
RUN rm -rf apps/websockets/src
RUN rm -rf packages/shared/src
EXPOSE 3001
CMD ["node", "./apps/websockets/dist/server.js"]
