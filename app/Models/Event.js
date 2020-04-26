'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
	static boot() {
		super.boot()
	}

	static get table() {
		return 'events'
	}

	static get primaryKey() {
		return 'id'
	}

}

module.exports = Event
