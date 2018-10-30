require('dotenv/config')

const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const Algorithmia = require('algorithmia')
const uuidv4 = require('uuid/v4')
const craigslist = require('node-craigslist')

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
      cb(null, uuidv4())
    }
  })
})

const client = new craigslist.Client({
  city: 'orangecounty'
})
const options = {
  category: 'cta'
}

const app = express()

app.use(express.static('public'))

app.get('/listings', (req, res) => {
  const {search} = req.query
  client.search(options, search)
    .then(listings => {
      res.json(listings)
    })
    .catch(err => {
      res.sendStatus(500).jsonp({error: err})
      console.error(err)
    })
})

app.get('/details', (req, res) => {
  const {url} = req.query
  client.details(url)
    .then(details => {
      res.json(details)
    })
    .catch(err => {
      res.sendStatus(500)
      console.error(err)
    })
})

app.post('/', upload.single('image'), (req, res, next) => {
  Algorithmia.client(process.env.ALGORITHMIA_KEY)
    .algo(process.env.ALGORITHM)
    .pipe(req.file.location)
    .then(response => {
      const firstResponse = response.get()[0]
      const car = Object.assign({}, firstResponse, {imageURL: req.file.location})
      res.json(car)
    })
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
