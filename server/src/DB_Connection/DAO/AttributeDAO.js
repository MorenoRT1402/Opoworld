const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttributeSchema = new Schema({
    name : String,
    value : Number
  })

const Attribute = mongoose.model('Attribute', AttributeSchema)

module.exports = Attribute

  