require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const registerRouter = require('./src/router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => res.send('OK').status(200))

registerRouter(app)

app.listen(port, () => console.log(`Server running on port ${port}`))