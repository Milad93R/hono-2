import 'dotenv/config'
import { serve } from '@hono/node-server'
import app from './src/index.js'

const port = 3072
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

