import { Context, Next } from 'hono'
import { Bindings, Variables } from '../types/index.js'

export const monitoring = async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
  const startTime = Date.now()
  
  await next()
  
  const duration = Date.now() - startTime
  
  // Log request metrics
  const logData = {
    timestamp: new Date().toISOString(),
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
    userAgent: c.req.header('user-agent'),
    ip: c.req.header('X-Forwarded-For') || c.req.header('X-Real-IP') || 'Unknown'
  }
  
  console.log(JSON.stringify(logData))
}

