FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy CSS file
COPY index.css /usr/share/nginx/html/index.css

# Copy favicon
COPY public/favicon.ico /usr/share/nginx/html/favicon.ico

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Create log directory
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log /var/log/nginx/error.log && \
    chmod 755 /var/log/nginx && \
    chmod 644 /var/log/nginx/access.log /var/log/nginx/error.log
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]