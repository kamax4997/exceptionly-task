import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { uuidv4 } from '../../utils'
import { ApiProperty } from '@nestjs/swagger'

@Entity({
	name: 'users',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class UserEntity {
	@ApiProperty({ description: 'The _id of the User' })
	@ObjectIdColumn()
	_id: string

	// basic
	@ApiProperty({ description: 'The first name of the User' })
	@Column()
	firstName: string

	@ApiProperty({ description: 'The last name of the User' })
	@Column()
	lastName: string

	@ApiProperty({ description: 'The email of the User' })
	@Column()
	email: string

	@ApiProperty({ description: 'The password of the User' })
	// @Exclude()
	@Column()
	password: string

	constructor(partial: Partial<UserEntity>) {
		if (partial) {
			Object.assign(this, partial)
			this._id = this._id || uuidv4()
		}
	}
}
