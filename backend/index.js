const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
  const { userId, email } = req.body

  if (!userId || !email) {
    return res.status(400).send('Faltan datos')
  }

  const payload = {
    userId,
    email
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '3m'
  })

  res.json(token)
})

app.get('/login', (req, res) => {
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

app.listen(process.env.PORT || 5002, () => {
  console.log('Server is running!')
})
