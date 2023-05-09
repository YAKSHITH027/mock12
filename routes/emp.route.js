const express = require('express')
const { EmpModel } = require('../models/emp.model')
const empRoutes = express.Router()

empRoutes.get('/', async (req, res) => {
  try {
    let { limit, page, department, sort, order } = req.query
    if (!limit) limit = 5
    if (!page) page = 1
    if (!order) order = 1
    if (order == 'asc') {
      order = 1
    } else if (order == 'desc') {
      order = -1
    }
    let obj = {}
    if (department) obj.department
    let data = await EmpModel.find(obj)
      .skip(limit * (page - 1))
      .limit(limit)

    res.status(200).send({ data })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})

empRoutes.post('/', async (req, res) => {
  try {
    let data = req.body
    console.log(data)
    let newEmp = new EmpModel(data)
    await newEmp.save()
    res.status(200).send({ msg: 'regiested successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { empRoutes }
