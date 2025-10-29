# Telegram Integration Setup

## ✅ Telegram Feature Implemented!

The Telegram messaging integration has been successfully added to your Hono app.

## 📋 Features

1. **Send Messages** - Send custom messages to Telegram group threads
2. **Send Logs** - Send formatted log messages with levels (INFO, WARN, ERROR)
3. **Multi-thread Support** - Send to multiple threads simultaneously
4. **Thread Management** - Get configured thread IDs

## 🔗 New API Endpoints

### 1. Send Message
**POST** `/api/telegram/send`

Send a message to Telegram threads.

**Request:**
```json
{
  "message": "Hello from Hono API!",
  "threads": [2, 5]  // Optional: additional threads (default thread always included)
}
```

**Response:**
```json
{
  "message": "Message sent",
  "results": [
    { "thread": 2, "success": true },
    { "thread": 5, "success": true }
  ],
  "timestamp": "2025-10-29T..."
}
```

### 2. Send Formatted Log
**POST** `/api/telegram/log`

Send a formatted log message with level indicator.

**Request:**
```json
{
  "level": "INFO",  // Optional: INFO, WARN, ERROR, etc. (default: INFO)
  "message": "User logged in successfully",
  "threads": [2]  // Optional
}
```

**Response:**
```json
{
  "message": "Log sent",
  "level": "INFO",
  "results": [
    { "thread": 2, "success": true }
  ],
  "timestamp": "2025-10-29T..."
}
```

### 3. Get Thread IDs
**GET** `/api/telegram/threads`

Get configured Telegram thread IDs.

**Response:**
```json
{
  "threads": {
    "DEFAULT": 2,
    "OTHER": 5
  },
  "description": {
    "DEFAULT": "Default thread - always included",
    "OTHER": "Additional thread"
  }
}
```

## 🔧 Configuration

### Telegram Settings (Already Configured)

The following are pre-configured in `src/config/telegram.config.ts`:
- **Group ID**: `-1003291431716`
- **Default Thread**: `2`
- **Additional Threads**: `5`

### Environment Variable Required

You need to set the Telegram Bot Token:

**Via Vercel Dashboard:**
1. Go to: https://vercel.com/mrashidikhah-3181s-projects/hono-2/settings/environment-variables
2. Click "Add New"
3. Name: `TELEGRAM_BOT_TOKEN`
4. Value: Your bot token (from @BotFather)
5. Environment: Production
6. Save and redeploy

## 🧪 Testing

### Test 1: Get Thread IDs (No auth needed for testing)
```bash
curl https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app/api/telegram/threads
```

### Test 2: Send Message (Requires API Key)
```bash
curl -X POST https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app/api/telegram/send \
  -H "Content-Type: application/json" \
  -H "X-API-Key: my-secret-api-key-123" \
  -d '{
    "message": "Test message from Hono API!"
  }'
```

### Test 3: Send Log
```bash
curl -X POST https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app/api/telegram/log \
  -H "Content-Type: application/json" \
  -H "X-API-Key: my-secret-api-key-123" \
  -d '{
    "level": "INFO",
    "message": "Application started successfully"
  }'
```

### Test 4: Send to Multiple Threads
```bash
curl -X POST https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app/api/telegram/send \
  -H "Content-Type: application/json" \
  -H "X-API-Key: my-secret-api-key-123" \
  -d '{
    "message": "Broadcasting to multiple threads!",
    "threads": [2, 5]
  }'
```

## 📖 Usage in Code

```typescript
// Send a simple message
const response = await fetch('/api/telegram/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    message: 'Hello from my app!'
  })
});

// Send a formatted log
await fetch('/api/telegram/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    level: 'ERROR',
    message: 'Database connection failed',
    threads: [2, 5]  // Send to multiple threads
  })
});
```

## 🎨 HTML Formatting

Messages support HTML formatting:

```json
{
  "message": "<b>Bold text</b>\n<i>Italic text</i>\n<code>Code block</code>\n<a href='https://example.com'>Link</a>"
}
```

## 📍 Current URLs

**Latest Deployment:**
https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app

**Swagger UI (with all Telegram endpoints):**
https://hono-2-1420t715n-mrashidikhah-3181s-projects.vercel.app/docs
- Username: `admin`
- Password: `admin123`

## 🔐 Authentication

All Telegram endpoints require the `X-API-Key` header with your API key.

**Current API Key**: `my-secret-api-key-123`

## ⚡ Next Steps

1. **Set TELEGRAM_BOT_TOKEN** in Vercel dashboard
2. Test the endpoints using curl or Swagger UI
3. Integrate into your application code

---

**All Telegram features are now live and ready to use!** 🎉

