'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AudiencesSchema extends Schema {
	up () {
		this.create('audiences', (table) => {
			table.increments()
			table.string('name').nullable()
			table.string('mobile_no', 80).notNullable().unique()
			table.specificType('status', 'tinyint(2)')
			table.timestamps()
		})
	}

	down () {
		this.drop('audiences')
	}
}

module.exports = AudiencesSchema
