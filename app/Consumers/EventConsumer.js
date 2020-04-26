'use strict'

const { Kafka } = require('kafkajs')
const Env = use('Env')
const Event = use('App/Models/Event')
const { isEmpty } = use('App/Helpers')

class EventConsumer {

	clientId = 'eventClient';
	topic = 'eventTopic';
	groupId = 'eventGroup';
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
		const event = await Event.find(payload.id)

		if (payload.type === 'create') {
			delete payload.type;
			await Event.create(payload)
		} else if (payload.type === 'edit') {

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

module.exports = EventConsumer