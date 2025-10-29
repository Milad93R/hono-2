# Deployment Guide

## Environment Variables Setup ✅ COMPLETED

Environment variables have been configured:

| Variable | Value | Status |
|----------|-------|--------|
| `API_KEY` | `my-secret-api-key-123` | ✅ Set |
| `SWAGGER_USERNAME` | `admin` | ✅ Set |
| `SWAGGER_PASSWORD` | `admin123` | ✅ Set |
| `DEBUG_SECRET` | `debug-secret-456` | ✅ Set |
| `TELEGRAM_BOT_TOKEN` | `7654235762:AAHz...` | ✅ Set |
| `MONGODB_URI` | `mongodb+srv://...` | ✅ Set |

**Note**: Environment variables are only set for **production**. To add for preview/development:

```bash
# For preview environment
echo "value" | npx vercel env add VARIABLE_NAME preview --token YOUR_TOKEN

# For development environment
echo "value" | npx vercel env add VARIABLE_NAME development --token YOUR_TOKEN
```

### View/Edit Variables:

Go to: https://vercel.com/mrashidikhah-3181s-projects/hono-2/settings/environment-variables

## Testing the Deployment

### 1. Test Root Endpoint
```bash
curl https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/
```

Expected response:
```json
{
  "message": "Hello from Hono on Vercel!",
  "timestamp": "2025-10-29T...",
  "docs": "/docs"
}
```

### 2. Test Swagger UI
Visit: https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/docs
- ✅ **No authentication required** - Publicly accessible

### 3. Test API with Authentication
```bash
curl -H "X-API-Key: my-secret-api-key-123" \
  https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/test/error
```

### 4. Test Debug Mode
```bash
curl -H "X-API-Key: my-secret-api-key-123" \
     -H "X-Debug-Secret: debug-secret-456" \
  https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/test/error
```

### 5. Test Telegram Integration
```bash
curl -X POST "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/telegram/send" \
  -H "X-API-Key: my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from API!"}'
```

### 6. Test MongoDB Integration
```bash
# List collections
curl -X GET "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/collections" \
  -H "X-API-Key: my-secret-api-key-123"

# Get documents from a collection
curl -X GET "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection" \
  -H "X-API-Key: my-secret-api-key-123"
```

## Production URLs

- **Main App**: https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/
- **Swagger Docs**: https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/docs (No auth required)
- **OpenAPI Spec**: https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/openapi.json

### 🔐 Credentials

**Swagger UI:**
- ✅ No authentication required - publicly accessible

**API Key:**
- Header: `X-API-Key`
- Value: `my-secret-api-key-123`

**Debug Secret:**
- Header: `X-Debug-Secret`
- Value: `debug-secret-456`

