const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const port = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g6jkes2.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const menuCollection = client.db('BistroDB').collection('Menu')
        const reviewCollection = client.db('BistroDB').collection('Review')

        app.get('/api/v1/menu', async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })


        app.get('/api/v1/review', async (req, res) => {
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })

        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server running')
})

app.listen(port, () => {
    console.log(`server running on ${port}`);
})