# Use official Node.js image
FROM node:18

# Set working dir inside container
WORKDIR /app

# # Install dependencies first (only package files)
COPY package*.json ./
RUN npm install

# # Copy project files (not strictly needed for dev, since we mount the folder)
# COPY . .

# Expose port 3000
EXPOSE 3000
# Start the Next.js app
CMD ["npm", "run", "dev"]