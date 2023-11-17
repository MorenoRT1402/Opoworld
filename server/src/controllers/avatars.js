const avatarsRouter = require('express').Router()
const Avatar = require('../DB_Connection/DAO/AvatarDAO')
const User = require('../DB_Connection/DAO/UserDAO')

const { uploadFile, saveImage, getImage, clearImageDir } = require('../imgStorage');

const userExtractor = require('../DB_Connection/middlewares/userExtractor');

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
    const avatar = await Avatar.findById(id).populate( schema, populateObj)
//    avatar.image = avatar.image !== '' ? getImage(avatar.image) : ''
    response.json(avatar)
})

avatarsRouter.put('/:id', userExtractor, uploadFile, async (request, response, next) => {
    try {
        const { id } = request.params;
        const avatarUpdates = request.body;
        const fileImage = request.file;

        console.log('put', {avatarUpdates}, {fileImage})

        if (avatarUpdates._id) {
            delete avatarUpdates._id;
        }

        clearImageDir()

        if (fileImage) {
            avatarUpdates.image = saveImage(fileImage);
        }

        const avatarToRegister = new Avatar({
            ...avatarUpdates,
            user : avatarUpdates.user.id
        })

        const updatedAvatar = await Avatar.findByIdAndUpdate(id, avatarToRegister, { new: true });
        
        if (updatedAvatar) {
            response.json(updatedAvatar);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});


avatarsRouter.post('/', userExtractor, uploadFile, async (request, response, next) => {
    const {
        name,
        career,
        specialty,
        level = 1,
        exp = 0,
        attributes,
    } = request.body

    const fileImage = request.file

    const { userId } = request

    const user = await User.findById(userId)

    if ( !name || !career || !specialty) {
        return response.status(400).json({
            error: 'Data missing'
        })
    }

    const avatarToRegister = new Avatar({
        image : fileImage,
        name: name,
        career,
        specialty,
        level,
        exp,
        attributes,
        user: user
    })

    try {
        const newPath = saveImage(fileImage)
        await clearImageDir()
        avatarToRegister.image = newPath
        const savedAvatar = await avatarToRegister.save()
        user.avatars = user.avatars.concat(savedAvatar._id)
        await user.save()
        response.json(savedAvatar)
    } catch (error) {
        next(error)
    }
})

avatarsRouter.post('/image/upload', uploadFile, (request, response) =>{
    const file = request.file
    saveImage(file)
    response.status(200).end()
  })

avatarsRouter.delete('/:id',  userExtractor, (request, response, next) => {
    const { id } = request.params

    Avatar.findByIdAndRemove(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))

    response.status(204).end()
})

module.exports = avatarsRouter