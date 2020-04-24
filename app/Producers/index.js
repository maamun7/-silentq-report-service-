'use strict';
const Env = use('Env')
const { KafkaClient, Producer, Offset, KeyedMessage, HighLevelConsumer } = require('kafka-node')
const kafkaHost = Env.get('KAFKA_HOST');

const publishEvent = async (topics, msg) => {
	const client = new KafkaClient({ kafkaHost })
	const producer = new Producer(client)
	const keyMsg = new KeyedMessage('key', '007')

	const payloads = [];

	if (topics instanceof Array) {
		topics.forEach(topic => {
			payloads.push({ topic: topic, messages: [msg, keyMsg] })
		})
	} else {
		payloads.push({ topic: topics, messages: [msg, keyMsg] })
	}

	producer.on('ready', _ => {
		producer.send(payloads, (err, data) => {
			if (err) {
				console.log('[kafka-producer -> ' + topic + ']: broker failed to update')
			} else {
				console.log('[kafka-producer -> ' + topic + ']: broker updated successfully')
			}
		})
	})

	producer.on('error', err => {
		console.log('ERROR :', err);
	})
}

module.exports = {
	publishEvent
}