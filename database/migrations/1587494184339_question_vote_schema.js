'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionVoteSchema extends Schema {
	up () {
		this.create('question_vote', (table) => {
			table.increments()
			table.bigInteger('event_id')
			table.bigInteger('question_id')
			table.bigInteger('voted_by')
			table.specificType('value', 'tinyint(2)');
			table.timestamps()
		})
	}

	down () {
		this.drop('question_vote')
	}
}

module.exports = QuestionVoteSchema
