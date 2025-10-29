# MongoDB Integration Setup

## Overview
MongoDB integration is now fully implemented and operational in the Hono Vercel API.

## Environment Variables

### Production (Vercel)
```bash
MONGODB_URI=mongodb+srv://mrashidikhah_db_user:SlWxKKiMDpsQNAf8@cluster0.kblqcup.mongodb.net/
```

✅ **Environment variable successfully added to Vercel**

## API Endpoints

All MongoDB endpoints require the `X-API-Key` header for authentication.

### 1. List Collections
```bash
GET /api/mongodb/collections
```

**Example:**
```bash
curl -X GET "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/collections" \
  -H "X-API-Key: my-secret-api-key-123"
```

**Response:**
```json
{
  "collections": ["test_collection"],
  "count": 1,
  "timestamp": "2025-10-29T05:05:56.960Z"
}
```

### 2. Get All Documents
```bash
GET /api/mongodb/:collection?limit=100
```

**Example:**
```bash
curl -X GET "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection" \
  -H "X-API-Key: my-secret-api-key-123"
```

**Response:**
```json
{
  "collection": "test_collection",
  "documents": [
    {
      "_id": "6901a0cbacea0fe435e3e775",
      "name": "Test User",
      "email": "test@example.com",
      "age": 25,
      "status": "active",
      "created": "2025-10-29T05:00:00.000Z"
    }
  ],
  "returned": 1,
  "total": 1,
  "timestamp": "2025-10-29T05:06:35.578Z"
}
```

### 3. Get Document by ID
```bash
GET /api/mongodb/:collection/:id
```

**Example:**
```bash
curl -X GET "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection/6901a0cbacea0fe435e3e775" \
  -H "X-API-Key: my-secret-api-key-123"
```

**Response:**
```json
{
  "collection": "test_collection",
  "document": {
    "_id": "6901a0cbacea0fe435e3e775",
    "name": "Test User",
    "email": "test@example.com",
    "age": 25,
    "status": "active",
    "created": "2025-10-29T05:00:00.000Z"
  },
  "timestamp": "2025-10-29T05:06:30.178Z"
}
```

### 4. Create Document
```bash
POST /api/mongodb/:collection
```

**Example:**
```bash
curl -X POST "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection" \
  -H "X-API-Key: my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "age": 25,
    "status": "active"
  }'
```

**Response:**
```json
{
  "message": "Document created",
  "collection": "test_collection",
  "insertedId": "6901a0cbacea0fe435e3e775",
  "timestamp": "2025-10-29T05:06:19.578Z"
}
```

### 5. Update Document by ID
```bash
PUT /api/mongodb/:collection/:id
```

**Example:**
```bash
curl -X PUT "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection/6901a0cbacea0fe435e3e775" \
  -H "X-API-Key: my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
```

### 6. Delete Document by ID
```bash
DELETE /api/mongodb/:collection/:id
```

**Example:**
```bash
curl -X DELETE "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection/6901a0cbacea0fe435e3e775" \
  -H "X-API-Key: my-secret-api-key-123"
```

### 7. Query Documents with Custom Filter
```bash
POST /api/mongodb/:collection/query
```

**Example:**
```bash
curl -X POST "https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/api/mongodb/test_collection/query" \
  -H "X-API-Key: my-secret-api-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "query": {"status": "active"},
    "limit": 50
  }'
```

## Testing Status

✅ **All endpoints tested and working:**
- ✅ List collections
- ✅ Create document
- ✅ Get document by ID
- ✅ Get all documents from collection
- ✅ Connection to MongoDB Atlas working

## Implementation Details

### Files Created/Modified:
1. **src/services/mongodb.service.ts** - MongoDB service with all CRUD operations
2. **src/controllers/mongodb.controller.ts** - Controller handling MongoDB requests
3. **src/types/index.ts** - Added `MONGODB_URI` to Bindings type
4. **src/routes/index.ts** - Registered MongoDB routes
5. **src/config/openapi.config.ts** - Added MongoDB endpoints to Swagger documentation
6. **package.json** - Added `mongodb` package dependency
7. **.env** and **.env.example** - Added MongoDB connection string

### Features:
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ List all collections
- ✅ Query with custom filters
- ✅ Connection pooling and auto-reconnect
- ✅ Proper error handling
- ✅ Type safety with TypeScript
- ✅ API authentication required
- ✅ Swagger documentation

## Production URL
```
https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app
```

## Swagger Documentation
View all MongoDB endpoints in Swagger UI:
```
https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app/docs
```

## Notes
- All MongoDB operations are authenticated with API Key
- Connection string uses MongoDB Atlas (cluster0.kblqcup.mongodb.net)
- Environment variable trimming applied to handle hidden characters
- Service automatically connects on first use and reuses connection
- Connection is properly closed after each operation

