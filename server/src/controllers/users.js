const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../DB_Connection/DAO/UserDAO')
const { getBy } = require('../services/users')
const hardcodedUser = require('../app/hardcodedUser')

const schema = 'avatars'

const populateObj = {
  image: 1,
  name: 1,
  career: 1,
  specialty: 1,
  level: 1,
  exp: 1,
  attributes: 1
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate(schema, populateObj)
  response.json(users)
})

usersRouter.get('/guest', async (request, response) => {
  response.json(hardcodedUser)
})

usersRouter.get('/search', async (request, response) => {
  await getBy(request, response, schema, populateObj, User)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id).populate(schema, populateObj)
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { email, username, password } = body

    const saltRound = 10
    const passwordHas = await bcrypt.hash(password, saltRound)

    const user = new User({
      email,
      username,
      passwordHas
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(409).json(error.message)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const result = await User.deleteOne({ _id: id })

    if (result.deletedCount > 0) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Error deleting user' })
  }
})

module.exports = usersRouter
