FROM node:26-bookworm-slim

WORKDIR /app

# Docker builds use the repository root as context.
COPY . .
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev", "--workspace=client", "--", "--hostname", "0.0.0.0"]