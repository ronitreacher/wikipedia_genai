# Build stage
FROM node:18 AS build

WORKDIR /app

# Accept REACT_APP_API_URL build argument
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_CLIENT_ID

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Inject the build arg into the React build environment for static substitution
RUN REACT_APP_API_URL=$REACT_APP_API_URL REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID npm run build

# Production stage: serve with nginx
FROM nginx:stable-alpine

# Copy built React files to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
