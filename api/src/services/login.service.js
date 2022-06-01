const { models } = require('../lib/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')

class LoginService {
  async login (data) {
    const { email, password } = data
    const user = await models.User.findOne({
      where: {
        email
      }
    })

    const passwordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!user || !passwordMatch) {
      return {
        message: 'Invalid email or password'
      }
    }

    const tokenPayload = {
      email,
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30
      }
    )

    return {
      email: user.email,
      username: user.username,
      token
    }
  }
}

module.exports = { LoginService }
