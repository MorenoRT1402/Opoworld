const avatarsRouter = require('express').Router()
const Avatar = require('../DB_Connection/DAO/AvatarDAO')
const User = require('../DB_Connection/DAO/UserDAO')

const userExtractor = require('../DB_Connection/middlewares/userExtractor')

avatarsRouter.get('/', async (request, response) => {
    const avatars = await Avatar.find({}).populate('user', {
        passwordHas: 0,
        avatars: 0,
    })
    response.json(avatars)
})

avatarsRouter.get('/:id', (request, response, next) => {
    const { id } = request.params

    Avatar.findByID(id).then(avatar => {
        if (avatar) {
            return response.json(avatar)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

avatarsRouter.put('/:id', userExtractor, (request, response, next) => {
    const { id } = request.params
    const avatar = request.body

    if (avatar._id) {
        delete avatarUpdates._id;
    }

    /*
    const newAvatarInfo = new Avatar({
  //    image: avatar.image,
      name: avatar.name,
      career: avatar.career,
      specialty: avatar.specialty,
      level: avatar.level,
      exp: avatar.exp,
      attributes: avatar.attributes
    })
    */

    Avatar.findByIdAndUpdate(id, avatar, { new: true }).then(result => {
        response.json(result)
    }).catch(next)
})

/*
avatarsRouter.put('//:id', (request, response, next) => {
  const { id } = request.params;
  const avatarUpdates = request.body; // Datos a actualizar
 
  // Verifica si el campo '_id' está presente en las actualizaciones y, si lo está, elimínalo
  if (avatarUpdates._id) {
    delete avatarUpdates._id;
  }
 
  // Utiliza el método 'findOneAndUpdate' para actualizar el documento sin afectar el campo '_id'
  Avatar.findOneAndUpdate(
    { _id: id },
    { $set: avatarUpdates },
    { new: true }
  )
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});
*/

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
        console.log(user.avatars)
        const savedAvatar = await avatarToRegister.save()
        user.avatars = user.avatars.concat(savedAvatar._id)
        await user.save()
        response.json(savedAvatar)
    } catch (error) {
        next(error)
    }

    response.json(avatarToRegister)

    /*
  
    avatarToRegister.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err)
    })
  
    */

    //  avatars = [...avatars, newAvatar]

})

module.exports = avatarsRouter