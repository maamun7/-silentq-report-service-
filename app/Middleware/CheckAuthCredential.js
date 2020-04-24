'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Token = use('App/Models/Token')

class CheckAuthCredential {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, auth, response }, next) {
		// const token = request.header('authorization') // Authorization key with 'Bearer'
		const token = auth.getAuthHeader() // Authorization key without 'Bearer'
		const agent = request.header('User-Agent');
		const matchToken = await Token.query().where({ token : token, client : agent, is_expire : 0 }).getCount()
		if (matchToken < 1) {
			return response.status(420).json({
				status: 'FAILED',
				code: 420,
				msg: 'Invalid token !',
			});
		}

		await next()
	}

	async fails(response) {
		
	}
}

module.exports = CheckAuthCredential
