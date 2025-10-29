# 🔧 Final Fix - Set Environment Variables Manually

## ❌ Problem

The CLI is adding extra characters (newlines, BOM, etc.) when setting environment variables.

Current status:
- Username should be 5 chars ("admin") but showing as 7-9
- Password should be 8 chars ("admin123") but showing as 10-12

## ✅ Solution - Set via Vercel Dashboard

### Step 1: Go to Environment Variables Page

https://vercel.com/mrashidikhah-3181s-projects/hono-2/settings/environment-variables

### Step 2: Remove Existing Variables

1. Find `SWAGGER_USERNAME` - click the 3 dots → Delete
2. Find `SWAGGER_PASSWORD` - click the 3 dots → Delete

### Step 3: Add New Variables Correctly

**Add SWAGGER_USERNAME:**
1. Click "Add New"
2. **Name**: `SWAGGER_USERNAME`
3. **Value**: `admin` (type it exactly - 5 characters, no spaces, no quotes)
4. **Environment**: Select "Production"
5. Click "Save"

**Add SWAGGER_PASSWORD:**
1. Click "Add New"
2. **Name**: `SWAGGER_PASSWORD`
3. **Value**: `admin123` (type it exactly - 8 characters, no spaces, no quotes)
4. **Environment**: Select "Production"
5. Click "Save"

### Step 4: Redeploy

After setting the variables, redeploy:

```bash
npx vercel --prod --token 5IJ813gfeVQBN6Z3glEzkKkv
```

Or just click "Redeploy" button in Vercel dashboard.

### Step 5: Test

Visit: https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/docs

You should see a browser authentication popup asking for:
- Username: `admin`
- Password: `admin123`

After entering these, you'll see the Swagger UI!

---

## 🔍 Verify Environment Variables

After redeploying, check this URL to verify:
https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/debug-env

Should show:
```json
{
  "hasApiKey": true,
  "hasSwaggerUsername": true,
  "hasSwaggerPassword": true,
  "hasDebugSecret": true,
  "swaggerUsernameLength": 5,  // ← Should be 5!
  "swaggerPasswordLength": 8   // ← Should be 8!
}
```

---

## 📝 Current Credentials

- **API Key**: `my-secret-api-key-123`
- **Swagger Username**: `admin`
- **Swagger Password**: `admin123`  
- **Debug Secret**: `debug-secret-456`

---

## ⚡ Quick Test Commands

After fixing:

```bash
# Test root endpoint (should work)
curl https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/

# Test /docs without auth (should return 401)
curl -I https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/docs

# Test /docs with correct auth (should return HTML)
curl -u admin:admin123 https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/docs

# Test API endpoint with key
curl -H "X-API-Key: my-secret-api-key-123" \
  https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/api/test/error
```

