const express = require('express')
const cors = require('cors')

const { connection } = require('./db')
const { userRoute } = require('./routes/user.route')
const { empRoutes } = require('./routes/emp.route')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({ msg: 'home' })
})
app.use('/user', userRoute)
app.use('/employee', empRoutes)

app.listen(process.env.port, async () => {
  try {
    await connection
    console.log('db connected')
  } catch (error) {
    console.log('db failed')
  }
  console.log('port is running')
})
