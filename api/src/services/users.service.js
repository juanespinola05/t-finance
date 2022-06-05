const { models } = require('../lib/sequelize')

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
    const newUser = await models.User.create(data)
    return newUser
  }
}

module.exports = { UserService }
