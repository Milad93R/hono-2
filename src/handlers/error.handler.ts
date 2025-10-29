import { Context } from 'hono'
import { Bindings, Variables } from '../types/index.js'

export const errorHandler = (err: Error, c: Context<{ Bindings: Bindings; Variables: Variables }>) => {
  console.error('Error:', err)
  
  const debugSecret = process.env.DEBUG_SECRET
  const providedSecret = c.req.header('X-Debug-Secret')
  const shouldIncludeDetails = debugSecret && providedSecret === debugSecret
  
  const errorResponse: any = {
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString(),
    path: c.req.path
  }
  
  // Include debug information if debug secret is provided
  if (shouldIncludeDetails) {
    errorResponse.stack = err.stack
    errorResponse.capturedLogs = c.get('capturedLogs') || []
  }
  
  return c.json(errorResponse, 500)
}

