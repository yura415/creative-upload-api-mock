import { join } from 'path'
import favicon from 'serve-favicon'
import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import logger from './logger'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express, {
	json,
	urlencoded,
	static as serveStatic,
	rest,
	notFound,
	errorHandler
} from '@feathersjs/express'

import middleware from './middleware'
import services from './services'
import * as appHooks from './app.hooks'
import channels from './channels'

const app = express(feathers())

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(favicon(join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

// Set up Plugins and providers
app.configure(rest())

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

app.hooks(appHooks)

export default app
