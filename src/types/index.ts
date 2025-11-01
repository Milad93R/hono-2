// Types for monitoring
export interface RequestMetrics {
  timestamp: string
  method: string
  path: string
  status: number
  duration: number
  userAgent?: string
  ip?: string
  error?: string
}

// Environment bindings type
export type Bindings = {
  DEBUG_SECRET?: string
  API_KEY?: string
  SWAGGER_USERNAME?: string
  SWAGGER_PASSWORD?: string
  TELEGRAM_BOT_TOKEN?: string
  MONGODB_URI?: string
  CUSTOM_DOMAIN?: string
}

// Context variables type
export type Variables = {
  capturedLogs?: Array<{ level: string; message: string; timestamp: string }>
  shouldIncludeLogs?: boolean
}

