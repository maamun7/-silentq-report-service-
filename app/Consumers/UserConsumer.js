'use strict'

const { Kafka } = require('kafkajs')
const Env = use('Env')
const User = use('App/Models/User')
const { isEmpty } = use('App/Helpers')

class UserConsumer {

	clientId = 'userClient';
	topic = 'userCreate';
	groupId = 'userGroup';
	broker = '';
	kafka = null;

	constructor() {
		this.broker = Env.get('KAFKA_HOST')
		this.kafka = new Kafka({
			clientId: this.clientId,
			brokers: [this.broker]
		})

        this.init();
	}

	async init() {
		const consumer = this.kafka.consumer({ groupId: this.groupId })
		const run = async _ => {
			await consumer.connect()
			await consumer.subscribe({ topic: this.topic, fromBeginning: true })
			await consumer.run({
				eachMessage: async ({ topic, partition, message }) => {
					this.processMessage(message)
				}
			});
		}

		run().catch(e => {
			console.error(`[example/consumer] ${e.message}`, e)
		});
	}

	async processMessage(msg) {
		const payload = JSON.parse(msg.value)
		console.log('Payload :', payload);
		const user = await User.find(payload.id)

		if (isEmpty(user)) {
			await User.create(payload)
		} else {

			if (typeof payload.name !== 'undefined') {
				user.name = payload.name;
			}

			if (typeof payload.email !== 'undefined') {
				user.email = payload.email;
			}

			if (typeof payload.password !== 'undefined') {
				user.password = payload.password;
			}

			await user.save();
		}
	}
}

module.exports = UserConsumer