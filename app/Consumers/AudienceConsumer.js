'use strict'

const { Kafka } = require('kafkajs')
const Env = use('Env')
const Audience = use('App/Models/Audience')
const { isEmpty } = use('App/Helpers')

class AudienceConsumer {

	clientId = 'audienceClient';
	topic = 'audienceTopic';
	groupId = 'audienceGroup';
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
		const audience = await Audience.find(payload.id)

		if (payload.type === 'create') {
			delete payload.type;
			await Audience.create(payload)
		} else if (payload.type === 'edit') {

			if (typeof payload.name !== 'undefined') {
				audience.name = payload.name;
			}

			if (typeof payload.mobile_no !== 'undefined') {
				audience.mobile_no = payload.mobile_no;
			}

			await audience.save();
		}
	}
}

module.exports = AudienceConsumer