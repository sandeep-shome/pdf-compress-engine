# --- Stage 1: Builder ---
FROM node:22-alpine AS builder

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

RUN pnpm prune --prod

FROM node:20-alpine AS runner

RUN apk add --no-cache ghostscript

WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/src/public ./dist/public

USER node

EXPOSE 4000

CMD ["node", "dist/main.js"]