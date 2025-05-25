const bcrypt = require('bcrypt')
const db = require('../../../config/knexInstance')
const jwt = require('jsonwebtoken')

async function register(body) {
  try {
    const { username, password, fullname, email } = body
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const checkUser = await db('users').where('username', username)

    if (checkUser.length > 0) {
      throw('Username already exist')
    }

    await db('users')
      .insert({
        username,
        password: hashPassword,
        name: fullname,
        email
      })

      return {
        statusCode: 200,
        data : {
          message: `User ${username} created`,
          data: []
        }
      }
  } catch (error) {
    throw new Error(error)
  }
}
async function login(body) {
  try {
    const { username, password } = body
    const user = await db('users').where('username', username).first()

    if (!user) {
      throw new Error('Please check username / password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Please check username / password')
    }

    const payload = {
      _id: user.users_id,
      username: user.username,
      email: user.email,
      name: user.name
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

    return {
      statusCode: 200,
      data : {
        message: 'Login success',
        data: { 
          username: user.username,
          email: user.email,
          name: user.name,
          token
        }
      }
    }
  } catch (error) {
    throw error
  }
}

async function getUser(req) {
  try {
    return {
      statusCode: 200,
      data: {
        user: req.user,
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  register,
  login,
  getUser
}