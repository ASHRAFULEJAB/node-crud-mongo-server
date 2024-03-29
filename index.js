const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('mongodb is running...')
})
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
//password :5PuSBSd7arwwsw4q
//user : dbUser2

const uri =
  'mongodb+srv://dbUser2:5PuSBSd7arwwsw4q@cluster0.dnw37y6.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
      const userCollection = client.db('node-momgo-crud').collection('users')
      
      app.get('/users', async(req, res) => {
          const query = {}
          const cursor = userCollection.find(query)
          const users = await cursor.toArray()
          res.send(users)

    
      })
    app.get('/users/:id', async(req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await userCollection.findOne(query)
      res.send(result)
    })
    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const user = req.body
      const option = { upsert: true }
      const updatedUser = {
        $set: {
          name: user.name,
          address: user.address,
          email:user.email
        }
      }
      const result = await userCollection.updateOne(filter, updatedUser, option)
      res.send(result)
      
    })

    app.post('/users', async (req, res) => {
      const user = req.body
      console.log(user)
      const result = await userCollection.insertOne(user)
      console.log(result)
      res.send(result)
    })
      
      app.delete('/users/:id', async(req, res) => {
          const id = req.params.id
          console.log('trying to delte ', id)
          const query = { _id: ObjectId(id) }
          const result = await userCollection.deleteOne(query)
          console.log(result);
          res.send(result)
      })
  } finally {
  }
}
run().catch((e) => {
  console.log(e)
})
