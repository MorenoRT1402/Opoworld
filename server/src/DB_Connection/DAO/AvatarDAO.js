const mongoose = require('mongoose');
const { Schema } = mongoose;

const AvatarSchema = new Schema({
  image: String,
  name: String,
  career: String,
  specialty: String,
  level: Number,
  exp: Number,
  attributes: [
    {
      key: String,
      value: Number,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

AvatarSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Avatar = mongoose.model('Avatar', AvatarSchema)

module.exports = Avatar

/*
const getAllAvatars = () => {
  return Avatar.find({}).then(avatars => {
    return avatars;
  }).catch(error => {
    console.error('Error getting all avatars:', error);
    throw error;
  });
}

const findAvatarByID = (id) => {
    return Avatar.findById(id)
}

const findAvatarsWithExactMatch = (avatarData) => {
  try {
    const avatars = Avatar.find({
      userID: avatarData.userID,
      image: avatarData.image,
      name: avatarData.name,
      career: avatarData.career,
      specialty: avatarData.specialty,
      level: avatarData.level,
      exp: avatarData.exp,
      attributes: avatarData.attributes
    });
    return avatars;
  } catch (error) {
    console.error('Error searching avatars with exact match:', error);
    throw error;
  }
}

const findAvatarsByUserID = (userID) => {
  try {
    const avatars = Avatar.find({ userID: userID });
    return avatars;
  } catch (error) {
    console.error('Error searching avatars by user ID:', error);
    throw error;
  }
}

const findAvatarsByName = (name) => {
  try {
    const avatars = Avatar.find({ name: name });
    return avatars;
  } catch (error) {
    console.error('Error searching avatars by name:', error);
    throw error;
  }
}


function registerAvatar (avatarDTO) {
    const avatarToRegister = new Avatar({
      image: avatarDTO.image,
      name: avatarDTO.name,
      career: avatarDTO.career,
      specialty: avatarDTO.specialty,
      level: avatarDTO.level,
      exp: avatarDTO.exp,
      attributes: avatarDTO.attributes
    })

    avatarToRegister.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err)
    })
}

  function updateAvatar (id, avatar) {
    Avatar.findByIdAndUpdate(id, avatar).then( result => {
      response.json(result)
    })
  }

  function removeAvatar (id) {
    Avatar.findByIdAndRemove(id).then(result => {
      response.status(204).end()
    }).catch(error => { return error })
  }
  */