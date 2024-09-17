const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

authRouter.get('/', (req, res) => {
  const token = req.headers.authorization

  if (!token || token.substring(0, 7).toLowerCase() !== 'bearer ') {
    return res.status(401).send('A valid token is required!')
  }

  jwt.verify(token.slice(7), process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token!')
    }

    res.json({ message: 'Access granted', decoded })
  })
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
    expiresIn: '10m'
  })

  res.json({
    token,
    userId,
    email
  })
})

module.exports = authRouter
