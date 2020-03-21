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
app.get('/project/list', (req, res) =>
  res.json(require('./mocks/projects/get-item.json'))
)
// あとは欲しいだけ上記の1行とjsonファイルを追加するだけ

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('API Mock Server is running'))
