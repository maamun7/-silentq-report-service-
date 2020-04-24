'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
	up () {
		this.create('events', (table) => {
			table.increments()
			table.string('name')
			table.string('code', 80).notNullable().unique()
			table.string('image').nullable()
			table.string('image_url').nullable()
			table.bigInteger('user_id')
			table.datetime('start_at', { precision: 6 })
			table.datetime('end_at', { precision: 6 })
			table.specificType('status', 'tinyint(2)')
			table.timestamps()
		})
	}

	down () {
		this.drop('events')
	}
}

module.exports = EventsSchema
