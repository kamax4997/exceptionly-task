import * as dotenv from 'dotenv'
dotenv.config()

// Environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// Author
const AUTHOR: string = process.env.AUTHOR || 'Andrei'

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost'
const PORT: number = +process.env.PORT || 4000

// bcrypt
const SALT: number = +process.env.SALT || 10

// jsonwebtoken
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'basic'

// mongodb
const MONGO_USER: string = process.env.MONGO_USER || 'baymax'
const MONGO_PASS: string = process.env.MONGO_PASS || '1226'
const MONGO_DB: string = process.env.MONGO_DB || 'exceptionly-test'

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.u1cyj.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`

export {
	NODE_ENV,
	AUTHOR,
	DOMAIN,
	PORT,
	SALT,
	ACCESS_TOKEN_SECRET,
	MONGO_URL,
	MONGO_DB
}
