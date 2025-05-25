const jwt = require('jsonwebtoken')
const db = require('../../config/knexInstance')

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db('users').where({ users_id: decoded._id,  username: decoded.username })

    if (user.length == 0) {
      throw new Error()
    }

    req.user = {
      _id: user[0].users_id,
      _username:user[0].username,
      _email:user[0].email,
      _fullname:user[0].name
    }

    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = jwtAuth
