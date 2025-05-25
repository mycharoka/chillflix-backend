require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const registerRouter = require('./src/router')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/image', express.static(path.join(__dirname, '../image')));


app.get('/health', (req, res) => res.send('OK').status(200))

registerRouter(app)

// fix this middleware for error handling
app.use(function onError(err, req, res, next) {
  console.error(err);
  res.status(500).send({
    message: 'Internal Server Error',
    error: err.message
  });
})

app.listen(port, () => console.log(`Server running on port ${port}`))