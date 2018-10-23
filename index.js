require('dotenv/config')

const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const albumBucketName = 'auto-finder'
const bucketRegion = 'us-east-1'

AWS.config.update({
  region: bucketRegion,
  credentials: {
    accessKeyId: 'AKIAICV3K4RZ5ZWLM2FQ',
    secretAccessKey: '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'
  }
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
})

// const IAM-SECRET-KEY = RuUDQqMstOKEtgtghA4dUpJaKOGhtz2M7UpGCEl2
// const IAM-KEY = AKIAICV3K4RZ5ZWLM2FQ

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'auto-finder',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const app = express()

app.get('/', express.static('public'))

app.post('/', upload.single('image'), (req, res, next) => {
  res.send(req.file.location)
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})