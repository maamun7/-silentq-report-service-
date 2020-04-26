'use strict'

const { Command } = require('@adonisjs/ace')
const UserConsumer = use('App/Consumers/UserConsumer')
const EventConsumer = use('App/Consumers/EventConsumer')
const AudienceConsumer = use('App/Consumers/AudienceConsumer')
const QuestionConsumer = use('App/Consumers/QuestionConsumer')

class StartConsumer extends Command {

	static get signature () {
		return 'kafka:consume'
	}

	static get description () {
		return 'The command will start to consume kafka message !'
	}

	async handle (args, options) {
		new UserConsumer();
		new EventConsumer();
		new AudienceConsumer();
		new QuestionConsumer();
	}
}

module.exports = StartConsumer
