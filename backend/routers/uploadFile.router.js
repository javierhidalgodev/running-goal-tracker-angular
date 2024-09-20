const uploadFileRouter = require('express').Router()
const multer = require('multer')
const path = require('path')

// * Configura dónde y cómo se almacenarán los archivos subidos (nombre, carpeta, etc.).
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// * Es el middleware que maneja la subida del archivo, aplicando restricciones como el tamaño máximo, el tipo de archivo, y el número de archivos que se pueden subir.
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|jpeg/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Solo imágenes JPEG, JPG O PNG'))
    }
  }
})

uploadFileRouter.post('/', upload.single('image'), (req, res) => {
  console.log(req.file)

  if (!req.file) {
    return res.status(400).send('Something went wrong. No file uploaded.')
  }

  res.status(200).send({ filePath: `/uploads/${req.file.filename}` })
})

module.exports = uploadFileRouter
