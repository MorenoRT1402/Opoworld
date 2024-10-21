require('dotenv').config()
const mongoose = require('mongoose')

const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.PASSWORD
const CLUSTER = process.env.CLUSTER
const DB = process.env.DB_NAME

const connectionString = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/
${DB}?retryWrites=true&w=majority`

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connectToDB = () => {
  mongoose.connect(connectionString, dbOptions)
    .then(() => {
      console.log('Database connected')
    }).catch(err => {
      console.log(err)
    })
}

module.exports = { connectToDB }
