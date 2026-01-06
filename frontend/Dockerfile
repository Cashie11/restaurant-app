# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install ajv for build compatibility
RUN npm install ajv@^8.12.0 --legacy-peer-deps

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
# Install serve to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
