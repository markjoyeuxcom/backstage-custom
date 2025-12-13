# =============================================================================
# BACKSTAGE CUSTOM IMAGE - MULTI-STAGE BUILD
# =============================================================================
# Stage 1: Build the application
# Stage 2: Create production image
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1: BUILD
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS build

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    g++ \
    make \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./
COPY packages/app/package.json packages/app/
COPY packages/backend/package.json packages/backend/

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy source files
COPY . .

# Build the application
RUN yarn tsc
RUN yarn build:backend --config app-config.yaml --config app-config.production.yaml

# -----------------------------------------------------------------------------
# STAGE 2: PRODUCTION IMAGE
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim

# Install runtime dependencies (python3 needed for some npm packages)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user (use UID 10000 to avoid conflicts)
RUN useradd -m -u 10000 backstage

# Set working directory
WORKDIR /app

# Copy built artifacts from build stage
COPY --from=build --chown=backstage:backstage /app/packages/backend/dist ./packages/backend/dist
COPY --from=build --chown=backstage:backstage /app/node_modules ./node_modules
COPY --from=build --chown=backstage:backstage /app/package.json ./
COPY --from=build --chown=backstage:backstage /app/packages/backend/package.json ./packages/backend/

# Copy app-config files
COPY --chown=backstage:backstage app-config*.yaml ./

# Set user
USER backstage

# Expose port
EXPOSE 7007

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:7007/healthcheck', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })"

# Start the backend
CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
