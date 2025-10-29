import { Hono } from 'hono'
import { Bindings, Variables } from '../types/index.js'
import { DocsController } from '../controllers/docs.controller.js'
import { TestController } from '../controllers/test.controller.js'
import { TelegramController } from '../controllers/telegram.controller.js'
import { MongoDBController } from '../controllers/mongodb.controller.js'
import { withDebugLogs } from '../middleware/debug.middleware.js'
import { swaggerAuth } from '../middleware/auth.middleware.js'

export function registerRoutes(app: Hono<{ Bindings: Bindings; Variables: Variables }>) {
  // Initialize controllers
  const docsController = new DocsController()
  const testController = new TestController()
  const telegramController = new TelegramController()
  const mongodbController = new MongoDBController()

  // Root endpoint
  app.get('/', (c) => {
    return c.json({ 
      message: 'Hello from Hono on Vercel!',
      timestamp: new Date().toISOString(),
      docs: '/docs'
    })
  })

  // Debug endpoint to check env vars
  app.get('/debug-env', (c) => {
    const username = process.env.SWAGGER_USERNAME || ''
    const password = process.env.SWAGGER_PASSWORD || ''
    
    return c.json({
      hasApiKey: !!process.env.API_KEY,
      hasSwaggerUsername: !!process.env.SWAGGER_USERNAME,
      hasSwaggerPassword: !!process.env.SWAGGER_PASSWORD,
      hasDebugSecret: !!process.env.DEBUG_SECRET,
      swaggerUsernameLength: username.length,
      swaggerPasswordLength: password.length,
      // Character codes to see hidden characters
      usernameChars: Array.from(username).map((c, i) => `${i}:${c}[${c.charCodeAt(0)}]`),
      passwordChars: Array.from(password).map((c, i) => `${i}:${c}[${c.charCodeAt(0)}]`),
      // Test comparison
      testUsername: 'admin' === username,
      testPassword: 'admin123' === password,
      testUsernameTrim: 'admin' === username.trim(),
      testPasswordTrim: 'admin123' === password.trim()
    })
  })

  // Test endpoints
  app.get('/api/test/error', withDebugLogs, (c) => testController.triggerError(c))

  // Telegram endpoints
  app.post('/api/telegram/send', (c) => telegramController.sendMessage(c))
  app.post('/api/telegram/log', (c) => telegramController.sendLog(c))
  app.get('/api/telegram/threads', (c) => telegramController.getThreads(c))

  // MongoDB endpoints
  app.get('/api/mongodb/collections', (c) => mongodbController.listCollections(c))
  app.get('/api/mongodb/:collection', (c) => mongodbController.getDocuments(c))
  app.get('/api/mongodb/:collection/:id', (c) => mongodbController.getDocumentById(c))
  app.post('/api/mongodb/:collection', (c) => mongodbController.createDocument(c))
  app.put('/api/mongodb/:collection/:id', (c) => mongodbController.updateDocument(c))
  app.delete('/api/mongodb/:collection/:id', (c) => mongodbController.deleteDocument(c))
  app.post('/api/mongodb/:collection/query', (c) => mongodbController.queryDocuments(c))

  // Documentation endpoints
  app.get('/openapi.json', (c) => docsController.getOpenAPISpec(c))
  app.get('/docs', swaggerAuth, (c) => docsController.getSwaggerUI(c))

  // 404 handler
  app.notFound((c) => {
    return c.json({ 
      error: 'Not Found',
      path: c.req.path 
    }, 404)
  })
}

