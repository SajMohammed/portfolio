# Docker Setup for Portfolio Next.js

This document explains how to build and run the portfolio application using Docker.

## Prerequisites

- Docker installed on your system
- Environment variables configured (see Environment Variables section)

## Environment Variables

The application requires the following environment variables for the contact form functionality:

```bash
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Setting up Gmail App Password

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Use this app password as `EMAIL_PASSWORD`

## Building the Docker Image

```bash
# Build the Docker image
docker build -t portfolio-nextjs .

# Or with a specific tag
docker build -t portfolio-nextjs:latest .
```

## Running the Container

### Development Mode
```bash
# Run with environment variables
docker run -p 3000:3000 \
  -e EMAIL_USER=your-email@gmail.com \
  -e EMAIL_PASSWORD=your-app-password \
  portfolio-nextjs
```

### Production Mode with Environment File
```bash
# Create a .env file with your environment variables
echo "EMAIL_USER=your-email@gmail.com" > .env
echo "EMAIL_PASSWORD=your-app-password" >> .env

# Run with environment file
docker run -p 3000:3000 --env-file .env portfolio-nextjs
```

### Using Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
    env_file:
      - .env
```

Then run:
```bash
docker-compose up --build
```

## Docker Features

- **Multi-stage build**: Optimized for production with minimal image size
- **Security**: Runs as non-root user
- **Performance**: Uses Next.js standalone output for faster startup
- **Alpine Linux**: Lightweight base image
- **Production optimized**: Only includes necessary dependencies

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, map to a different port:
```bash
docker run -p 8080:3000 portfolio-nextjs
```

### Environment Variables Not Working
Make sure your environment variables are properly set:
```bash
# Check if variables are set
docker run --env-file .env portfolio-nextjs env | grep EMAIL
```

### Build Issues
If you encounter build issues, try:
```bash
# Clean build without cache
docker build --no-cache -t portfolio-nextjs .
```

## Production Deployment

For production deployment, consider:

1. **Use a reverse proxy** (nginx) in front of the container
2. **Set up SSL/TLS** certificates
3. **Configure proper logging**
4. **Use environment-specific configurations**
5. **Set up health checks**

Example production docker-compose.yml:
```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```


