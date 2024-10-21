const User = require('../DB_Connection/DAO/UserDAO')
const crud = require('./crud')

const populateObj = {
  image: 1,
  name: 1,
  career: 1,
  specialty: 1,
  level: 1,
  exp: 1,
  attributes: 1
}

const populate = {
  schema: 'avatars',
  obj: populateObj
}

const getBy = async (props) => crud.getBy(props, populate.schema, populate.obj, User)

module.exports = { getBy }
