'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
	static boot() {
		super.boot()
	}

	static get table() {
		return 'questions'
	}

	static get primaryKey() {
		return 'id'
	}
}

module.exports = Question
