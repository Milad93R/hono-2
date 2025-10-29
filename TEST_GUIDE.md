# Quick Test Guide

## ✅ Test Swagger UI Authentication

**URL**: https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/docs

When you visit this URL, you should see a browser authentication popup.

**Credentials:**
- Username: `admin`
- Password: `admin123`

After entering these credentials, you should see the Swagger UI interface with the API documentation.

---

## 🔍 Troubleshooting

If authentication still doesn't work, it could be because:

1. **Environment variables not loaded**: Vercel needs to reload after setting env vars
2. **Cache issue**: Try in incognito/private mode
3. **Wrong deployment**: Make sure you're accessing the latest deployment URL

### Check Environment Variables

Visit Vercel dashboard to verify:
https://vercel.com/mrashidikhah-3181s-projects/hono-2/settings/environment-variables

You should see:
- ✅ SWAGGER_USERNAME = admin
- ✅ SWAGGER_PASSWORD = admin123
- ✅ API_KEY = my-secret-api-key-123
- ✅ DEBUG_SECRET = debug-secret-456

### Test with cURL

Test if environment variables are working:

```bash
# This should return 401 without auth
curl -i https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/docs

# This should work with proper auth
curl -u admin:admin123 https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/docs
```

Expected: HTML page with Swagger UI

---

## 📝 Additional Tests

### Test Root Endpoint (No Auth Required)
```bash
curl https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/
```

Expected:
```json
{
  "message": "Hello from Hono on Vercel!",
  "timestamp": "...",
  "docs": "/docs"
}
```

### Test API Endpoint (API Key Required)
```bash
curl -H "X-API-Key: my-secret-api-key-123" \
  https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/api/test/error
```

Expected: Error response (because it's designed to throw an error)

### Test Debug Mode
```bash
curl -H "X-API-Key: my-secret-api-key-123" \
     -H "X-Debug-Secret: debug-secret-456" \
  https://hono-2-nu2oo0moz-mrashidikhah-3181s-projects.vercel.app/api/test/error
```

Expected: Error response with captured logs and stack trace

---

## 🆘 Still Not Working?

If Swagger authentication still fails, let me know and I can:

1. Check the Vercel deployment logs
2. Verify the environment variables are properly set
3. Test alternative authentication methods
4. Debug the middleware chain

