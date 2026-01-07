# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# 1. Catch the argument from Docker Compose
ARG REACT_APP_API_URL

# 2. Set it as an environment variable for the build process
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm install ajv@^8.12.0 --legacy-peer-deps

# Copy application source
COPY . .

# Build the application (Now it can see the variable!)
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
