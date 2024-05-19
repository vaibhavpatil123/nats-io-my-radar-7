const { connect, StringCodec } = require('nats')

async function consumeMessages() {
    const nc = await connect({ servers: ['nats://0.0.0.0:4222'] })
    const sc = StringCodec()

    // Subscribe to the 'example.subject' subject to consume messages
    const subscription = nc.subscribe('example.subject')
    console.log('Consumer connected and subscribed to "example.subject"')

    // Asynchronously iterate over messages received on the subscription
    ;(async () => {
        for await (const msg of subscription) {
            console.log('Consumer received message:', sc.decode(msg.data))
        }
    })().catch(console.error)
}

consumeMessages().catch(console.error)
