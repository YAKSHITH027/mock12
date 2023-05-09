const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  salary: Number,
  department: String,
})

const EmpModel = mongoose.model('emp', empSchema)

module.exports = { EmpModel }
