import { NODE_ENV, MONGO_URL, MONGO_DB } from './environment'

const orm = {
	development: {
		url: MONGO_URL
	},
	testing: {
		url: MONGO_URL
	},
	staging: {
		host: 'localhost',
		username: '',
		password: '',
		database: MONGO_DB
	},
	production: {
		url: MONGO_URL
	}
}

export default orm[NODE_ENV]
