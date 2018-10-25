require('dotenv/config')

const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const Algorithmia = require('algorithmia')

const albumBucketName = process.env.BUCKET
const bucketRegion = process.env.REGION

AWS.config.update({
  region: bucketRegion,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  }
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: albumBucketName,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const app = express()

app.use(express.static('public'))

app.post('/', upload.single('image'), (req, res, next) => {
  Algorithmia.client(process.env.ALGORITHMIA_KEY)
    .algo(process.env.ALGORITHM)
    .pipe(req.file.location)
    .then(response => {
      res.send([response.get(), req.file.location])
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
