import { Kafka } from 'kafkajs';

// Create a Kafka client instance
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

// Create a Kafka producer
const producer = kafka.producer();

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Connect the producer
  await producer.connect();

  // Connect the consumer
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Run the consumer to listen for new messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        if (message.value !== null) {
            const messageValue = message.value.toString();
      
            console.log({
              partition,
              offset: message.offset,
              value: messageValue,
            });
      
            // Broadcast the message to all connected clients
            // io.emit('kafkaMessage', messageValue);
          } else {
            console.warn('Received a message with a null value');
          }
    },
  });
};

run().catch(console.error);

export { producer, consumer };
