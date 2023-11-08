require('dotenv').config();
require('./DB_Connection/mongo')

const Sentry = require('@sentry/node')
const ProfilingIntegration = require('@sentry/profiling-node')
const express = require('express')
const app = express()
const cors = require('cors')

const notFound = require('./DB_Connection/middlewares/notFound');
const handleErrors = require('./DB_Connection/middlewares/handleErrors');

const usersRouter = require('./controllers/users');
const avatarsRouter = require('./controllers/avatars');
const loginRouter = require('./controllers/login')

const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())


Sentry.init({
  dsn: 'https://96044a6b17966243ae74d93d3fd7fd3d@o4506133079195648.ingest.sentry.io/4506133089550336',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

/*
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain '})
  response.end(avatars)
})
*/

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.use('/api/avatars', avatarsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})