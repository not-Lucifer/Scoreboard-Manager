import { Router } from 'express'
import League from '../models/League.js'

const router = Router()

router.get('/', async (req, res) => {
  res.json(await League.find().sort({ _id: 1 }))
})

router.post('/', async (req, res) => {
  const { id, name, sport } = req.body
  res.status(201).json(await League.create({ _id: id, name, sport }))
})

export default router
