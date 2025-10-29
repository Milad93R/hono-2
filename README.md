# Hono Vercel API

A production-ready API built with Hono on Vercel featuring:

- 🔐 API Key Authentication
- 📚 Swagger UI Documentation
- 🐛 Debug Logging with Secret Header
- 📊 Request Monitoring
- ⚡ Error Handling

## Features

### 1. Swagger UI Documentation
- **URL**: `/docs`
- ✅ **Publicly accessible** (no authentication required)
- Interactive API documentation
- OpenAPI 3.0 specification

### 2. API Key Authentication
- All API endpoints require `X-API-Key` header
- Exceptions: `/`, `/docs`, `/openapi.json`

### 3. Debug Logging
- Add `X-Debug-Secret` header with your debug secret to any request
- Returns captured console logs in response
- Includes detailed error stack traces

### 4. Monitoring
- Automatic request/response logging
- Duration tracking
- User agent and path information

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your values:
```env
API_KEY=your-api-key-here
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=your-swagger-password
DEBUG_SECRET=your-debug-secret
```

4. Run locally:
```bash
npm run dev
```

5. Deploy to Vercel:
```bash
npm run deploy
```

## Environment Variables

Configure these in Vercel dashboard (Settings → Environment Variables):

- `API_KEY` - API key for endpoint authentication
- `DEBUG_SECRET` - Secret for enabling debug logs

## API Endpoints

### General
- `GET /` - Root endpoint with API info
- `GET /docs` - Swagger UI (Basic Auth required)
- `GET /openapi.json` - OpenAPI specification

### Testing
- `GET /api/test/error` - Test error endpoint (requires API key)

## Usage Examples

### Standard API Call
```bash
curl -H "X-API-Key: your-api-key" \
  https://your-app.vercel.app/api/test/error
```

### Debug Mode (with detailed logs)
```bash
curl -H "X-API-Key: your-api-key" \
     -H "X-Debug-Secret: your-debug-secret" \
  https://your-app.vercel.app/api/test/error
```

### Access Swagger UI
Visit `/docs` in your browser and enter your Swagger username/password.

## Project Structure

```
src/
├── index.ts              # Main application entry
├── types/
│   └── index.ts         # TypeScript type definitions
├── config/
│   └── openapi.config.ts # OpenAPI/Swagger configuration
├── middleware/
│   ├── auth.middleware.ts      # API key & Swagger auth
│   ├── debug.middleware.ts     # Debug log capture
│   └── monitoring.middleware.ts # Request monitoring
├── handlers/
│   └── error.handler.ts  # Global error handler
├── controllers/
│   ├── docs.controller.ts  # Swagger/OpenAPI endpoints
│   └── test.controller.ts  # Test endpoints
└── routes/
    └── index.ts         # Route registration
```

## License

ISC
