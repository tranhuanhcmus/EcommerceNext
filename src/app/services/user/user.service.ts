import IUserRepository from "@/app/repositories/user/interface.user.repository"
import IUserService from "./interface.user.service"
import { CreateUserInput, UpdateUserInput, UserResponse } from "@/types/user"

class UserService implements IUserService {
	constructor(private userRepository: IUserRepository) { }

	create(user: CreateUserInput): Promise<UserResponse> {
		return this.userRepository.create(user)
	}

	getById(userId: string): Promise<UserResponse> {
		return this.userRepository.getById(userId)
	}

	update(userId: string, user: UpdateUserInput): Promise<UserResponse> {
		return this.userRepository.update(userId, user)
	}

	delete(userId: string): Promise<UserResponse> {
		return this.userRepository.delete(userId)
	}

	getAll({ filter, sort, skip, take }: { filter?: any, sort?: any, skip?: number, take?: number }): Promise<UserResponse[]> {
		return this.userRepository.getAll({ filter, sort, skip, take })
	}

	upsert(userId: string, user: UpdateUserInput | CreateUserInput): Promise<UserResponse> {
		return new Promise(async (resolve, reject) => {
			try {
				const existRow = await this.userRepository.getById(userId)
				if (existRow) {
					const result = await this.userRepository.update(userId, user as UpdateUserInput)
					resolve(result)
				}
				const result = await this.userRepository.create(user as CreateUserInput)
				resolve(result)
			} catch (error) {
				reject(error)
			}
		})

	}
}

export default UserService