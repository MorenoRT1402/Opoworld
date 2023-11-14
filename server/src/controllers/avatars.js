const avatarsRouter = require('express').Router()
const Avatar = require('../DB_Connection/DAO/AvatarDAO')
const User = require('../DB_Connection/DAO/UserDAO')

const userExtractor = require('../DB_Connection/middlewares/userExtractor')

const schema = 'user'
const populateObj = {
    passwordHas: 0,
    avatars: 0,
}

avatarsRouter.get('/', async (request, response) => {
    const avatars = await Avatar.find({}).populate( schema, populateObj)
    response.json(avatars)
})

/*
avatarsRouter.get('/:id', (request, response, next) => {
    const { id } = request.params

    console.log(request.url)
    console.log({ id })

    Avatar.findByID(id).then(avatar => {
        if (avatar) {
            console.log({avatar})
            return response.json(avatar)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})
*/

avatarsRouter.get('/:id', async (request, response) => {
    const { id } = request.params
    console.log(id)
    const avatar = await Avatar.findById(id).populate( schema, populateObj)
    response.json(avatar)
})

avatarsRouter.put('/:id', userExtractor, (request, response, next) => {
    const { id } = request.params
    const avatar = request.body

    if (avatar._id) {
        delete avatarUpdates._id;
    }

    Avatar.findByIdAndUpdate(id, avatar, { new: true }).then(result => {
        response.json(result)
    }).catch(next)
})

avatarsRouter.delete('/:id',  userExtractor, (request, response, next) => {
    const { id } = request.params

    Avatar.findByIdAndRemove(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))

    response.status(204).end()
})

avatarsRouter.post('/', userExtractor, async (request, response) => {
    const {
        image,
        name,
        career,
        specialty,
        level = 1,
        exp = 0,
        attributes,
    } = request.body

    const { userId } = request
    console.log(userId)

    const user = await User.findById(userId)

    console.log( { user } )

    if ( !name || !career || !specialty) {
        return response.status(400).json({
            error: 'Data missing'
        })
    }

    const avatarToRegister = new Avatar({
        image,
        name,
        career,
        specialty,
        level,
        exp,
        attributes,
        user: user
    })

    try {
        const savedAvatar = await avatarToRegister.save()
        user.avatars = user.avatars.concat(savedAvatar._id)
        await user.save()
        response.json(savedAvatar)
    } catch (error) {
        next(error)
    }

    response.json(avatarToRegister)

})

module.exports = avatarsRouter