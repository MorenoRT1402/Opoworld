const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../DB_Connection/DAO/UserDAO')
const { request, response } = require('express')

loginRouter.post('/', async (request, response) => {
    const { body } = request
    const { email, password } = body
    const trimmedEmail = email.trim()

    try {
        const user = await User.findOne({ email: trimmedEmail })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHas)

        if (!(user && passwordCorrect)) {
            response.status(401).json({
                error: 'invalid user or password'
            })
        }

        console.log('follow 24', user)

        const userForToken = {
            id: user.id,
            username: user.username
        }

        const expiresIn = 60 * 60 * 24 * 7
        const token = jwt.sign(userForToken, process.env.SECRET_TOKEN_WORD, { expiresIn: expiresIn })

        response.send({
            email: user.email,
            username: user.username,
            token: token,
            avatars: user.avatars,
            id: user.id
        })

    } catch (error) {
        console.log(error.message)
    }
})

module.exports = loginRouter