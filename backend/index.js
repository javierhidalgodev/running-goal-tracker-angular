const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const authRouter = require('./routers/auth.router')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// * Para el login (post) la verificación del token (get)
app.use('/login', authRouter)

app.get('/check_token', (req, res, next) => {
  const token = req.headers.authorization

  if (!token || token.substring(0, 7).toLowerCase() !== 'bearer ') {
    return res.status(401).send('A valid token is required!')
  }

  const formattedToken = token.substring(7)

  try {
    jwt.verify(formattedToken, process.env.JWT_KEY)
  } catch (error) {
    return res.status(401).send('Invalid token')
  }

  next()
})

app.listen(process.env.PORT || 5002, () => {
  console.log('Server is running!')
})
