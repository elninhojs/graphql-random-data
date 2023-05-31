ARG PORT=8090

FROM node:16-alpine AS node

# Dev stage
FROM node AS dev

# Use /app as the CWD
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install all dependencies
RUN npm ci --omit=dev

# Copy the rest of the code
COPY . .

# Open desired port
EXPOSE ${PORT}

# Run development server
ENTRYPOINT [ "npm", "run", "start:dev" ]

# Production version
FROM node AS production

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Copy package.json, package-lock.json
COPY package*.json ./

# Switch to user node
USER node

# Install libraries as user node
RUN npm ci --omit=dev

# Copy the rest of the code
COPY . .

# Open desired port
EXPOSE ${PORT}

# Running produciton
ENTRYPOINT ["npm", "run", "start:prod"]
