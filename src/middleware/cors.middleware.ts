import { Context, Next } from 'hono'

// CORS middleware to allow Swagger UI to fetch from local server
export const corsMiddleware = async (c: Context, next: Next) => {
  const origin = c.req.header('Origin')
  
  // Allow requests from any origin (for local development)
  // In production, you might want to restrict this
  c.header('Access-Control-Allow-Origin', origin || '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Debug-Secret')
  c.header('Access-Control-Allow-Credentials', 'true')
  
  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204)
  }
  
  await next()
}

