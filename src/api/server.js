const express = require('express')
const app = express()

const cors = require('cors')
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
  })
)
app.get('/projects/list', (req, res) =>
  res.json(require('./mocks/projects/get-item.json'))
)
app.get('/projects/detail', (req, res) => {
  const response = res.json(require('./mocks/projects/get-detail.json'))
  return response
})

const port = 8080
app.listen(port, () =>
  console.log('API Mock Server is running. port is ' + port)
)
