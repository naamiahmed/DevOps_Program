# ==============================================================================
# DevOps Engineering Training Program - Dockerfile
# Multi-Stage Build Pattern for React SPA
# ==============================================================================
# Why Multi-Stage Builds?
# 1. Separation of Concerns: Stage 1 builds the code, Stage 2 serves the code.
# 2. Security: No Node.js runtime, compilers, or source files in production.
# 3. Efficiency: Drastically smaller final image size (~25MB vs ~500MB).
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Environment (Compile React & Tailwind/Vite bundle)
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package descriptors first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies deterministically
RUN npm ci

# Copy application source code
COPY . .

# Run production build (outputs to /app/dist)
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Runtime (Nginx High-Performance Web Server)
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Healthcheck for container orchestrators (Docker / Kubernetes)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
