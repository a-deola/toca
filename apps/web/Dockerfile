FROM node:26-bookworm-slim AS base

WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json
RUN npm ci

FROM base AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=client

FROM node:26-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app /app
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=client", "--", "--hostname", "0.0.0.0"]