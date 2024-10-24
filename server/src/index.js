require('dotenv').config()

const Sentry = require('@sentry/node')
const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./DB_Connection/middlewares/notFound')

const usersRouter = require('./controllers/users')
const avatarsRouter = require('./controllers/avatars')
const attributesRouter = require('./controllers/attributes')
const loginRouter = require('./controllers/login')
const questionsRouter = require('./controllers/questions')
const { connectToDB } = require('./DB_Connection/mongo')

const PUBLIC_IMAGES = 'src/public'

app.use(cors())
app.use(express.json())

app.use(express.static('../client/dist'))
app.use(express.static(PUBLIC_IMAGES))

Sentry.init({
  dsn: 'https://96044a6b17966243ae74d93d3fd7fd3d@o4506133079195648.ingest.sentry.io/4506133089550336',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app })
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0
})

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.get('/static-path', (req, res) => {
  res.send('Ruta de archivos estáticos: ' + PUBLIC_IMAGES)
})

app.use('/api/questions', questionsRouter)
app.use('/api/avatars', avatarsRouter)
app.use('/api/attr', attributesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  connectToDB()
})
