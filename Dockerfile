# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your TypeScript code (if using TypeScript)
RUN npm run build

# Expose the port your app runs on (from your .env or default)
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
