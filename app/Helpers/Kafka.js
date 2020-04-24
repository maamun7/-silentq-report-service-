'use strict';
const Env = use('Env')
const { KafkaClient, Consumer, Producer, Offset, KeyedMessage, HighLevelConsumer } = require('kafka-node')
const kafkaHost = Env.get('KAFKA_HOST');

class Kafka {

	static produceEvents(topic, msg) {
		const client = new KafkaClient({ kafkaHost })
		const producer = new Producer(client)
		const keyMsg = new KeyedMessage('key', '007')

		const payloads = [
		//	{ topic: topic, messages: message, partition: 1 },
            { topic: topic, messages: ['Hi', msg, keyMsg] }
		]

		producer.on('ready', _ => {
			producer.send(payloads, (err, data) => {
				if (err) {
					console.log('[kafka-producer -> ' + topic + ']: broker failed to update')
				} else {
					console.log('[kafka-producer -> ' + topic + ']: broker updated successfully')
				}
			});
		})

		producer.on('error', err => {
			console.log('ERROR :', err);
		})
	}

	static consumeEvents() {
		let topic = 'corona';
		const client = new KafkaClient({ kafkaHost });
		const topics = [
			{ topic: topic, partition: 0 }
		];
		const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024, encoding: 'buffer' };

		let consumer = new Consumer(client, topics, options);
	//	let consumer = new HighLevelConsumer(client, topics, options);

		consumer.on('message', msg => {
			console.log('Message :', msg);

			//var buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
			//var decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix.
			//console.log(decodedMessage);
		});

		consumer.on('error', (err) => {
			console.log('Error when receive : ', err);
		});

		consumer.on('offsetOutOfRange', topics => {
			offset.fetch([topic], (err, offsets) => {
				if (err) {
					console.log('offsetOutOfRange', err);
				}

				const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
				consumer.setOffset(topic.topic, topic.partition, min);
			});
		});

        process.on('SIGINT', function() {
				consumer.close(true, function() {
				process.exit();
			});
		});
	}
}

module.exports = Kafka