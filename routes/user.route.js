const express = require('express')
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const userRoute = express.Router()

userRoute.post('/login', async (req, res) => {
  try {
    let data = req.body
    let userInDB = await UserModel.find({ email: data.email })
    if (userInDB.length == 0) {
      return res.status(400).send({ msg: 'user not found' })
    }
    bcrypt.compare(data.password, userInDB[0].password, function (err, result) {
      // result == true
      console.log(result, 'and', err)
      if (result) {
        var token = jwt.sign({ userId: userInDB._id }, 'secret')
        res.status(200).send({ msg: 'login succesfull', token: token })
      } else {
        res.status(400).send({ msg: 'something went wrong' })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})

userRoute.post('/signup', async (req, res) => {
  try {
    let data = req.body
    let userInDB = await UserModel.find({ email: data.email })
    if (userInDB.length) {
      return res.status(400).send({ msg: 'user is already regiested' })
    }
    bcrypt.hash(data.password, 3, async function (err, hash) {
      if (hash) {
        let newUser = new UserModel({
          email: data.email,
          password: hash,
        })
        await newUser.save()
        res.status(201).send({ msg: 'user has been registered' })
      } else {
        res.status(400).send({ msg: 'something went wrong' })
      }
    })
  } catch (error) {
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { userRoute }
