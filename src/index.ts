import { Hono } from 'hono'
import { Bindings, Variables } from './types/index.js'
import { apiKeyAuth } from './middleware/auth.middleware.js'
import { logCapture } from './middleware/debug.middleware.js'
import { monitoring } from './middleware/monitoring.middleware.js'
import { errorHandler } from './handlers/error.handler.js'
import { registerRoutes } from './routes/index.js'

// Initialize Hono app
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Global middleware
app.use('*', logCapture)
app.use('*', monitoring)
app.use('*', apiKeyAuth)

// Register all routes
registerRoutes(app)

// Global error handler
app.onError(errorHandler)

export default app
