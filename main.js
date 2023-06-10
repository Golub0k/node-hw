const express = require('express')
const bodyParser = require('body-parser')
const spendingRouter = require('./routes/spending.js')

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Got request ${req.method} ${req.path}`)

  next()
})

app.use(express.static('frontend'))

app.use('/api', spendingRouter)

app.listen(3001, () => {
  console.log('App started!')
})
