const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpecialtySchema = new Schema({
  name : String,
  stats: [{
    type : Schema.Types.ObjectId,
    ref : 'Attribute'
  }],
})

const Specialty = mongoose.model('Specialty', SpecialtySchema)

const ComplexAttributesSchema = new Schema ({
  baseStats : {  
    level: Number,
    exp: Number,
    life: Number,
    },
    common: [{
      type : Schema.Types.ObjectId,
      ref : 'Attribute'
    }],
    careers: [{
      name : String,
      specialties : 
      [
        {
          type : Schema.Types.ObjectId,
          ref : 'Specialty'
      }
    ]
    }]
  }
  )

const AvatarSchema = new Schema({
  image: String,
  name: String,
  career: String,
  specialty: String,
  baseStats : {
    level : Number,
    exp : Number,
    life : Number
  },
  attributes: [],
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