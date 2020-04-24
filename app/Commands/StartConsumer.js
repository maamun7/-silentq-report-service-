'use strict'

const { Command } = require('@adonisjs/ace')
//const { consumeEvents } = use('App/Consumers')
const UserConsumer = use('App/Consumers/UserConsumer')

class StartConsumer extends Command {

	static get signature () {
		return 'kafka:consume'
	}

	static get description () {
		return 'The command will start to consume kafka message !'
	}

	async handle (args, options) {
		new UserConsumer();
	}
}

module.exports = StartConsumer
