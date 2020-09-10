// Express app
const express = require("express")
const app = express()



// Connect database




// Bodyparser middleware
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Routes
// const users = require('./routes/api/users')
// app.use("/api/users", users)




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