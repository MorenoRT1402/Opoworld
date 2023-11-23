const questionsRouter = require('express').Router()
const Question = require('../DB_Connection/DAO/QuestionDAO')
const User = require('../DB_Connection/DAO/UserDAO')
const userExtractor = require('../DB_Connection/middlewares/userExtractor')

questionsRouter.get('/', async (request, response) => {
    const questions = await Question.find({})
    response.json(questions)
})

questionsRouter.get('/:id', (request, response) => {
    const { id } = request.params
    Question.findById(id).then( question => response.json(question))
})

questionsRouter.post('/', userExtractor, async (request, response, next) => {
    const {
        question,
        options,
        career,
        specialty,
        attribute,
    } = request.body

    console.log('27', request.body)

    const { userId } = request

    const user = await User.findById(userId)

    const questionToRegister = new Question({
        question: question,
        options: options,
        career: career,
        specialty: specialty,
        attribute: attribute,
        user
    })

    console.log('40', questionToRegister)

    try {
        const savedQuestion = await questionToRegister.save()
        user.questions = user.questions.concat(savedQuestion._id)
        await user.save()
        response.json(savedQuestion)
    } catch (error) {
        next(error)
    }

})

module.exports = questionsRouter