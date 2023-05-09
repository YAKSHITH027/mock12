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

    if (department) obj.department = department

    let data = await EmpModel.find(obj)
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ salary: order })

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
empRoutes.patch('/:id', async (req, res) => {
  try {
    let { id } = req.params
    let data = req.body
    await EmpModel.findByIdAndUpdate(id, data)

    res.status(200).send({ msg: 'edited successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})
empRoutes.delete('/:id', async (req, res) => {
  try {
    let { id } = req.params
    await EmpModel.findByIdAndRemove(id)
    res.status(200).send({ msg: 'deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'something went wrong' })
  }
})

module.exports = { empRoutes }
