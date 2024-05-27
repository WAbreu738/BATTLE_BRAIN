const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

require('dotenv').config()

//packages for db
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')


//require routes

const client = require('./config/client')



//midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json());

app.use(routes)

client.once('open', () => {
  console.log('Database Connected')
  app.listen(PORT, () => console.log('Server listening port', PORT))
}) 