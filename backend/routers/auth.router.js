const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization && authorization.substring(0, 7).toLocaleLowerCase() === 'bearer ') {
    jwt.verify(authorization.split(' ')[1], process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        res.status(400).send({ error: 'Invalid token' })
      }

      req.token = decoded
      next()
    })
  }
}

authRouter.get('/', verifyToken, (req, res) => {
  const token = req.token
  res.json({ message: 'Access granted', token })
})

authRouter.post('/', (req, res) => {
  const { userId, email } = req.body

  if (!userId || !email) {
    return res.status(400).send('Faltan datos')
  }

  const payload = {
    userId,
    email
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '30m'
  })

  res.json({
    token,
    userId,
    email
  })
})

authRouter.get('/check-token', verifyToken, (req, res) => {
  const token = req.token
  res.status(200).send(token)
})

module.exports = authRouter
