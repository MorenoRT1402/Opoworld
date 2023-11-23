const mongoose = require('mongoose')
const { Schema } = require("mongoose");

const QuestionSchema = new Schema({
    question : String,
    options : [ String ],
    career : String,
    specialty : String,
    attribute : String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question