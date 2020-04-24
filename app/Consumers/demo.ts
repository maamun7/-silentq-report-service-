import { Consumer, KeyedMessage, KafkaClient } from 'kafka-node';
import { Type as AvroType } from 'avsc/lib';

export class KafkaUserCreateConsumer {

    private client: KafkaClient;
    private consumer: Consumer;
    private topic = 'tweetsTopic';

    constructor() {
        this.client = new KafkaClient({ kafkaHost: 'kafka.vnet:9092' });
        this.client.on('connect', () => {
            console.log('Tweet Kafka Client connected to Kafka');
        });
        this.client.on('error', (error) => {
            console.log('Tweet Kafka Client - error > ', error);
        });

        this.consumer = new Consumer(this.client,
            [
                { topic: this.topic, partition: 0 }
            ],
            {
                autoCommit: false,
                encoding: 'buffer'
			}
		);

        this.consumer.on('error', (error) => {
            console.log('Tweet Kafka Consumer - error > ', error);
		});
		
        this.consumer.on('message', (message: any) => {
            this.consumeTweets(message);
        });
    }

    async consumeTweets(msg) {
	   
		const schemaType = AvroType.forSchema({
			type: 'record',
			fields: [
				{
					name: 'kind',
					type: 'string'
				},
				{
					name: 'name', 
					type: 'string'
				}
			]
		  });
		
		
		/*  let tweets: Array<ITweet>;
        const schemaType = AvroType.forSchema({
            type: 'array',
            name: 'tweets',
            items: {
                type: 'record', 
                name: 'tweet',
                fields:
                    [
                        { name: 'id', type: 'string' }
                    ]
            }
        });
        // const buf = new Buffer(message.value, 'binary');
		let tweets = schemaType.fromBuffer(message.value);
		console.log(tweets); */

		//var buf = new Buffer(msg.value, 'binary'); // Read string into a buffer.
		
		let tweets = schemaType.fromBuffer(msg.value);

		//const val = type.fromBuffer(msg.value);

		console.log('decodedMessage : ', tweets);
    }
}