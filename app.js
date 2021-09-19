if (process.env.NODE_ENV === "development") {
}
require('dotenv').config()
const express = require('express')
const conn = require('./conn')
const app = express()
var mysql = require('mysql');



const cors = require('cors')
const port = process.env.WEB_PORT || 2047

console.log(port)
conn



const routes = require('./routes/index')



app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use('/api', routes)


app.use((err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'ValidationError') {
    console.log('valioation')
    let key = Object.keys(err.errors.errors)[0]
    console.log(err.errors.errors)
    res.status(400).json({ message: `Error: ${err.errors.errors[key].msg}` })
  } else {
    if (err.code === 404) {
      res.status(404).json(err.message)
    } else if (err.code === 401) {
      res.status(401).json(err.message)
    } else if (err.code === 400) {
      res.status(400).json(err.message)
    } else if (err.name === 'MongoError' && err.code === 11000) {
      var newerr = err.message.split(' ')
      res.status(400).json(`${newerr[7].split(' ')[0]} : ${newerr[12]} already exist`)
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.message)
    } else if (err.name === 'JsonWebTokenError') {
      res.status(400).json('Login First')
    } else {
      console.log(err);
      res.status(500).json(
        'Internal server error'
      );
    }
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = app