// Initializes the `creative` service on path `/creative`
import createService from './creative.class'
import * as hooks from './creative.hooks'

export default function(app) {
	const paginate = app.get('paginate')

	const options = {
		paginate,
	}

	// Initialize our service with any options it requires
	app.use('/creative', createService(options))

	// Get our initialized service so that we can register hooks
	const service = app.service('creative')

	service.hooks(hooks)
}
