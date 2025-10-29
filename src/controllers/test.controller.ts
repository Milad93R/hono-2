import { Context } from 'hono'
import { Bindings, Variables } from '../types/index.js'

export class TestController {
  /**
   * GET /api/test/error
   * Triggers a test error for debugging and monitoring
   */
  async triggerError(c: Context<{ Bindings: Bindings; Variables: Variables }>) {
    console.log('Test error endpoint called')
    console.warn('This is a warning message')
    console.error('This is an error message')
    
    throw new Error('This is a test error for debugging purposes')
  }
}

