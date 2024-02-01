# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents to /app
COPY package*.json .

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the backend will run
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "run", "dev"]