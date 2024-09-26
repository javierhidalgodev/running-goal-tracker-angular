const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const authRouter = require('./routers/auth.router')
const uploadFileRouter = require('./routers/uploadFile.router')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// * Para el login (post) la verificación del token (get)
app.use('/login', authRouter)
app.use('/upload', uploadFileRouter)

app.listen(process.env.PORT || 5002, () => {
  console.log('Server is running!')
})
