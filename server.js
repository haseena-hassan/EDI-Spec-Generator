// Express app
const express = require("express")
const app = express()
const mongoose = require("mongoose")


// Connect database
const dbconnection 	= require('./config/database.js')
mongoose
  .connect(
    dbconnection.url,
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))


// Bodyparser middleware
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//Routes for api
const api = require('./api/index')
app.use('/api',api);


// Production build
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


// Port setup
const port = 5000 || process.env.PORT
app.listen(port, () => console.log(`Server up and running on port ${port} !`))