#!/bin/sh

# Create log directories if they don't exist
mkdir -p /var/log/nginx
touch /var/log/nginx/access.log /var/log/nginx/error.log
chmod 755 /var/log/nginx
chmod 644 /var/log/nginx/access.log /var/log/nginx/error.log

# Replace environment variables in the JavaScript files
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|PLACEHOLDER_API_KEY|${GEMINI_API_KEY}|g" {} \;

# Ensure favicon.ico exists and has proper permissions
if [ -f /usr/share/nginx/html/favicon.ico ]; then
  chmod 644 /usr/share/nginx/html/favicon.ico
fi

# Start nginx with logs redirected to stdout/stderr for Docker logging
nginx -g "daemon off;" & 

# Tail the logs to stdout so they appear in Docker logs
tail -f /var/log/nginx/access.log /var/log/nginx/error.log