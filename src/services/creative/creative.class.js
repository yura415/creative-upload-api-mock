import { Service } from 'feathers-memory'
import { BadRequest } from '@feathersjs/errors'

class CreativeService extends Service {
	async update(id, data, params) {
		if (!params.file) {
			throw new BadRequest('params.file is not defined')
		}

		data.width = parseInt(data.width)
		data.height = parseInt(data.height)

		if (isNaN(data.width)) {
			throw new BadRequest('data.width is not a number')
		}
		if (isNaN(data.height)) {
			throw new BadRequest('data.height is not a number')
		}

		return Object.assign({ file: params.file.originalname }, data)
	}
}

export default options => new CreativeService(options)
