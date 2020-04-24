'use strict'
const User = use('App/Models/User')

class UserController {
	async getList({ request, response }) {
		const user = await User.all();

		if (user) {
			return response.status(200).send({
				status: 'SUCCESS',
				code: 200,
				msg: `Available result !`,
				data: user
			})
		} else {
			return response.status(200).send({
				status: 'EMPTY',
				code: 200,
				msg: `No matched result found by id ${id}`,
				data: {}
			})
		}
	}
}

module.exports = UserController
