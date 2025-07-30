#!/bin/sh

# Replace environment variables in the JavaScript files
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|PLACEHOLDER_API_KEY|${GEMINI_API_KEY}|g" {} \;

# Start nginx
nginx -g "daemon off;"