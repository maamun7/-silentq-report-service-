'use strict'
const Factory = use('Factory')
/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Hash = use('Hash')

class UserSeeder {
	async run() {
		const user = await Factory
			.model('App/Models/User')
			.createMany(1)

		/* await Factory
			.model('App/Models/User')
			.createMany(500) */
	}
}

module.exports = UserSeeder
