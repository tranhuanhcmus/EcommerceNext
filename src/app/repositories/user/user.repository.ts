import DatabaseClient from "@/prisma";
import IUserRepository from "./interface.user.repository";
import { CreateUserInput, UpdateUserInput, UserResponse } from "@/types/user"
import CommonUtils from "@/app/utils/common"
class UserRepository implements IUserRepository {
	create(user: CreateUserInput): Promise<UserResponse> {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await DatabaseClient.client.user.create({
					data: user,
				}) as UserResponse
				resolve(result)
			} catch (error) {
				reject(error)
			}
		})
	}
	getById(userId: string): Promise<UserResponse> {
		return new Promise(async (resolve, reject) => {

			try {
				const result = await DatabaseClient.client.user.findFirst({
					where: { userId }
				}) as UserResponse
				resolve(result)
			} catch (error) {
				reject(error)
			}

		})
	}
	update(userId: string, user: UpdateUserInput): Promise<UserResponse> {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await DatabaseClient.client.user.update({
					where: { userId },
					data: user,
				}) as UserResponse
				resolve(result)
			} catch (error) {
				reject(error)
			}
		})
	}
	delete(userId: string): Promise<UserResponse> {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await DatabaseClient.client.user.delete({
					where: { userId },
				}) as UserResponse
				resolve(result)
			} catch (error) {
				reject(error)
			}
		})
	}
	getAll({ filter, sort, skip, take }: { filter?: any, sort?: any, skip?: number, take?: number }): Promise<UserResponse[]> {
		return new Promise(async (resolve, reject) => {
			try {
				const findQuery = CommonUtils.cleanObject({
					where: filter,
					orderBy: sort,
					skip,
					take,
				})
				const result = await DatabaseClient.client.user.findMany(findQuery) as UserResponse[]
				resolve(result)
			} catch (error) {
				reject(error)
			}
		})
	}
}

export default UserRepository;