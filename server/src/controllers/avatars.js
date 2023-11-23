const avatarsRouter = require('express').Router()
const Avatar = require('../DB_Connection/DAO/AvatarDAO')
const User = require('../DB_Connection/DAO/UserDAO')

const { uploadFile, saveImage, getImage, clearImageDir } = require('../imgStorage');

const userExtractor = require('../DB_Connection/middlewares/userExtractor');
const { defaultAvatar } = require('../defaultAvatar');

const defaultAttributes = require('../defaultAttributes').attributes

const userSchema = 'user'
const userPopulate = {
    passwordHas: 0,
    avatars: 0,
}

const attributeSchema = 'attributes'

const saveAndUpdateCareers = originalCareers => {
    const updatedCareers = originalCareers

    originalCareers.forEach(career => {
    })
}

const saveUpdatedAttributes = originalAttrs => {
    const returnedAttrs = originalAttrs || defaultAttributes

    if(originalAttrs) {
    
        returnedAttrs.baseStats = {
            ...defaultAttributes.baseStats,
        }
    
        returnedAttrs.common = {
            ...defaultAttributes.common,
            ...originalAttrs.common
        }
    }

    returnedAttrs.careers = saveAndUpdateCareers (returnedAttrs.careers)
    
    return returnedAttrs

}

const getUpdatedAttributes = originalAttrs => {
    const returnedAttrs = {...defaultAttributes}

    if (!originalAttrs) return returnedAttrs

    returnedAttrs.baseStats = {
        ...defaultAttributes.baseStats,
        ...originalAttrs.baseStats
    }

    returnedAttrs.common = {
        ...defaultAttributes.common,
        ...originalAttrs.common
    }

    returnedAttrs.careers = {
        ...defaultAttributes.careers,
        ...originalAttrs.careers
    }

    return returnedAttrs
}

avatarsRouter.get('/default', async (request, response) => {
    response.json(defaultAvatar)
})

avatarsRouter.get('/', async (request, response) => {
    const avatars = await Avatar.find({}).populate( userSchema, userPopulate).populate(attributeSchema)
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
    if(typeof(id) !== 'string') return
    const avatar = await Avatar.findById(id).populate( userSchema, userPopulate ).populate(attributeSchema)
    response.json(avatar)
})

avatarsRouter.put('/:id', userExtractor, uploadFile, async (request, response, next) => {
    try {
        const { id } = request.params;
        const avatarUpdates = request.body;
        const fileImage = request.file;

        if (avatarUpdates._id) {
            delete avatarUpdates._id;
        }

        clearImageDir()

        if (fileImage) {
            avatarUpdates.image = saveImage(fileImage);
        }

        const avatarToRegister = new Avatar({
            ...avatarUpdates,
            atributes : getUpdatedAttributes(avatarUpdates.career, avatarUpdates.specialty, avatarUpdates.attributes),
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

    const updatedAttributes = getUpdatedAttributes(attributes);

    const avatarToRegister = new Avatar({
        image : fileImage,
        name: name,
        career,
        specialty,
        attributes : updatedAttributes,
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