'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Audience extends Model {
	static boot() {
		super.boot()
	}

	static get table() {
		return 'audiences'
	}

	static get primaryKey() {
		return 'id'
	}
}

module.exports = Audience
