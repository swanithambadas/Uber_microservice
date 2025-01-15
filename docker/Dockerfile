# Base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy shared dependencies
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the entire backend code (shared and service-specific)
COPY . .

# Expose a port (will be overridden by the service-specific configuration)
EXPOSE 3000

# Command to start (will be overridden in docker-compose.yml)
CMD ["node", "user-service/userServer.js"]
