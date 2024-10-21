const hardcodedUser = require('./app/hardcodedUser')
const bcrypt = require('bcrypt')
const User = require('./DB_Connection/DAO/UserDAO')
const { connectToDB } = require('./DB_Connection/mongo')
const { getBy } = require('./services/users')

const resetGuestUser = async () => {
  connectToDB()

  try {
    const user = await getBy({ username: hardcodedUser.username }) || await getBy({ email: hardcodedUser.email })

    if (user) {
      await User.deleteOne({ _id: user._id })
      console.log(`User ${hardcodedUser.username} deleted.`)
    } else {
      console.log('No guest user found to delete.')
    }

    const newUser = new User({
      username: hardcodedUser.username,
      email: hardcodedUser.email,
      passwordHas: await bcrypt.hash(hardcodedUser.password, 10)
    })

    await newUser.save()
    console.log('Hardcoded guest user created.')
  } catch (error) {
    console.error('Error resetting guest user:', error)
  }
}

resetGuestUser()
