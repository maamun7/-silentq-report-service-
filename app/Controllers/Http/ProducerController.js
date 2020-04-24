'use strict'

const { KafkaClient, Producer, ProduceRequest, KeyedMessage } = require('kafka-node')

let Kafka = use('App/Helpers/Kafka')

class ProducerController {

	async publish({ params, request, response }) {
		const { topic, message } = request.all()
		
		Kafka.produceEvents(topic, message);

		return response.status(200).send({
			status: 'SUCCESS',
			code: 200,
			msg: `${message}`,
			topic: topic
		});
	}
}

module.exports = ProducerController
