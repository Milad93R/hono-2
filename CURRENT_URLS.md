# ✅ Current Working URLs

## 🔗 Latest Production Deployment (with Authentication)

**Swagger UI:**
https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/docs

**Credentials:**
- Username: `admin`
- Password: `admin123`

**Status:** ✅ Authentication is working! You should see a browser popup asking for credentials.

---

## 🚨 OLD URLs (Without Authentication - DON'T USE)

These are older deployments that don't have authentication:

❌ https://hono-2-8dcfd05wx-mrashidikhah-3181s-projects.vercel.app/docs
❌ https://hono-2-393vrk11v-mrashidikhah-3181s-projects.vercel.app/docs
❌ https://hono-2-ldpt8o3o1-mrashidikhah-3181s-projects.vercel.app/docs

**If you're using any of these, that's why you don't see authentication!**

---

## 🧪 Test Authentication

### Test 1: Without Credentials (Should Fail)
```bash
curl -I https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/docs
```
Expected: `401 Unauthorized` with `WWW-Authenticate: Basic realm="Swagger UI"`

### Test 2: With Correct Credentials (Should Work)
```bash
curl -u admin:admin123 -I https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/docs
```
Expected: `200 OK`

### Test 3: In Browser
1. Open: https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/docs
2. You should see a popup asking for username and password
3. Enter: `admin` / `admin123`
4. You'll see the Swagger UI

---

## 📋 All Other Endpoints

**Root:**
https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/

**OpenAPI Spec (No auth):**
https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/openapi.json

**Debug Endpoint (No auth):**
https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/debug-env

---

## 🔍 How to Check Which URL You're Using

If authentication is not working, you're probably on an old URL. The latest one is:

**ds6czuakg** ← Look for this in your URL!

Full URL: `https://hono-2-ds6czuakg-mrashidikhah-3181s-projects.vercel.app/docs`

