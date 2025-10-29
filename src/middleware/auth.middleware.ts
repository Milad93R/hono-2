import { Context, Next } from 'hono'
import { Bindings } from '../types/index.js'

// API Key authentication middleware
export const apiKeyAuth = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const path = c.req.path
  
  // Skip auth for docs and openapi spec
  if (path === '/docs' || path === '/openapi.json' || path === '/' || path === '/debug-env') {
    return next()
  }
  
  // ✅ FIX: Trim to remove \r\n characters
  const apiKey = process.env.API_KEY?.trim()
  const providedKey = c.req.header('X-API-Key')
  
  if (!apiKey || providedKey !== apiKey) {
    return c.json({
      error: 'Unauthorized',
      message: 'Invalid or missing API key',
      timestamp: new Date().toISOString()
    }, 401)
  }
  
  await next()
}

// Swagger basic authentication middleware
export const swaggerAuth = async (c: Context<{ Bindings: Bindings }>, next: Next) => {
  const auth = c.req.header('Authorization')
  
  console.log('=== SWAGGER AUTH DEBUG ===')
  console.log('Auth header present:', !!auth)
  console.log('Auth header value:', auth)
  
  if (!auth || !auth.startsWith('Basic ')) {
    console.log('❌ No auth header or not Basic auth')
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Swagger UI"'
      }
    })
  }
  
  const credentials = atob(auth.slice(6))
  const [username, password] = credentials.split(':')
  
  // ✅ FIX: Trim to remove \r\n characters added by CLI
  const validUsername = process.env.SWAGGER_USERNAME?.trim()
  const validPassword = process.env.SWAGGER_PASSWORD?.trim()
  
  console.log('📝 Provided username:', `"${username}"`, 'length:', username?.length)
  console.log('📝 Provided password:', `"${password}"`, 'length:', password?.length)
  console.log('🔑 Valid username:', `"${validUsername}"`, 'length:', validUsername?.length)
  console.log('🔑 Valid password:', `"${validPassword}"`, 'length:', validPassword?.length)
  console.log('✅ Username match:', username === validUsername)
  console.log('✅ Password match:', password === validPassword)
  
  // Show character codes for debugging encoding issues
  if (validUsername) {
    console.log('Username char codes:', Array.from(validUsername).map((c, i) => `${i}:${c}(${c.charCodeAt(0)})`).join(' '))
  }
  if (validPassword) {
    console.log('Password char codes:', Array.from(validPassword).map((c, i) => `${i}:${c}(${c.charCodeAt(0)})`).join(' '))
  }
  
  if (!validUsername || !validPassword || username !== validUsername || password !== validPassword) {
    console.log('❌ Authentication failed!')
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Swagger UI"'
      }
    })
  }
  
  console.log('✅ Authentication successful!')
  await next()
}

