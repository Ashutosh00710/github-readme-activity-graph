# syntax=docker/dockerfile:1.7

# ---------- Builder stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDependencies) leveraging Docker layer cache
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build TypeScript to /app/dist
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Runner stage ----------
FROM node:20-alpine AS runner

ENV NODE_ENV=production
ENV PORT=5100

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy the compiled output from the builder stage
COPY --from=builder /app/dist ./dist

# Drop privileges: use the non-root user that ships with the official image
USER node

EXPOSE 5100

CMD ["node", "dist/main.js"]
