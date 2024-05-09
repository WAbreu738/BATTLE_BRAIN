const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//require routes
const routes = require('./routes')

const { engine } = require('express-handlebars')

const client = require('./config/client')

app.engine('hbs', engine({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')

//midlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)

client.once('open', () => {
  console.log('Database Connected')
  app.listen(PORT, () => console.log('Server listening port', PORT))
}) 