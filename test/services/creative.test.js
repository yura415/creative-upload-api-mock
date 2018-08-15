import { ok } from 'assert'
import app from '../../src/app'

describe('\'creative\' service', () => {
	it('registered the service', () => {
		const service = app.service('creative')

		ok(service, 'Registered the service')
	})
})
