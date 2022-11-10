const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("m-server is running")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.thwifey.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});


function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}

async function run() {
    try {
        const serviceCollection = client.db('mPhotography').collection('services');
        const bannerCollection = client.db('mPhotography').collection('banners');
        const reviewCollection = client.db('mPhotography').collection('reviews');
  
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            res.send({ token })
        })
       
        app.get('/banners', async (req, res) => {
            const query = {}
            const cursor = bannerCollection.find(query);
            const banners = await cursor.toArray();
            res.send(banners);
        });
  
        
    }
    finally {
  
    }
  
 }
 run().catch(err => console.error(err));
 
 


app.listen(port, () => {
    console.log("m-server is running on port", port)
})