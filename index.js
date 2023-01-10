const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ho0d8c2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const subscriberCollection = client.db('easyJobs').collection('subscriber');

        app.post('/subscriberAll', async (req, res) => {
            const subscriberAll = req.body;
            const query = {
                email: subscriberAll.email  
            }
            const alreadySubscribe= await subscriberCollection.find(query).toArray();
            if (alreadySubscribe.length) {
                return res.send({ acknowledged: false });
            }
            const result = await subscriberCollection.insertOne(subscriberAll);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('codingTestEasyJobs server running!')
})

app.listen(port, () => {
    console.log(`codingTestEasyJobs server listening on port ${port}`)
})