// const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    passwordHas: String,
    avatars: [{
      type: Schema.Types.ObjectId,
      ref: 'Avatar'
    }],
    questions: [{
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }]
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHas
  }
})

//UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema)

module.exports = User