const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../DB_Connection/DAO/UserDAO')
const { request, response } = require('express')

const schema = 'avatars'

const populateObj = {
    image: 1,
    name: 1,
    career: 1,
    specialty: 1,
    level: 1,
    exp: 1,
    attributes: 1,
}

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate( schema, populateObj)
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const { id } = request.params
    console.log(id)
    const user = await User.findById(id).populate( schema, populateObj)
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    try {
    const {body} = request
    const {email, username, password} = body

    const saltRound = 10
    const passwordHas = await bcrypt.hash(password, saltRound)

    const user = new User({
        email,
        username,
        passwordHas: passwordHas
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
} catch (error) {
    response.status(409).json(error.message)
}
})

module.exports = usersRouter