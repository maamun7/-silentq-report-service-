'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class HasAccessPermission {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, response }, next, schemes) {
		// call next to advance the request
		console.log('schemes :', schemes); // schemes will return array
		// const { id } = request

		// console.log('PARAMS :', schemes[0]) 

		const permission = schemes[0];

		console.log('DEBUGG :', permission);

		if (! await this.hasNoPermission(permission)) {
			return await this.fails(response)
		}

		await next()
	}

	async fails(response) {
		return response.status(401).json({
			status: 'FAILED',
			code: 401,
			msg: 'You don\'t have permission to access this route !',
		});
	}

	async hasNoPermission(permissionStr) {
		const permissions = [
			'view_post',
			'create_post',
		]

		if(permissions.indexOf(permissionStr) !== -1){

			return true
		} else {
	
			return false
		}
	}
}

module.exports = HasAccessPermission
