import multer from 'multer'

export default function initMiddleware() {
	const storage = multer.memoryStorage()
	const fileUpload = multer({ storage: storage }).single('file')

	return function middleware(req, res, next) {
		fileUpload(req, res, err => {
			req.feathers.file = req.file
			next(err)
		})
	}
}
