# Build stage
FROM node:18 AS build

WORKDIR /app

# Accept build arguments for React environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_CLIENT_ID

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --silent && npm cache clean --force

# Copy all source files
COPY . .

# Set env variables for build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID

# Build React app
RUN npm run build

# Production stage: serve with nginx
FROM nginx:stable-alpine

# Copy built React app static files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose http port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
