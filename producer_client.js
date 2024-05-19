const { connect, StringCodec } = require('nats')

async function publishMessage() {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'] })
    const sc = StringCodec()

    // Publish a message to the 'example.subject' subject
    await nc.publish('example.subject', sc.encode('Hello, NATS!'))
    console.log('Message published successfully')

    // Close the connection when done
    await nc.close()
    console.log('Connection closed')
}

publishMessage().catch(console.error)
