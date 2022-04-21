import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ACCESS_TOKEN_SECRET } from '../environment'
import { getMongoRepository } from 'typeorm'
import { UserEntity } from '../modules/users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: ACCESS_TOKEN_SECRET
		})
	}

	async validate(payload: any) {
		try {
			const { sub } = payload

			const user = await getMongoRepository(UserEntity).findOne({
				where: { _id: sub }
			})

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user

			return result
		} catch (err) {
			throw new UnauthorizedException('Email or password is incorrect.')
		}
	}
}
