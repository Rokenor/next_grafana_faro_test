# 1. Base Image: Use an official Node.js image.
# From the README, Node.js 18.17 or later is required
# We'll use a specific LTS version for stability.
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# 2. Dependencies Cache Layer: Install dependencies first to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# 3. Build Layer: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Set build-time arguments for Faro if needed, though runtime is preferred for flexibility
# ARG NEXT_PUBLIC_FARO_URL
# ARG NEXT_PUBLIC_FARO_API_KEY
# ENV NEXT_PUBLIC_FARO_URL=${NEXT_PUBLIC_FARO_URL}
# ENV NEXT_PUBLIC_FARO_API_KEY=${NEXT_PUBLIC_FARO_API_KEY}

# The package.json specifies "next build" as the build script
RUN npm run build

# 4. Runner Layer: Create a smaller image for running the application
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
# These should ideally be passed during 'docker run' or via docker-compose for better security and flexibility
# ENV NODE_ENV=production
# ENV NEXT_PUBLIC_FARO_URL=http://localhost:4318 # Default from faro.ts
# ENV NEXT_PUBLIC_FARO_API_KEY= # Optional from faro.ts

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port the app runs on (default for Next.js is 3000)
# The README also mentions the application will be available at http://localhost:3000
EXPOSE 3000

# The package.json specifies "next start" as the start script
# For standalone output, we directly use node server.js
CMD ["node", "server.js"]