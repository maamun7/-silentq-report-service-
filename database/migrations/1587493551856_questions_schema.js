'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionsSchema extends Schema {
    up () {
		this.create('questions', (table) => {
			table.increments()
			table.string('title')
			table.bigInteger('event_id')
			table.bigInteger('audience_id')
			table.specificType('status', 'tinyint(2)');
			table.timestamps()
		})
    }

	down () {
		this.drop('questions')
	}
}

module.exports = QuestionsSchema
