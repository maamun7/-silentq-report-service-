'use strict';
const Env = use('Env')
//const { KafkaClient, Consumer, Offset, KeyedMessage } = require('kafka-node')
const kafkaHost = Env.get('KAFKA_HOST');
const avro = require('avsc');

const { Kafka } = require('kafkajs')

const consumeEvents = async _ => {

	const kafka = new Kafka({
		clientId: 'my-app',
		brokers: [kafkaHost]
	})

	const consumer = kafka.consumer({ groupId: 'test-group' })
	await consumer.connect()
	await consumer.subscribe({ topic: 'userCreate', fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log('topic :', topic)
			console.log('partition :', partition)
			console.log('msg :', JSON.parse(message.value.toString()))

		/* 	const type = avro.Type.forSchema({
				type: 'record',
				fields: [
				{name: 'kind', type: {type: 'enum', symbols: ['CAT', 'DOG']}},
				{name: 'name', type: 'string'}
				]
			});

			const val = type.fromBuffer(message.value);
			console.log('decodedMessage : ', val); */
		},
	})


	// let avroSchema = {
	// 	type: 'record',
	// 	fields: [
	// 	  {
	// 		name: 'id',
	// 		type: 'string'
	// 	  }, 
	// 	  {
	// 		name: 'name',
	// 		type: 'string'
	// 	  }, 
	// 	  {
	// 		name: 'email',
	// 		type: 'string'
	// 	  },
	// 	  {
	// 		name: 'password',
	// 		type: 'string'
	// 	  },
	// 	  {
	// 		name: 'created_at',
	// 		type: 'string'
	// 	  },
	// 	  {
	// 		name: 'updated_at',
	// 		type: 'string'
	// 	  }
	// 	]
	// };

	//var type = avro.parse(avroSchema);
/* 	let topic = 'userCreate';
	const client = new KafkaClient({ kafkaHost });
	const topics = [
		{ topic: topic, partition: 0 }
	];
	const options = { autoCommit: false, encoding: 'buffer' };

	let consumer = new Consumer(client, topics, options);

	consumer.on('error', (err) => {
		console.log('Error when receive : ', err);
	}); */

	//consumer.on('message', msg => {
	//	processMsg(msg);

		// if (msg instanceof Object) {
		// 	let xxx = JSON.parse(msg.value);
		// 	for (const key in xxx) {
		// 		console.log(`${xxx[key]}`);
		// 	}			  
		// } else {
		// 	console.log('Message :', msg);
		// }

	//	console.log('hash : ', msg.value.toString('hex'));

		//var buf = new Buffer(msg.value, 'binary'); // Read string into a buffer.
		//var decodedMessage = type.fromBuffer(buf.slice(0)); // Skip prefix.

	//	const val = type.fromBuffer(msg.value);

	//	console.log('decodedMessage : ', val);
	//});

	/* consumer.on('offsetOutOfRange', topics => {
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
	}); */

	const processMsg = (msg) => {
		console.log('msg- : ', msg);

		const type = avro.Type.forSchema({
			type: 'record',
			fields: [
			  {name: 'kind', type: {type: 'enum', symbols: ['CAT', 'DOG']}},
			  {name: 'name', type: 'string'}
			]
		  });



		//console.log('Value :', msg.value);
		
		//const val = type.fromBuffer(msg.value);
	//	console.log('decodedMessage : ', val);
	}
}

module.exports = {
	consumeEvents
}