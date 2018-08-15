import fileUploadMiddleware from './file-upload'

// eslint-disable-next-line no-unused-vars
export default function(app) {
	// Add your custom middleware here. Remember that
	// in Express, the order matters.

	app.use('/creative', fileUploadMiddleware())
}
