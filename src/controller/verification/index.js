const db = require('../../../config/knexInstance')
const sendRegisterEmail = require('../../mailer/mail')
const jwtAuth = require('../../middleware/jwtAuth')
sendRegisterEmail
db

const route = require('express').Router()

route.post('/email-verification', jwtAuth, async (req, res) => {
  try {
    const findUser = await db('users').where({ users_id: req.user._id }).first()

    if (!findUser) {
      throw new Error('User not found')
    }

    // send email
    const mailResult = await sendRegisterEmail(findUser.email, findUser.name);

    res.status(mailResult.statusCode).send(mailResult.data)
  } catch (error) {
    throw error
  }
})
module.exports = route