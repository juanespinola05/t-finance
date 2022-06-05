const { JWT_SECRET } = require('../config/config')
const { models } = require('../lib/sequelize')
const jwt = require('jsonwebtoken')

class UserService {
  async find () {
    const users = await models.User.findAll()
    return users
  }

  async findEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })
    return { email, available: !user }
  }

  async create (data) {
    const { dataValues } = await models.User.create(data)
    const tokenPayload = {
      email: dataValues.email,
      id: dataValues.id,
      name: dataValues.name
    }
    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30
      }
    )
    return { token }
  }
}

module.exports = { UserService }
