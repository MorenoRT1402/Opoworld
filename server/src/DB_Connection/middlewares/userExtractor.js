const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_WORD)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
