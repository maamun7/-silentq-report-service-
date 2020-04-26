'use strict'

const { Kafka } = require('kafkajs')
const Env = use('Env')
const Question = use('App/Models/Question')
const { isEmpty } = use('App/Helpers')

class QuestionConsumer {

	clientId = 'questionClient';
	topic = 'questionTopic';
	groupId = 'questionGroup';
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

		if (payload.type === 'create') {
			delete payload.type;
			await Question.create(payload)
		} else if (payload.type === 'edit') {
			const question = await Question.find(payload.id)

			if (typeof payload.title !== 'undefined') {
				question.title = payload.title;
			}

			if (typeof payload.event_id !== 'undefined') {
				question.event_id = payload.event_id;
			}

			if (typeof payload.audience_id !== 'undefined') {
				question.audience_id = payload.audience_id;
			}

			await question.save();
		}
	}
}

module.exports = QuestionConsumer