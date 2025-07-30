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

### Option 2: Using Docker Directly

1. Build the Docker image:
   ```
   docker build -t edugenius-bot .
   ```

2. Run the container:
   ```
   docker run -p 80:80 -e GEMINI_API_KEY=your_api_key_here -d edugenius-bot
   ```
   
   Note: When deploying to a production environment like Render, the port mapping is handled by the hosting platform.

3. Access the application at http://edugenius-xpph.onrender.com
