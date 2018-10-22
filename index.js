require('dotenv/config')

const express = require('express')
const app = express()

app.use('/', express.static('public'))

app.post('/', (req, res) => {
  console.log('uploading')
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
