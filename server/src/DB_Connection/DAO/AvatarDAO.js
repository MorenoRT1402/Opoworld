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