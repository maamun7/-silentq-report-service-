'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {

	static get table() {
		return 'tokens'
	}

	static get primaryKey() {
		return 'id'
	}

	static get dates() {
		return super.dates.concat(['started_at'])
	}

	static get createdAtColumn() {
		return null
	}

	static get updatedAtColumn() {
		return null
	}
}

module.exports = Token
