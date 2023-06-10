const express = require('express')
const db = require('../db.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json()
})

router.post('/spending', (req, res) => {
  const { name, amount, date, category } = req.body

  if (!name || !amount || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const spendingItem = {
    name,
    amount,
    date: new Date(date).toISOString(),
    category,
  }

  db.push(spendingItem)
  res.status(200).json(spendingItem)
})

router.get('/spending', (req, res) => {
  res.json(db.get())
})

router.post('/spending/search', (req, res) => {
  const { date } = req.body

  if (!date) {
    return res.status(400).json({ error: 'Date field not filled' })
  }

  const formattedDate = new Date(date).toDateString()
  const filtered = db
    .get()
    .filter(
      (spendingItem) => spendingItem.date.toDateString() === formattedDate,
    )

  res.json(filtered)
})

router.post('/daily-limit', (req, res) => {
  const { limit } = req.body

  if (typeof limit !== 'number' || limit < 0) {
    return res.status(400).json({ error: 'Incorrect format' })
  }

  db.setLimit(limit)
  res.status(200).json({ message: 'Daily limit set successfully' })
})

router.get('/daily-limit', (req, res) => {
  res.json({ limit: db.getLimit() })
})

module.exports = router
