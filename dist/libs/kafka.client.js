"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
// Create a Kafka client instance
const kafka = new kafkajs_1.Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});
// Create a Kafka producer
const producer = kafka.producer();
exports.producer = producer;
// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: 'test-group' });
exports.consumer = consumer;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect the producer
    yield producer.connect();
    // Connect the consumer
    yield consumer.connect();
    // Subscribe to the topic
    yield consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
    // Run the consumer to listen for new messages
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            if (message.value !== null) {
                const messageValue = message.value.toString();
                console.log({
                    partition,
                    offset: message.offset,
                    value: messageValue,
                });
                // Broadcast the message to all connected clients
                // io.emit('kafkaMessage', messageValue);
            }
            else {
                console.warn('Received a message with a null value');
            }
        }),
    });
});
run().catch(console.error);
//# sourceMappingURL=kafka.client.js.map