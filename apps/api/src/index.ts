import { sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { createDb } from './db'

type Bindings = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()
export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use(logger(customLogger))
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/health', (c) => c.json({ status: 'ok' }))

app.get('/health/db', async (c) => {
  const databaseUrl = c.env.DATABASE_URL
  if (!databaseUrl) {
    return c.json({ status: 'error', database: 'not configured' }, 503)
  }

  try {
    await createDb(databaseUrl).execute(sql`select 1`)
    return c.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    customLogger('Database health check failed', String(error))
    return c.json({ status: 'error', database: 'disconnected' }, 503)
  }
})

export default app