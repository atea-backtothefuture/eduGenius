# EduGenius Bot

This contains everything you need to run your app locally or with Docker.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Docker Deployment

**Prerequisites:** Docker and Docker Compose

### Option 1: Using Docker Compose (Recommended)

1. Set your Gemini API key as an environment variable:
   ```
   export GEMINI_API_KEY=your_api_key_here
   ```
   
   On Windows PowerShell:
   ```
   $env:GEMINI_API_KEY="your_api_key_here"
   ```

2. Build and start the container:
   ```
   docker-compose up -d
   ```
   
   Note: When deploying to a production environment like Render, the port configuration is handled by the hosting platform.

3. Access the application at http://edugenius-xpph.onrender.com

### Logging

The application includes comprehensive logging for both Nginx and backend API calls:

- **Nginx Logs**: Access and error logs are available in the Docker container at `/var/log/nginx/`
- **API Call Logs**: Backend service calls to the Gemini API are logged with request details and timing information
- **Custom Log Format**: A custom log format (`api_log`) is used to capture detailed information about API requests including response times
- **Viewing Logs**: You can view logs using Docker commands:
  ```
  docker-compose logs -f edugenius-bot
  ```
- **Log Rotation**: Logs are automatically rotated (max 10MB per file, 3 files max) to prevent disk space issues

### Nginx Configuration

The application uses a custom Nginx configuration:

- **Main Configuration**: Located in `main-nginx.conf`, defines the global settings including the custom log format
- **Server Configuration**: Located in `nginx.conf`, defines the server-specific settings for the application
- **Static Asset Caching**: Static assets (JS, CSS, images) are cached for 30 days
- **SPA Routing**: All routes are directed to `index.html` to support single-page application routing

### Option 2: Using Docker Directly

1. Build the Docker image:
   ```
   docker build -t edugenius-bot .
   ```

2. Run the container:
   ```
   docker run -p 80:80 -e GEMINI_API_KEY=your_api_key_here -d --name edugenius-bot edugenius-bot
   ```

3. View logs:
   ```
   docker logs -f edugenius-bot
   ```
   
   Note: When deploying to a production environment like Render, the port mapping is handled by the hosting platform.

3. Access the application at http://edugenius-xpph.onrender.com
