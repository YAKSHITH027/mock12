const mongoose = require('mongoose')

const connection = mongoose.connect(
  'mongodb+srv://yakshith:yakshith@cluster0.utgd1da.mongodb.net/emp?retryWrites=true&w=majority'
)

module.exports = { connection }
