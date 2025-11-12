# Use lightweight Node.js base image
ARG NODE_VERSION=22.14.0-alpine
FROM node:${NODE_VERSION} AS base

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first (for better cache)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of your project
COPY . .

# Build the Next.js app for production
RUN pnpm build

# Create cache directory with proper permissions (for Next.js images)
RUN mkdir -p .next/cache/images && \
    chown -R node:node .next

# Use non-root user for security
USER node

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in production
CMD ["pnpm", "start"]
