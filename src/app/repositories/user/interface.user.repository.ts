import { CreateUserInput, UpdateUserInput, UserResponse } from "@/types/user"

interface IUserRepository {
	create(user: CreateUserInput): Promise<UserResponse>
	getById(userId: string): Promise<UserResponse>
	update(userId: string, user: UpdateUserInput): Promise<UserResponse>
	delete(userId: string): Promise<UserResponse>
	getAll({ filter, sort, skip, take }: { filter?: any, sort?: any, skip?: number, take?: number }): Promise<UserResponse[]>
}

export default IUserRepository
